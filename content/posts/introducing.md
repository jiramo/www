---
title: "Building Jiramo: A CRM tailored for developers"
date: "2026-03-07"
excerpt: "An introduction to Jiramo, an upcoming developer-first CRM with native Git support, a built-in CLI, and smart client management libraries."
---

Jiramo is essentially a CRM built specifically for developers, featuring native Git support. The core idea is to create a tool that handles both project management and customer interactions in a way that actually fits a developer's workflow.

Right now, the application is built for solo users—think a single freelancer or developer managing multiple clients. However, the long-term plan is to scale this up and build out a proper infrastructure to support larger teams.

One of the more interesting aspects of the project is the library system. We are building a set of companion libraries, which will eventually support multiple languages, that you can drop directly into your clients' projects. These libraries include a few out-of-the-box features, like basic analytics and a remote block feature (basically a kill-switch for the site in case of unpaid invoices).

We aren't quite at the beta stage yet, but we're getting pretty close. The project itself is broken down into four main parts:

* The core app (backend and dashboard)
* A CLI application
* The client libraries
* The main website and documentation

For the tech stack, I went with Go for the entire backend, while the dashboard and web components are built using React and Next.js.

Since things are moving forward, I'm currently looking for people who might want to get involved. Depending on what you prefer working on—whether it's diving into the Go backend, tweaking the Next.js frontend, or building out the CLI—there is plenty to do.

If you want to take a look at where things are at or see if you'd like to contribute, you can check out the links below:

* **Website:** [https://jiramo.netlify.app/](https://jiramo.netlify.app/)
* **GitHub:** [https://github.com/jiramo](https://github.com/jiramo)

*Take a look around the repo, drop a star, and let's build the ultimate developer CRM together!*