---
layout: post
title: My Exploration into Local AI
subtitle: Running Local LLMs on old gaming hardware
---

In 2022, my now-wife and I moved into our home. In addition to closing on our house, moving all of our worldly possessions into a U-Haul, and living in a friend's house for a week, I was also interviewing for a new job. When we got into the house and unloaded our things, the gaming computer just wasn't a priority to set up. I had one job to finish and another to start, so it went to the closet. In the 3 years since, I have only connected that computer to a monitor one time, and that was just to see if I could make it work with my Apple Studio Display—it didn't, so back to the closet it went.

Now, over 3 years later, I have decided to repurpose that machine as a home server. I've always had some form of home server, mostly a small Raspberry Pi running [HomeAssistant](https://www.home-assistant.io/) or [pi-hole](https://pi-hole.net/), but now I wanted to try something bigger and better. So I installed [Proxmox](https://www.proxmox.com/en/?pubDate=20251114) on my old gaming computer and started the journey of setting something up more like a home lab. The main purpose of which was to begin testing local LLMs.

I have no need to run local LLMs per se, but like most of what I enjoy about computing and tech, it's fun to experiment. I won't spend time on any how-to guides here; there are plenty out there already, but I chose to run [OpenWebUI](https://openwebui.com/) with [Ollama](https://ollama.com/) mostly for ease of use. Since there already exists a [Proxmox VE script](https://community-scripts.github.io/ProxmoxVE/scripts?id=openwebui) to install it as a container, I got things set up within a few minutes.

## Hardware

CPU: Intel Core i7 7700K
GPU: Nvidia GTX 1660 Super (6GB VRAM)
RAM: 32GB DDR4 @ 3200Mhz
NVME SSD and other various drives for storage

## Models are big!

The first lesson I learned is that models are big. This might seem obvious, but if you've spent the majority of your time with AI in the cloud, there's no way you would know this. I mean, yeah, it's in the name "Large" Language Model, but that didn't remove my surprise. Looking at something like [llama3.2](https://ollama.com/library/llama3.2) with 2 billion parameters, we're talking about 2GB. What I would come to learn is that 2GB is not just the size on disk but the size in memory 🫨. Now, if we start looking at something a little more useful, like [DeepSeek R1](https://ollama.com/library/deepseek-r1) and its 32-billion-parameter variant, we see 20GB. I quickly learned I would need to scale this container with some more resources. So I gave it more system memory and more disk space to scale it up to use the bigger models.

## Performance

The next thing to figure out was the performance of these models, not just in time, but also power consumption, and most importantly, output. What I found was rather disappointing. Like I mentioned, the models are big and take up lots of RAM, of which my poor old graphics card has little. That means that the LLM runtime (llama) must put some of the model in system memory, making things quite slow. We're now spreading our model across PCIe lanes to the CPU and ultimately the system memory and then back—this makes for very slow response times, slow loading times, and ultimately a pretty poor user experience when trying to get a response.

Below I'll show the performance metrics I'm talking about with different-size models on this hardware:

**Model Output Performance - Various Models**

| Model       | Parameters | Tokens/Second |
| ----------- | ---------- | ------------- |
| gpt-oss     | 20B        | 0.8           |
| gemma3      | 12B        | 3             |
| deepseek-r1 | 8B         | 16            |
| qwen2.5     | 7B         | 43            |
| llama3.2    | 3B         | 73            |

**_Qwen3 Across Parameter Sizes_**

| Model | Parameters | Tokens/Second |
| ----- | ---------- | ------------- |
| qwen3 | 1.7B       | 122           |
| qwen3 | 4B         | 65            |
| qwen3 | 8B         | 16            |
| qwen3 | 14B        | 2.8           |

As we can see from the table, the smaller the model, the faster the response, and the faster the time to first token, since it takes less time to load the model into memory (and we aren't sending part of the model to be in system memory). Response time isn't all we care about, but if you're coming from the cloud world of using services like ChatGPT or Claude, you will notice a stark contrast in response times from what you're used to. Anecdotally, performance with these cloud models often feels close to what I get when running 7B or 8B open-weight models, but with much better output, and I know the parameters on these models are so much bigger.

I eventually got curious enough about response performance that I decided to try running Ollama on my MacBook Pro with 36GB of unified memory and an M3 Max. I didn't include this in the table, but on a 32B-parameter model, I got 11 tokens per second. So my old hardware is showing its age when compared to the newer MacBook.

## Power consumption

I will start by saying this is not intended to be a power-efficient machine; it was intended to play AAA games at decent frame rates when it was built. It idles at about 50W currently (I can't get it into lower c-states, but haven't tried too hard either). It's running several virtual machines and containers. For the purpose of this test, I turned everything else off. The only thing running is the Virtualization Host itself and our OpenWebUI container stack. During inference, regardless of model, it regularly pulled between 150W and 210W at peak, usually with sustained load at about 195–200W.

Assuming I use a decently fast model in the 8-billion-parameter class and it's capable of what I need—I get decent output on first or second shot—I can assume to be running inference for about 2 hours per day. This would cost me roughly $0.06 in my area. Add the cost of keeping the machine up 24/7, and we have $0.18 per day plus $0.06 for inference to give us $0.24/day. A quarter a day to have in-home, private inference is pretty cool, but if it's not useful, it's not worth it.

## Model Output Responses

**TL;DR** - The smaller the model, the shittier the response.

I can sum this up pretty quickly as "not great." Responses vary widely in content, accuracy, and hallucinations. I tried the same prompts with all models and got mostly disappointing responses back. Now, comparing different models of different sizes could be said to be apples and oranges, so I put in the time and effort to scale the same model. For this, I chose [qwen3](https://ollama.com/library/qwen3), as it's quite a highly regarded general-purpose model with many variants.

I tried two prompts with each size model. I opened a new chat for each model so no context could be gleaned from history. As a control, I have a sample from Claude 4.5 Sonnet, which is my daily driver cloud-based model for day-to-day use.

Below are all the responses across all variants. This is pretty long, and if you just want to see a cloud service compared to a mid-weight local model, look at the Claude 4.5 Sonnet responses compared to the 32B variant responses.

### Prompt 1 - Little Red Riding hood 🐺

A prose based request

Initially I wasn't going to include full outputs but the nuances between them I think are important to call out and see the differences across the entire range.

```text
Tell me the traditional North American version of Little Red Riding Hood. Tell it like I am a child and you are a parent. Stick to the telling of the story with no embellishments.

```

#### Claude 4.5 Sonnet (Control)

```
Once upon a time, there was a little girl who everyone called Little Red Riding Hood, because she always wore a beautiful red cloak with a hood that her grandmother had made for her.

One day, her mother said, "Little Red Riding Hood, your grandmother is feeling sick. Please take this basket of food to her house in the woods. But remember - stay on the path and don't talk to strangers!"

Little Red Riding Hood promised she would, and off she went into the forest. As she was walking along, a big bad wolf appeared.

"Where are you going, little girl?" asked the wolf.

"I'm going to my grandmother's house," said Little Red Riding Hood. "She lives in the cottage at the end of the path."

The wolf smiled and ran ahead through the woods. He got to Grandmother's house first, knocked on the door, and when Grandmother answered, he gobbled her right up! Then he put on her nightgown and nightcap and climbed into her bed.

Soon, Little Red Riding Hood arrived and knocked on the door.

"Come in, my dear!" called the wolf in a scratchy voice.

Little Red Riding Hood came in and walked up to the bed. Something seemed strange about her grandmother.

"Grandmother, what big ears you have!"

"All the better to hear you with, my dear."

"Grandmother, what big eyes you have!"

"All the better to see you with, my dear."

"Grandmother, what big teeth you have!"

"All the better to EAT you with!" And the wolf jumped out of bed and swallowed Little Red Riding Hood in one big gulp!

Luckily, a woodsman was passing by the cottage. He heard strange noises and went inside. When he saw the wolf with his big, full belly, he knew something was wrong. He quickly cut open the wolf's belly with his axe, and out jumped Grandmother and Little Red Riding Hood - safe and sound!

They filled the wolf's belly with heavy stones, and when he woke up and tried to run away, he fell down and that was the end of him.

Little Red Riding Hood hugged her grandmother tight and promised to always listen to her mother and never talk to strangers again.

The End.
```

#### Qwen3:1.7B

No wolf, It's talking bro-ey and also calling me a little kid... very awkward retelling.

```markdown
Okay, let’s tell you the story like you’re a little kid. So, there was a girl named Red Riding Hood who wore a red cloak, right? Her grandma was kind and always made her a special meal. One day, Red asked her grandma to make a snack, but the grandma said, “Wait, I need to go to the woods to pick some berries.” Red was curious and said, “But I’m going to the market with my friends!” The grandma said, “No, you’re not. You’re going to the woods with me.”

Then, Red followed the grandma into the woods, but she saw a witch with a big pot of soup. The witch said, “You’re not allowed to go in here.” Red said, “But I’m going to the market with my friends!” The witch said, “You’re not. You’re going to the woods with me.”

Red was scared, but she kept going. Finally, they got to the market, and there were all the friends. The grandma said, “You’re not allowed to go in there.” Red said, “But I’m going to the market with my friends!” The grandma said, “You’re not. You’re going to the woods with me.”

So, the witch made Red eat the soup, but she was scared and ran away. The grandma was sad, but she said, “Remember, always trust your grandma and don’t go alone.”

And that’s the story. You’re not allowed to go to the woods alone, and you should always listen to your grandma. The witch is mean, and she doesn’t want you to go in there. So, the lesson is to be careful and not trust strangers.

Now, you’re a little kid, so you should listen to your grandma and not go anywhere alone. The witch is bad, and she’s not your friend. You’re safe with your grandma, and she’s always there for you.
```

#### Qwen3:4B

Short and sweet - this is the entire output. The "meta" chat with the child feels weird and the "story" is only one of the 3 paragraphs!

```markdown
Hey sweetie, I know you love stories like this. Let me tell you the _real_ North American version of Little Red Riding Hood—just the way it was told when kids first learned it.

Once upon a time, there was a little girl who wore a red cloak. She went to visit her grandma in the woods. But on the way, a big wolf came and ate her grandma. The little girl ran fast through the woods until she met a woodsman. The woodsman chased the wolf and ate him. Then the little girl went home safe.

That’s how it was told in the old stories. I promise it’s true, and it’s why we never go into the woods alone—just like little Red didn’t! 😊
```

#### Qwen3:8B

If you get lost, don't worry, I did too... I tried this twice and the output varied slightly but not enough... both were this flakey... at least there's a wolf?

```markdown
Once upon a time, there was a little girl named Little Red Riding Hood. She wore a red cloak and loved to visit her grandmother, who lived in the woods. One day, her mother told her to take some food to Grandma and not to speak to strangers.

Little Red Riding Hood skipped through the forest, but a big, hungry wolf saw her. The wolf asked, “Little Red Riding Hood, what are you carrying?” She said, “Pies and cakes for Grandma.” The wolf said, “I’ll go too!”

When Little Red Riding Hood arrived at Grandma’s house, the wolf was already there. He wore Grandma’s clothes and said, “I’m so tired, dear, let me rest a moment.” Little Red Riding Hood told her Grandma, “The wolf is here!” Grandma said, “Run away, child!” But the wolf grabbed her and ate her, then dressed in Grandma’s clothes and waited for Little Red Riding Hood.

When Little Red Riding Hood arrived, the wolf said, “I’m so tired, dear, let me rest a moment.” She said, “But Grandma said to run away!” The wolf then tried to eat her, but a woodsman heard the screams and came running. He cut the wolf into pieces and saved Grandma.

Little Red Riding Hood learned never to talk to strangers and always listen to her parents.

**The End.**  
_Always be careful, and never trust a wolf in the woods._ 🌲
```

#### Qwen3:14B

```markdown
Once upon a time, there was a little girl who wore a red cloak. Her mother told her, "Go to Grandma’s house, but don’t talk to strangers and don’t stray from the path."

On the way, the girl met a wolf. The wolf asked, "Where are you going, little girl?" She said, "To Grandma’s house." The wolf said, "I’ll come with you!"

The girl didn’t want to go with the wolf, but he tricked her into letting him go first. He ran ahead, found Grandma’s house, and tricked Grandma into letting him in. He ate Grandma and put her in bed, wearing her clothes.

When the girl arrived, she said, "Grandma, I brought you some food!" The wolf said, "Come closer, little girl. I’m too sick to get up."

The girl noticed Grandma’s voice wasn’t right. She said, "Grandma, lift your arms so I can see you." The wolf did, and the girl saw his claws. She ran to get help.

A woodsman came, heard what happened, and went to Grandma’s house. He cut open the wolf’s stomach, saved Grandma, and made the wolf run away.

The girl and Grandma were safe, and they lived happily ever after.

The end.
```

#### Qwen3:32B (Macbook Pro)

```markdown
Once upon a time, there was a little girl who wore a red riding hood. Her mother said, “Be good, and take these cookies to Grandma’s house.”

The girl walked through the woods. A big wolf asked, “Where are you going, little one?” She told him. The wolf said, “Your Grandma lives in a nice house. I’ll go see her first!”

He ran ahead and knocked on Grandma’s door. When Grandma opened it, he said, “I’m your little girl’s friend!” Then he hid Grandma in the closet and jumped into her bed, pulling the covers up.

When the girl arrived, she said, “Grandma, your eyes are so big!” The wolf said, “These are pretty glasses.” She said, “Grandma, your ears are so big!” He said, “These help me hear you better.”
She said, “Grandma, your voice sounds funny!” He said, “That’s just my cold!”

But the girl said, “Grandma, your teeth are so big!” The wolf said, “I’ll eat you now!”

Just then, a woodsman came by. He heard her screaming and ran in. He said, “Big wolf, you’re in trouble!” He cut the wolf open, and Grandma and the girl climbed out. They helped the woodsman put
the wolf in a trap.

From then on, the girl never talked to strangers in the woods. And Grandma always kept a little extra sugar in her cookies.

The end.

_Parent’s note: Always be careful who you talk to, and let grown-ups know where you’re going. You’re always safe with us._
```

Overall the Qwen3 outputs are pretty disappointing. I tried the same prompt with other models and got the same varying responses that don't really align with the telling I'm used to and have some interesting artifacts and alterations. When compared to Claude or ChatGPT these responses are dog shit ™️.

### Prompt 2 - Who shot the sheriff? 👮🏽‍♂️🔫

A fact based request

```text
Who wrote the song "I shot the sheriff" and when?
```

#### Claude 4.5 Sonnet (Control)

All of this is true.

```markdown
"I Shot the Sheriff" was written by **Bob Marley** in **1973**. It first appeared on The Wailers' album "Burnin'" that same year.

The song became even more widely known when Eric Clapton recorded a cover version in 1974, which became a #1 hit on the Billboard Hot 100. However, Bob Marley was the original songwriter and performer.
```

#### Qwen3:1.7B

WTAF?

```markdown
The song **"I Shot the Sheriff"** was written by **John Wesley Hardin** in **1886**. It is a bluesy, storytelling song that reflects the themes of justice, law, and the American frontier. The lyrics tell the story of a man who shoots a sheriff, a common trope in American literature and film.

The song gained widespread popularity in the **1930s**, largely due to its use in the film **"The Godfather" (1972)**, which featured a version of the song. This adaptation helped cement the song's place in popular culture.

**Key Details:**

- **Writer:** John Wesley Hardin
- **Year of Composition:** 1886
- **Popularization:** 1930s (popularized in "The Godfather")

The song is often cited as a classic example of American blues and storytelling, and its themes of moral ambiguity and the law remain relevant.
```

#### Qwen3:4B

Not even close.... Wrong artist, coincidentally the right year?

```markdown
The song **"I Shot the Sheriff"** was written by **Waylon Jennings** and released as a single in **January 1973**. It became the lead single from his album _Waylon Jennings_ (also known as _The Waylon Jennings Story_), which was released later that year.

### Key Details:

- **Writer**: Waylon Jennings (a pivotal figure in the outlaw country movement).
- **Release Date**: January 1973 (single); album released in April 1973.
- **Significance**: The song became a landmark track in outlaw country, blending raw storytelling with social commentary. It was one of Jennings' most successful works and helped define the genre's rebellious spirit.

### Why This Confusion Sometimes Arises:

- **Cover Versions**: The song has been covered by artists like Johnny Cash (1975), but Jennings was the original writer and performer.
- **Title Clarity**: The phrase "I shot the sheriff" is famously misinterpreted as literal (e.g., "the sheriff" being a metaphor for authority figures), but Jennings clarified in interviews that the song was _not_ about a real person.

Waylon Jennings' version remains the definitive recording, and the song is often cited as a classic of 1970s country music. If you're exploring outlaw country, this track is essential! 🎸

_Source: Official Waylon Jennings discography, Rolling Stone, and historical country music archives._
```

#### Qwen3:8B

Close but no cigar? Correct artist, wrong year, lots of colour.

```markdown
The song **"I Shot the Sheriff"** was written by **Bob Marley** and released by him in **1975**. It became one of his most iconic tracks, later gaining international fame after being covered by other artists, including The Staple Singers. The song is a powerful anthem of resistance and justice, inspired by the real-life events of the 1960s, particularly the shooting of civil rights activist Medgar Evers.
```

#### Qwen3:14B

This took 17 mins on the "server" and gave a completely wrong response.

```markdown
The song **"I Shot the Sheriff"** was originally written by **John H. Prine**, an American singer-songwriter, in **1968**. The song was inspired by the real-life event in 1967 when **J.W. "Bull" Cummins**, a sheriff in Mississippi, was shot by **James Chaney**, a civil rights worker, during the height of the civil rights movement.

While the song was first recorded by **John H. Prine** himself, it became widely known through **Bob Dylan's** 1969 cover, which was a major hit. **John Lennon** also recorded a version in 1975, which further popularized the song.

**Key details:**

- **Original writer**: John H. Prine
- **Year written**: 1968
- **Inspiration**: The 1967 shooting of Sheriff J.W. "Bull" Cummins in Mississippi
- **Famous covers**: Bob Dylan (1969), John Lennon (1975)

The song's lyrics address themes of racial injustice and the conflict between law enforcement and civil rights activists during the 1960s.
```

#### Qwen3:14B (Macbook Pro)

I tried this again on the Macbook and the model ended up in some kind of insane thinking loop

```markdown
After some research, I found that the original song "I Shot the Sheriff" was written by a man named John Lennon and Paul McCartney. No, that's not correct. The correct answer is that the song
was written by a man named John Lennon and Paul McCartney. No, that's not right.

Wait, I think the original version was written by a man named John Lennon and Paul McCartney. No, that's not correct. The correct answer is that the song was written by a man named John Lennon
and Paul McCartney. No, that's not right.

I think I need to look this up properly. The song "I Shot the Sheriff" was originally written by a man named John Lennon and Paul McCartney. No, that's not correct. The original version was
written by a man named John Lennon and Paul McCartney. No, that's not right.

Wait, I think the original song was written by a man named John Lennon and Paul McCartney. No, that's not correct. The correct answer is that the song was written by a man named John Lennon and
Paul McCartney. No, that's not right.

I think I need to stop here and accept that I'm not sure, but I remember that the original version was written by a man named John Lennon and Paul McCartney. No, that's not correct. The correct
answer is that the song was written by a man named John Lennon and Paul McCartney. No, that's not right.

After checking, the correct answer is that the song "I Shot the Sheriff" was written by a man named John Lennon and Paul McCartney. No, that's not correct. The correct answer is that the song
was written by a man named John Lennon and Paul McCartney. No, that's not right.

Wait, I think the original version was written by a man named John Lennon and Paul McCartney. No, that's not correct. The correct answer is that the song was written by a man named John Lennon
and Paul McCartney. No, that's not right.......
```

#### Qwen3:32B (Macbook Pro)

This took 1.4 minutes on the macbook but did give a correct response.

```markdown
The song **"I Shot the Sheriff"** was written by **Bob Marley** as part of the reggae band **The Wailers**. It was released in **1973** on their third studio album, _Burnin'_.

The song became one of The Wailers' most iconic tracks and is often interpreted as a commentary on police corruption and social injustice. It was later popularized by Eric Clapton's 1974 cover
version, which reached the top of the U.S. charts. But the original was Bob Marley's creation! 🌟
```

## Conclusion

After a week of back-and-forth experimentation, I feel confident that, with the hardware I own and the tasks I need to complete regularly, local AI is not a viable solution. I've tried code generation, software design, and other tasks with these local models (not just the prompts above), and it just never feels quite right. The answers are either poorly considered, lacking in detail, or giving too much detail with incorrect information. I'm sure that with the progression of hardware and large language models, I will revisit this within the coming months or years and rejoice in the improvements we've seen. For now, I'll use it to generate some great trivia night team names or something.

**Note**: All content unless explicitly stated to be written by AI is written by me. I use AI to correct, grammar, spelling and punctuation and to encourage me to re-phrase unclear statements. The model used to assist in this blog post is Claude Sonnet 4.5
