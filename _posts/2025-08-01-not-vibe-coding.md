---
layout: post
title: I'm not Vibe Coding and neither are you
---

The term "vibe coding" started cropping several months ago. I thought it was a silly term for using "AI" to code. It's not, it's about turning an into a functional application, prototype or proof of concept without ever actually writing a line of code. Andrej Karpathy coined the term in a [tweet](https://x.com/karpathy/status/1886192184808149383) in February 2025 describing it as "...fully giving in to the vibes, embracing exponentials, and forgetting that the code even exists."
![Andrej Karpathy's famous Vibe coding tweet](/assets/img/karpathy_tweet.png)

Vibe coding is to software what building a house without a measuring tape is to carpentry. One can eyeball it and get pretty close, but it's never going to be square. Software's complexity lies in it's hidden nuance - the code. Your vibe coded project may work 99 times out of 100 but that one time it takes down your whole server. The vibe built house can't hide it's crooked framing, the vibe coded app hides it's flaws behind a shiny interface.

Don't get me wrong, I think there are some great use cases for vibe coding, like building a prototype that demonstrates real user behaviour rather than static designs. Similar to Figma's prototyping feature, only faster and far less manual. What would take a designer days or weeks can now happen in minutes. This fast path to ideation will no doubt unlock product innovation - but for us builders, it's not the goal.

The whole idea behind vibe coding is to forget about the code and focus on the result. That's not what professional software developers do. It's not what business wants from us either - lest we make our business into another headline like the [Tea app](https://www.nbcnews.com/tech/social-media/tea-app-hacked-13000-photos-leaked-4chan-call-action-rcna221139) breach that happened a few days ago. I've seen articles claiming the app was vibe coded but [this Medium article](https://medium.com/@jankammerath/tea-app-hack-disassembling-the-ridiculous-app-source-code-bc585e15bf4f) disassembling the app source code seems to counter that suggesting even AI wouldn't screw it up this badly.

> "This “hack” should’ve never happened. The “tea app” isn’t AI slop, it’s gross negligence from a, likely single, developer with very little experience that should not have been allowed to publish such an application without supervision. The app didn’t “get hacked”, it willingly published sensitive personally identifyable information to the world."

AI or incompetence aside the app "worked" as intended. But software isn't just about getting the job done; it involves nuance, craft, and consequences. The expectations I hold for both software I use and software I build is that it not only works, but does so reliably, safely and efficiently. To achieve that you have to understand the code, to understand the code you must read it - every line. Vibe coders are just not doing that and I'm not saying they should. I'm saying they should refrain from trying to build a business this way. So what is the alternative? As developers we are well versed in using tools, from your favourite command line tool to your IDE and everything in between. That's what we get with coding agents another tool in the toolbox.

![A vibe coded house](/assets/img/vibe_house.png)

## Reasons I use AI

The reasons are I use a coding agent are

1. It gives me time back - I can work on writing a new ticket, or a complex problem or be in a meeting while the agent chews away at another ticket.

2. Agents help me think through problems - Rubber ducking is one of the best debugging tools regardless of your experience level, now imagine the need to write out your chain of thought first and have a duck that can fact check you.

3. Automating the boring - writing tests, scaffolding a new set of components, or building writing the outline for well considered interfaces are the the exiting parts of this job. They are the necessary parts. Why not offload that save my brain for the fun things.

## What I've learned about working with Agents

### Context is key

Like any technical problem the more context a contributor has around the domain the more effective they can be at delivering value. The more your agent knows about what you want to do, what you've already done and the desired outcome the effective it can be. So asking "Build a new component that looks like this" and dropping in a screen grab of a design file will work, you can get so much further with a well crafted prompt and some forethought. I joked with a PM friend recently who was struggling to "get AI to work" for him, and said yeah, you gotta be good and writing out requirements...

### Rules

A feature we see in all the major AI coding platforms now is rules, from `CLAUDE.md` to `.cursor/rules` and whatever other flavour your tool implements I guarantee it has some sort of way to create a rules corpus. My rules usually start pretty straightforward with the projects general preferences, extended with my personal preferences and then some environment information an commands. Here's a sample below of my base rules file for a Django app from cursor that are always attached to prompts. The actual document is much more expansive and goes into implementation specific things. The beauty is this shared across the team!

```markdown
---
description:
globs:
alwaysApply: true
---

- We use uv you can activate the virtual environment by invoking `.venv/bin/activate`
- Always run tests! See `testing-rules.mdc`
- Never try to write your own type stubs unless explictly asked to do so.
- Never modify tests when editing, only add new tests
- In most cases you should avoid dunder methods (e.g. `__setattr__`) exceptions are for `__init__` and`__str__` methods
- always write typed code
- when asked models/domains use MCP servers when available if they can explain this to you

## Models

- New models should always inherit from AuditTrailModel by default
- Migrations should always be auto generated - never make your own migrations, invoke the make make-migrations command
- Never create abstract models
- Never use multi-table inheritance

## Typing

- Use pyright to check typing
- Remove `# pyright: basic` from the code when possible
- never use `Optional` syntax only use `| None`
- avoid `# type: ignore` as much as possible

## Package management

- Use uv
- never use pip
- Question if you need the package and prompt user if they want to install.

## Code style

- Use ruff formatter
- Never add comments to the code
- Never add docstrings to the code
- Always write typed code
```

### Documentation

At Float we believe the closer documentation can live to the code the better. So we have a fair number of docs most of which link out from our `README.md`. This is not only a great resource for developers getting up to speed on a project but also great for coding agents to get context. Having the documentation in source control means the agent can not only read code to understand but read docs.

There's other tools for documentation like [context7](https://context7.com/) which provides an MCP server that can look up the official (or unofficial) documentation for just about any library or API imaginable. If it's not there - you can add it!

In addition to what exists don't be afraid to roll your own! I built our team a custom `django-model-mcp` it uses [Python AST](https://docs.python.org/3/library/ast.html) to traverse the codebase and generate relationships. I had a bunch of decisions to make while building but kept it simple by having the parser simply output a json file that had each node reference each other, and show which files and classes they interact with. It was pretty fun to build and gives the models a really fast way to see how the app is structured.

### Model Context Protocol

I know I already talked about mcp servers above but these things are so powerful for giving your model context and tools. Not only can MCP's allow read operations like querying your database or looking up documentation they can do write functions too! I wrote an entire milestone of a project worth of tickets using Linear MCP and some markdown files. If you've been sleeping on MCP it's time to wake up and smell the context coffee!

![My MCP List](/assets/img/mcp-list.png)

Some of my use cases and favourite MCPs:

1. **[Sequential thinking](https://github.com/modelcontextprotocol/servers/blob/main/src/sequentialthinking/README.md)** - I'm linking this one because I think you can benefit from reading more to understand it. Basically this can turn ANY model into a "thinking" model.

2. **django-model-context** - because I built it and it helps the model know how our code base works

3. **PostgresMCP** - I use this every freaking day, find answers to weird support issues or getting some kind of analysis on usage of a product. It's great to get the bulk of something done while I'm busing doing something else

4. **Linear MCP** - If the ticket is good enough you can just feed that to your model and get it to start working, if it's not you can use it for additional context to your prompt, just plug the ticket number with your prompt and tell it to use linear mcp

5. **GitHub MCP** - I've actually found this one a bit useless since I have `gh` command line tools

-
