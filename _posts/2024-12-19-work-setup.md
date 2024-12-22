---
layout: post
title: 2024 Mac work station setup
---

I have been reading a few posts by others about their setups and felt inspired
to write my own. I figure if someone else's post can bring me joy, maybe mine
will bring someone else joy.

There's been a few changes in my life this year, both personal and professional,
including but not limited to: getting married and becoming a manager. While the
former has had no impact on my computing setup, the latter has encouraged a
couple changes. I think now being almost the end of the year and a time when I
am on vacation is good time for me to reflect and share what my setup looks like
this year. I'll be talking most about software but will include some of my
hardware and peripherals too.

## Hardware and peripherals

### Computer

The main part is decided for me by work and I just finished switching from a 16"
2021 MacBook Pro 32GB RAM and M1 Pro Processor to a **2023 MacBook Pro 16" 32GB
RAM with M3 Max Processor**

The 2021 is now my personal laptop and what I am using to write this post on.

### Monitor

My main monitor is the **Apple Studio Display**. In March 2022 I bit the bullet
and dropped my hard-earned cash on some pure retina bliss. There was exactly one
studio display shipped to my local Apple retailer for launch day and I happen to
be the lucky bastard who bought it.

Is it the perfect monitor? - nope. Is it pretty awesome? - hell yeah. What I
really love about the studio display is the pixel density, every letter is crisp
and clear, images are vibrant and videos are fantastic. I also love not
cluttering my desk with external speakers, since the built-in ones of the studio
display are pretty good, and when I really want to jam out I put my headphones
on anyway. I like not having a dingus that sits atop my monitor for a webcam or
having cables dangle around from said dingus. I like that I can plug in my USB-C
hub and basically have a KVM.

I do miss the screen real estate afforded by an ultrawide display but whenever I
use one I am quickly reminded that I'll take the trade off of Retina over real
estate every day of the week.

### Headphones

