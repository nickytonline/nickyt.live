import type { APIRoute } from "astro";
import { getStreamSchedule } from "../utils/schedule-utils";

const SITE_URL = import.meta.env.URL;

export const GET: APIRoute = async () => {
  const streamSchedule = await getStreamSchedule({
    apiKey: import.meta.env.AIRTABLE_API_KEY,
    baseId: import.meta.env.AIRTABLE_STREAM_GUEST_BASE_ID,
  });

  console.log("Stream schedule length:", streamSchedule.length);
  if (streamSchedule.length > 0) {
    console.log("First stream:", {
      title: streamSchedule[0].title,
      date: streamSchedule[0].date,
      guestName: streamSchedule[0].guestName,
    });
  }

  // Sort streams by date
  const sortedSchedule = [...streamSchedule].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  console.log("Sorted schedule length:", sortedSchedule.length);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NickyT.Live Stream Schedule</title>
    <description>Upcoming live streams and guest appearances on NickyT.Live</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    ${sortedSchedule
      .map(
        (stream) => `
    <item>
      <title>${stream.title}</title>
      <description><![CDATA[${stream.description}

Guest: ${stream.guestName}${stream.guestTitle ? ` (${stream.guestTitle})` : ""}

${stream.youtubeStreamLink ? `YouTube Stream: ${stream.youtubeStreamLink}` : ""}
${stream.linkedinStreamLink ? `LinkedIn Stream: ${stream.linkedinStreamLink}` : ""}
${stream.twitter ? `Twitter: https://twitter.com/${stream.twitter}` : ""}
${stream.github ? `GitHub: https://github.com/${stream.github}` : ""}
${stream.website ? `Website: ${stream.website}` : ""}
]]></description>
      <pubDate>${new Date(stream.date).toUTCString()}</pubDate>
      <link>${stream.youtubeStreamLink || stream.linkedinStreamLink || `${SITE_URL}/pages/stream-schedule`}</link>
      <guid isPermaLink="false">${stream.date}-${stream.guestName.replace(/\s+/g, "-")}</guid>
    </item>`,
      )
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml;charset=utf-8",
    },
  });
};
