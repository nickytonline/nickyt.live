import { defineCollection, z } from "astro:content";

const talksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    video: z
      .object({
        url: z.string(),
        type: z.enum(["youtube", "vimeo", "custom"]),
        image: z
          .object({
            url: z.string(),
            width: z.number(),
            height: z.number(),
          })
          .optional(),
      })
      .optional(),
    venue: z.object({
      name: z.string(),
      url: z.string().optional(),
    }),
    tags: z.array(z.string()),
    slideDeck: z.string().optional(),
    sourceCode: z.string().optional(),
    additionalLinks: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = {
  talks: talksCollection,
};
