import { defineCollection } from "astro:content";
import { feedLoader } from "@ascorbic/feed-loader";

const twoFull2StackEpisodes = defineCollection({
  loader: feedLoader({
    url: "https://www.youtube.com/feeds/videos.xml?playlist_id=PLZDPKYkCEQk07B0HWWOKH3bqpqOUQuOOk",
  }),
})

const nickytLiveEpisodes = defineCollection({
  loader: feedLoader({
    url: "https://www.youtube.com/feeds/videos.xml?playlist_id=PLcR4ZgxWXeICy2QVTV-6HuEHfl9DcAuq7",
  }),
})

const cfeDevEpisodes = defineCollection({
  loader: feedLoader({
    url: "https://cfe.dev/rss.xml",
  }),

})

export const collections = { cfeDevEpisodes, twoFull2StackEpisodes, nickytLiveEpisodes }