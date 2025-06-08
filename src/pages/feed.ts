import type { APIRoute } from "astro";
import {
  getStreamSchedule,
  get2Full2StackStreamSchedule,
  type StreamGuestInfo,
} from "../utils/schedule-utils";

const SITE_URL = import.meta.env.URL || "https://nickyt.live";

/**
 * Escapes a string for XML.
 * @param unsafe The string to escape.
 * @returns The escaped string.
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"\\]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export const GET: APIRoute = async () => {
  try {
    const [streamSchedule, twoFullTwoStackSchedule] = await Promise.all([
      getStreamSchedule({
        apiKey: import.meta.env.AIRTABLE_API_KEY || "",
        baseId: import.meta.env.AIRTABLE_STREAM_GUEST_BASE_ID || "",
      }),
      get2Full2StackStreamSchedule(),
    ]);

    // Merge both schedules
    const allStreams = [...streamSchedule, ...twoFullTwoStackSchedule];

    console.log("Total streams:", allStreams.length);
    if (allStreams.length > 0) {
      console.log("First stream:", {
        title: allStreams[0].title,
        date: allStreams[0].date,
        type: allStreams[0].type,
      });
    }

    // Sort streams by date
    const sortedSchedule = [...allStreams].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    console.log("Sorted schedule length:", sortedSchedule.length);

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>NickyT.Live Stream Schedule</title>
    <description>Upcoming live streams and guest appearances on NickyT.Live and 2Full2Stack</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    ${sortedSchedule
      .map(
        (stream) => `
    <item>
      <title>${escapeXml(stream.title ?? "")}</title>
      <description><![CDATA[${stream.description ?? ""}

${stream.type === "2-full-2-stack" ? "" : `Guest: ${(stream as StreamGuestInfo).guestName ?? ""}${(stream as StreamGuestInfo).guestTitle ? ` (${(stream as StreamGuestInfo).guestTitle ?? ""})` : ""}`}

${(stream as StreamGuestInfo).youtubeStreamLink ? `YouTube Stream: ${(stream as StreamGuestInfo).youtubeStreamLink ?? ""}` : ""}
${(stream as StreamGuestInfo).linkedinStreamLink ? `LinkedIn Stream: ${(stream as StreamGuestInfo).linkedinStreamLink ?? ""}` : ""}
${(stream as StreamGuestInfo).twitter ? `Twitter: https://twitter.com/${(stream as StreamGuestInfo).twitter ?? ""}` : ""}
${(stream as StreamGuestInfo).github ? `GitHub: https://github.com/${(stream as StreamGuestInfo).github ?? ""}` : ""}
${(stream as StreamGuestInfo).website ? `Website: ${(stream as StreamGuestInfo).website ?? ""}` : ""}
]]></description>
      <pubDate>${new Date(stream.date).toUTCString()}</pubDate>
      <link>${
        stream.type === "2-full-2-stack"
          ? escapeXml((stream as { link: string | undefined }).link ?? "")
          : escapeXml((stream as StreamGuestInfo).youtubeStreamLink ?? "")
      }</link>
      <guid isPermaLink="false">${escapeXml(stream.date)}-${
        stream.type === "2-full-2-stack"
          ? escapeXml(stream.title?.replace(/\s+/g, "-") ?? "")
          : escapeXml(
              (stream as StreamGuestInfo).guestName.replace(/\s+/g, "-") ?? "",
            )
      }</guid>
      ${stream.type === "2-full-2-stack" ? `<media:thumbnail url="${escapeXml((stream as { ogImage: string }).ogImage ?? "")}" />` : ""}
    </item>`,
      )
      .join("\n    ")}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml;charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Netlify-CDN-Cache-Control": "public, max-age=86400, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
};
