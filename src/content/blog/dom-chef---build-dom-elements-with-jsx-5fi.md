---json
{
  "title": "dom-chef - Build DOM Elements with JSX",
  "excerpt": "dom-chef-  Build DOM Elements with JSX",
  "date": "2019-02-02T23:45:45.270Z",
  "tags": [
    "webdev",
    "javascript"
  ],
  "cover_image": "https://www.nickyt.co/images/posts/_dynamic_image_width=1000,height=420,fit=cover,gravity=auto,format=auto_https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Fpkajv39sn98rgfgdeotf.jpg",
  "canonical_url": "https://www.nickyt.co/blog/dom-chef---build-dom-elements-with-jsx-5fi/",
  "reading_time_minutes": 1,
  "template": "post"
}
---

build-dom-elements-with-jsx-5fi/
cover_image: https://thepracticaldev.s3.amazonaws.com/i/pkajv39sn98rgfgdeotf.jpg

---

I came across dom-chef while working on a PR for [migrating Refined GitHub to TypeScript](https://github.com/sindresorhus/refined-github/pull/1750) (WIP and something that is interesting on its own if you're new to TypeScript).

At a quick first glance, I thought Refined GitHub was built with React, but as soon as I had that second sip of coffee, I realized it was just JS with some JSX in it.

![](https://media3.giphy.com/media/2JeyC2DvEhdRu/giphy.gif?cid=19f5b51a5c562926446e66326327f7e5)

The TLDR:

- No API, JSX gets auto transformed into actual DOM elements
- Protection from XSS injections
- Partial SVG support
- React-like props naming (including events)
- Mix any DOM elements inside

This is definitely interesting if you're a fan of JSX.

Check out the repository

{% github "https://github.com/vadimdemedes/dom-chef" %}

Photo by [Wyron A](https://unsplash.com/photos/Lhb1DyyNr7U?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/chef?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