Over ear - [Sony WH1000XM5](https://a.co/d/47BYX3q) - You can't beat the noise
cancellation performance of these cans. The fidelity could be better I'm sure,
but they do the job for my non-audiophile ears.

In Ear - [AirPods Pro V1](https://support.apple.com/en-us/111861) - They work so
well most of the time that I rarely need to think about pairing unpairing or
anything else. Keep them charged and they just connect and go. I did have some
issues and had this set fully replaced under warranty, but since then they've
been working well.

### Mouse

[Logitech MX Master 3](https://www.logitech.com/en-us/products/mice/mx-master-3s-mac-bluetooth-mouse.910-006570.html) -
Mine is older and not the S model. But I have been told the S model is better as
far as clicking noise goes

### Keyboard

I am going to save a long story for possibly a different post. For now, I am
using the
[Keychron K8 Pro](https://www.keychron.com/products/keychron-k8-pro-qmk-via-wireless-mechanical-keyboard?srsltid=AfmBOorOZbLu17VhwNHbobdu6diY2Lnu43K41H_x3_Us3FVdI2f21Xtb)
with cherry MX brown switches. This is hopefully soon to change, as I have been
having some RSI flare-ups and looking to go split keyboard.

I have also used the
[NuPhy Air75 V1 (Link is for the V2)](https://nuphy.com/collections/in-stock-keyboards/products/air75-v2)
mostly as a travel keyboard, but also as a swap out when I'm having a
particularly bad flare up in my forearms.

## Browser(s)

It pretty much comes down to [Arc](https://arc.net) from The browser company. So
far I have liked what these folks are trying to do - re-imagine the computing
experience - since it seems like a lot of work is browser first. It makes sense
to change our thinking about what a browser really is, and how we use it.

Things I have liked about Arc include:

**The tab bar** and more importantly the distinct pinned area where I can place
web tools I use often. The unpinned tab area below is what I consider to be
ephemeral space - tomorrow it's empty and we start over. Since I do a lot of
investigations, research and spelunking through logs having a button I can click
that just says - bye bye tabs is so convenient as I work throughout the day.

**Spaces** - A place for personal stuff and one for work stuff, separation of
church and state or something. Built in routing settings allow you to specify
certain domains always open in certain spaces, ensuring fewer annoyances when
opening work GitHub repos or LinkedIn profile links.

**Little Arc** - Opening a link from Slack is often a short-lived item, I need
to reference something from the link (often a UUID) but I don't need the tab
living forever, this is where little arc is magic. It opens a smaller less full
featured window for you to browse until you're done with it. If you need to keep
it around you can hit the keyboard shortcut or button in the top right and it
will move to your currently specified space - brilliant.

**Preview** - Sometimes you're surfing and you open a link just to see something
quickly, maybe a link from a blog post or link to a trace from log. You came you
saw and you're done. The preview means just that - close it and your "base" tab
is still there. But I wanted that tab to stick around, I hear you say? Ah, well
you're in luck another button press, and it opens in a "real" tab and goes in
the sidebar.

**ChatGPT Search** - Got a question you know google can't answer - CMD+T start
typing and choose the ChatGPT option instead of searching in Google. Easy Peasy.

Things I don't like:

**Bookmarks** - They aren't a thing in Arc, it's not that they don't exist - but
they're replaced with pins. I've had a routine of backing up and moving around a
bookmarks.html file pretty much my entire computing life.... it feels weird to
live without them. That said, I don't necessarily "miss" them in Arc, more that
it feels wrong that I don't have them.

I do use Chrome but only for web dev - I like to keep my dev browser isolated
from my "real" browser.

## Code Editors, IDEs and Developer Tools

How it started - PyCharm, how it's going - Neovim. Yeah, it's been a big year
for me. Let me start by saying my first lines of code were written in Notepad++
and I thought that was the shit. Then I learned I didn't need to use `print()`
or `console.log()` or `alert()` everywhere if I used an IDE.... game changer.

When I started writing python professionally, I couldn't believe how powerful
PyCharm was and honestly it still is. I think the difference is the other tools
have more or less caught up in power, but spank its ass for speed. VSCode is
faster, and Neovim is faster again. I do _still_ use PyCharm from time to time
for some if it's excellent refactoring tools, but in most cases I use VSCode as
my second editor now. I say _now_ because I started this year primarily using
PyCharm as my python IDE and VSCode as my Typescript IDE. Now I'm just using
Neovim as much as I can. Somewhere in the middle, I made a stop at all things
being done in VSCode and I still use it for interactive debugging (but with vim
keybindings). I plan to figure out interactive debugging within Neovim in the
new year.

### Github Copilot

Regardless of what editor I'm using, Copilot is there. Not to make me look
smarter than I am as some have suggested, but type all the tedious boilerplate
that comes with writing tests, or general framework code. Not perfect but still
faster and saves me some keystrokes - I can use the help with (RSI).

### Neovim

I have some colleagues that swear by Neovim, for the longest time I thought they
were all just "that person". Everyone has a story about that one person they
worked with that was all in on vim and would love nothing more than to bend your
ear for hours about how it's really GNU/Linux and how they use Arch BTW. But
then I looked at the people I work with today who still proclaim Neovim as best
editor and thought I'd give it a second look. Then my colleague Dusty joined
Float and I had to give it a third look as I read through
[his book all about LazyVim](https://lazyvim-ambitious-devs.phillips.codes/course/chapter-1/).
We now have a growing community of Neovim users at work and having a community
to ask questions to seems like half the battle.

I am still learning but so far very much enjoy the speed of searching, moving
and editing text. When I think about modal editing - it really does make a lot
of sense. After all, most of my time as a developer now is spent reading and
editing, not writing new things.

### [Cursor](https://www.cursor.com)

I have to be honest, I am not a great react developer. I can write a component
and hooks and get around, but when it comes to having opinions about organizing
the project - I leave those choices to the more seasoned frontend folks on my
team. That means when I go looking for something, I often can't easily find it -
but Cursor can. It can use a lot of different pieces of your project in its
prompts to look for whatever the hell that piece of code is that does that one
thing and interacts with that other one.... If I knew the file, I would be
faster in any other tool but that's the beauty, now I don't need to go bother
someone to help me find it, I can ask AI and get an answer. Kinda nice.

I did try writing a little side project tool using only Cursor, if it got things
wrong, I had to re-prompt to get the right outcome. I accomplished the task and
it worked, but I think I would have been better off writing it by hand.

### [PyCharm](https://www.jetbrains.com/pycharm/)

I already talked about this in the intro. I started writing python
professionally with PyCharm. I still feel something for it, like we all do with
our firsts I guess. What I use it for now is mostly refactoring big swaths of
code - renaming variables, changing signatures for methods that are used in lots
of places. I also use it for its universal search, if I know what a thing is
roughly called I can find with PyCharm search everywhere, when I really just
can't in VSCode. That said, with fzf and Neovim, I don't think this is a use
case any longer.

### [Kitty](https://sw.kovidgoyal.net/kitty/) Terminal

To have a good Neovim experience, one needs a good terminal. My colleague Dusty
recommended Kitty, and so that's what I switched to when I started transitioning
to Neovim. Prior to that, I was an [iterm2](https://iterm2.com) user for as long
as I have a used a Mac, as I found it to be the most like
[terminator](https://gnome-terminator.org) from my Linux days.

The few things I know about kitty are that it uses GPU and VRAM to increase
performance, it cares about performance and I can perceive the difference when
using it. It also has cursor trails, which are fun when you are whipping around
in Neovim. Additionally, it is keyboard centric which if you're trying to go to
as much keyboard usage as possible is handy.

### [DevUtils](https://devutils.com)

It's a handy toolbox for things one might need to do as a developer: Regex, Unix
timestamps, UUID Generator, All kinds of formatting and serializing, converting
and hash generation. Basically think of utility function and it probably does
it. I got it on Black Friday sale and well worth the $20 or so I paid.

## "Productivity" Tools

### [Todoist](https://todoist.com)

My to-do list app of choice - mostly because I can see it on my phone, my
calendar (see below) and it integrates with Obsidian for my daily notes. I can
have different projects and set reminders.

When things are ultra simple, I might elect to just do a simple to-do list in
markdown in Obsidian but if something isn't in my face, I won't remember to do
it.

I'm on the free plan as it serves most of my needs just fine. I did pay for it
previously, but I just found I wasn't using enough of paid features to make it
worthwhile. Mostly I used the location reminders. Push comes to shove, I can use
Apple reminders to accomplish that if I really need it.

### [Fantastical](https://flexibits.com/fantastical)

Fantastical by flexbits is my calendar tool of choice - it integrates with every
service I need it to, it has natural language processing for event inputs and I
can customize which calendars are visible easily and have them change at certain
times of day or with certain focus modes in Apple land.

It's expensive AF and every March when my subscription renews I find myself
contemplating if I want to renew. The thing it comes down to for me is how fast
I can create an event and how familiar I am with it. I could accomplish
everything I need in Apple calendar but less efficiently. Now that I spend a lot
of my days in meetings, it seems worth it - but I'll probably still consider
things in March.

### [Raycast](https://www.raycast.com)

This could be a post unto itself, but let's just say Raycast does a lot of heavy
lifting in my computing day. It reminds me of events, lets me take ephemeral
notes, launches apps, handles my window management, runs shell scripts, controls
my smart home and gets me where I need to go FASSSSTT. Honestly, if it weren't
for Raycast my computing experience would now feel wrong.

### [Obsidian](https://obsidian.md)

Yet another app I could write an entire blog post about. This is my note taking
app of choice if it needs to stay in computer land. I use a hybrid approach to
notes and have paper and pen combined with obsidian.

I love that notes are local, markdown and I can open them with anything that can
read/write markdown files. I also really enjoy the community and plug-in
ecosystem. It can be overwhelming at first but now I have a folder structure
that works for me and the right set of plugins to make it sing.

## Utilities and Navigation

### [Shottr](https://shottr.cc)

A better screenshot experience. Take a Screenshot, open an editor, mark up the
image, copy or save. The option to copy the image to my clipboard means I rarely
ever save screenshots, since they just get trashed in a week or two anyway.

A very simple task focused tool that does what I need and lets me annotate
screenshots before sending. Super convenient for a product team. I tossed some
coin to this Witcher for making a product I use every day, making it free and
making me not need to think about it.

### [Dropover](https://dropoverapp.com)

I have loved macOS from the very first time I used it, but one thing I have
found cumbersome is the finder. Having used windows and Ubuntu before ever using
a Mac, I didn't think my expectations were high, but I guess every other OS has
a better built in file explorer than macOS. Dragging and dropping feels awkward
every time I try it on a Mac. No matter how embedded I am now in the ecosystem
it still feels wrong. Enter Dropover.

Dropover is a little utility that creates a small window it calls a shelf when
you hold a file object and jiggle the mouse, you can then place any number of
files in your shelf as an intermediate place to build up a collection of files
before dropping them wherever they should go. Very handy and solves my biggest
issue with macOS — using a GUI to move files.

Melissa and I recently used this to split up a bunch of our wedding photos to
make different albums and send them off for printing. She enjoyed it Dropover
too so it gets spouse approval.

### [Velja](https://sindresorhus.com/velja)

Ok we all use a bunch of apps that can open links (linear, Spotify, slack etc.)
But the default behaviour most of the time is to open in your default browser.
This little utility app is your air traffic controller for links. You can make
custom rules for any domain or link shape you like and it will gladly invoke
that app or alternate browser based on your rule. Honestly, it feels like
something any OS should have built in at this point.

### [Bartender](https://www.macbartender.com)

It seems that every Mac app nowadays has a menu bar icon, for some reason, it
may not provide much use, but it's there. Some apps allow you to disable their
menu bar item, some don't but with bartender it disappears nicely behind a list.
You can configure what is displayed, and more importantly what isn't, very
handy. It is a paid app and there are free alternatives, this one is a bit more
polished.

[Hidden bar](https://github.com/dwarvesf/hidden) is one I have used in the past
that is pretty good.

### [Shortcat](https://shortcat.app)

Another app I'm using to try to combat RSI — this little utility places a bunch
of symbols on the screen for you to interact with any app. Set your shortcut and
stopping using the mouse, it's that simple.

## Conclusion

I hope you enjoyed reading this post and maybe find a tool or a trick to take
with you in your computing journey in 2025. If you didn't, I at least had phone
making this post 😝
