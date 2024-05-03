import { marked } from 'marked';
import Parser from 'rss-parser';

export const DEFAULT_YT_FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCBLlEq0co24VFJIMEHNcPOQ';
export const NICKYT_LIVE_PLAYLIST_FEED_URL = "https://www.youtube.com/feeds/videos.xml?playlist_id=PLcR4ZgxWXeICy2QVTV-6HuEHfl9DcAuq7"

export function getYouTubeId(url: string) {
          return url?.match(
          /(?:live\/|v=)(?<videoId>[^?&]+)/
        )?.groups?.videoId;
}

export async function getVideos(videoFeedUrl: string, numberOfVideos = 6) {
  const parser = new Parser({
    customFields: {
      item: ['media:group', 'media:thumbnail'],
    },
  });

  const feed = await parser.parseURL(videoFeedUrl);

  return feed.items.slice(0, numberOfVideos).map((m) => {
    return {
      title: m.title,
      link: m.link,
      description: m['media:group']['media:description'][0],
      thumbnail: m['media:group']['media:thumbnail'][0].$.url,
      date: m.pubDate ? new Date(m.pubDate) : new Date(),
    };
  }) as unknown as YouTubeVideo[];
}

export async function getLatestVideo(videoFeedUrl: string) {
  const videos = await getVideos(videoFeedUrl, 1);

  return videos[0];
}

export function sanitizeVideoDescription(description: string) {
  return marked.parse(description
    .replace(/Links:?.+/si, '').replace(/Places to follow Nick.+/si, ''))
}
