---json
{
  "title": "Live reloading in Rust",
  "excerpt": "I've been learning Rust on and off since last fall. I'm still not proficient in the language as I...",
  "date": "2022-09-03T04:13:20.651Z",
  "tags": [
    "rust",
    "beginners"
  ],
  "cover_image": "https://www.nickyt.co/images/posts/_dynamic_image_width=1000,height=420,fit=cover,gravity=auto,format=auto_https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fq4y8qlrvklc48o6taytb.jpg",
  "canonical_url": "https://www.nickyt.co/blog/hot-reloading-in-rust-4i1c/",
  "reading_time_minutes": 1,
  "template": "post"
}
---

I've been learning [Rust](https://www.rust-lang.org/) on and off since last fall. I'm still not proficient in the language as I haven't dedicated as much time to the language as I'd like to. Still, I find pockets of time, like tonight, to dive in a bit.

A quick Google of "rust hot reloading" introduced me to the rust crate, [cargo-watch](https://crates.io/crates/cargo-watch). I installed it as per their instructions `cargo install cargo-watch`.

From there, I went into a rust project I'm working on and ran the following from the project's root from the command line, `cargo watch -x 'run'`.

And that was it! I was able to start up my program, and with every change, it reran automatically!

```bash
{% raw %}
[Finished running. Exit status: 101]
[Running 'cargo run']
   Compiling rusty v0.1.0
    Finished dev [unoptimized + debuginfo] target(s) in 0.12s
     Running `target/debug/rusty`
["tobey maguire", "andrew garfield", "tom holland"]
[Finished running. Exit status: 0]
[Running 'cargo run']
   Compiling rusty v0.1.0
    Finished dev [unoptimized + debuginfo] target(s) in 0.13s
     Running `target/debug/rusty`
["tobey maguire", "andrew garfield", "tom holland", ""]
[Finished running. Exit status: 0]
[Running 'cargo run']
   Compiling rusty v0.1.0
    Finished dev [unoptimized + debuginfo] target(s) in 0.12s
     Running `target/debug/rusty`
["tobey maguire", "andrew garfield", "tom holland", "pete davidson"]
[Finished running. Exit status: 0]
{% endraw %}
```

🦀

Photo by <a href="https://unsplash.com/@mackenziejcruz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mackenzie Cruz</a> on <a href="https://unsplash.com/s/photos/crabs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
