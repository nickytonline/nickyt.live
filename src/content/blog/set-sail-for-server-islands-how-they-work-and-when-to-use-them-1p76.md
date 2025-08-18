---
title: "Astro Server Islands: How They Work and When to Use Them"
excerpt: "Astro introduced a powerful new pattern called Server Islands last year. If you're building with..."
date: "2025-05-19T04:01:00.000Z"
tags:
  - "astro"
  - "webdev"
  - "javascript"
cover_image: "https://www.nickyt.co/images/posts/_dynamic_image_width=1000,height=420,fit=cover,gravity=auto,format=auto_https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxgcw745lfbuvqxp6w3hy.jpg"
canonical_url: "https://www.nickyt.co/blog/set-sail-for-server-islands-how-they-work-and-when-to-use-them-1p76/"
reading_time_minutes: 4
template: "post"
---

Astro introduced a powerful new pattern called [Server Islands](https://docs.astro.build/en/guides/server-islands/) last year. If you're building with Astro, it's worth understanding what they are, how they work, and where they shine (and where they don’t). Their documentation explains server islands really well, but I wanted to dig a little deeper on the technical side of things.

## What Are Server Islands?

Server Islands allow you to render a portion of your page on the server on-demand, without blocking the rest of the page load.

Think of your page as the ocean, mostly static or cached HTML. Now imagine dynamic content rising out of that ocean like islands appearing after the tide goes out. These "server islands" let you render just the parts of the page you need from the server, without slowing down the rest.

This pattern is useful for:

- Personalized greetings
- Authenticated user info (avatars, session data)
- Region-specific content (prices based on country)
- Anything dynamic that shouldn’t block first render

Unlike traditional Server-Side Rendering (SSR) where the whole page waits for server data, Server Islands let you defer just part of the page until after load.

Server Islands were partially inspired by Next.js’s [Partial Pre-Rendering](https://nextjs.org/learn/dashboard-app/partial-prerendering) (PPR), which similarly balances static and dynamic content by deferring specific sections to load asynchronously.

## How They Work

The API is simple: you use the `server:defer` directive on an Astro component.

Example:

```astro
<SomeServerIsland server:defer />
```

This tells Astro to replace that component with a placeholder and fetch the real HTML immediately from the server after the page loads. You can also provide a fallback UI that renders in the initial page load server-side while the island is being fetched:

```astro
<SomeServerIsland server:defer>
  <div slot="fallback">Loading some server island...</div>
</SomeServerIsland>
```

What actually happens under the hood:

At build time, [Astro replaces the island with a small script](https://docs.astro.build/en/guides/server-islands/#how-it-works).
Here's an expanded view:

```html
<!--[if astro]>server-island-start<![endif]-->
<h1>Hello World</h1>
<link
  rel="preload"
  as="fetch"
  href="/_server-islands/SomeServerIsland?e=default&p=&s=%7B%7D"
  crossorigin="anonymous"
/>
<script
  type="module"
  data-astro-rerun
  data-island-id="137eec60-035b-4630-b4af-365acd683b97"
>
  let response = await fetch(
    "/_server-islands/SomeServerIsland?e=default&p=&s=%7B%7D",
  );
  replaceServerIsland("137eec60-035b-4630-b4af-365acd683b97", response);
</script>
```

The script fetches the HTML for that component from a special server endpoint (e.g. `/_server-islands/SomeServerIsland?e=default&p=&s=%7B%7D`) and replaces the node which may or may not have fallback markup with the rendered HTML once the response is ready.

Here’s the client-side function that makes that swap happen:

```typescript
async function replaceServerIsland(id, r) {
  let s = document.querySelector(\`script[data-island-id="\${id}"]\`);

  // If there's no matching script, or the request fails then return
  if (!s || r.status !== 200 || r.headers.get('content-type')?.split(';')[0].trim() !== 'text/html') return;

  // Load the HTML before modifying the DOM in case of errors
  let html = await r.text();

  // Remove any placeholder content before the island script
  while (s.previousSibling && s.previousSibling.nodeType !== 8 && s.previousSibling.data !== '[if astro]>server-island-start<![endif]')
    s.previousSibling.remove();
  s.previousSibling?.remove();

  // Insert the new HTML
  s.before(document.createRange().createContextualFragment(html));

  // Remove the script. Prior to v5.4.2, this was the trick to force rerun of scripts.  Keeping it to minimize change to the existing behavior.
  s.remove();
}
```

### A Fun Discovery

Someone in the chat during my livestream asked if Server Islands work inside client components. I mentioned that a Server Island has to be an Astro component, so you can't directly embed one inside a client component like React, Vue, Svelte, or Solid. But I suspected it would probably work if passed as a child.

Believe it or not, it does. Embedding Server Islands inside client components works as long as you pass them as children.

And it makes sense if you think about it. Astro renders the Server Island as plain HTML, so the client-side component renders its markup on the server as usual. The page loads, the Server Island hydration script kicks in and updates the placeholder, and then the client component bootstraps its interactivity like normal.

## Limitations and Gotchas

- Server islands only work with `.astro` components, not React, Vue, Svelte, Solid, etc.

- You can't place a server island directly inside a client component, but you _can_ pass it as a child.

- You must set [`output: "server"`](https://docs.astro.build/en/reference/configuration-reference/#output) in your Astro config.

- During development, no adapter is required—but for deployment you'll need one (e.g. Netlify, Vercel, Node).

- JavaScript must be enabled in the browser for the islands to render properly.

## Where Can You Use Them?

**Ideal for:**

- Showing personalized or location-based content

- Displaying user data post-login

- Incrementally enhancing static pages

- SEO-friendly dynamic blocks (e.g., “related articles,” recent comments)

**Not ideal for:**

- Entirely dynamic pages

- JS-disabled environments

- Components that require full client-side interactivity before page load

## Wrapping Up

Server Islands are a great way to blend static-first performance with dynamic, server-rendered content. They're lightweight, easy to use, and a smart alternative to full-page SSR when you only need to personalize a section of the page.

If you're already using Astro, this is a feature worth exploring—especially if you're serving authenticated content or want to progressively enhance your pages.

All you need is `server:defer`, and you’re off to the islands. 🏝️ Learn more about [server islands in the official Astro documentation](https://docs.astro.build/en/guides/server-islands/).

---

Watch the full walkthrough:
{% embed "https://www.youtube.com/watch?v=YOjFpR3vrEQ" %}

Want to connect?
All my socials are at [nickyt.online](https://nickyt.online)

Cover image by [Marek Okon](https://unsplash.com/@marekokon?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/photography-of-island-against-sky-WScpndZFrOM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
