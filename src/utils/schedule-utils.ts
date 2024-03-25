import type { StreamGuestInfo } from "../components/StreamSchedule.astro";

export function getHeadingId(name: string, dateTime: string) {
  const [date] = dateTime.split("T");
  return `${date}-${encodeURIComponent(name.replace(/\s+/, "-"))}`.toLowerCase();
}

export function getLocalizedDate({
  date,
  locale,
  timezone,
  showTime = false,
}: {
  date: string;
  locale: string;
  timezone: string;
  showTime: boolean;
}) {
  const timeStyle = showTime ? "long" : undefined;
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    dateStyle: "full",
    timeStyle,
  };

  return new Date(date).toLocaleString(locale, options);
}

export function getLatestGuestMarkup({
  guests,
  locale,
  timezone,
}: {
  guests: StreamGuestInfo[];
  locale: string;
  timezone: string;
}) {
  if (!guests) {
    return ``;
  }

  return guests.reduce((acc, guest) => {

    const { date, streamTitle, name } = guest;
    const headingId = getHeadingId(name, streamTitle);
    const guestDate = getLocalizedDate({
      date,
      locale,
      timezone,
      showTime: true,
    });

    return acc + `
    <ol class="post-list__items sf-flow pad-top-300" reversed>
      <li class="post-list__item">
        <h3 class="font-base leading-tight text-600 weight-mid">
          <a href="/pages/stream-schedule/#${headingId}" class="post-list__link" rel="bookmark">${streamTitle}</a>
        </h3>
        <time datetime="${date}" class="text-500 gap-top-300 weight-mid">${guestDate}</time>
      </li>
    </ol>
    `;
  }
    , '<h2 class="post-list__heading text-700 md:text-800">Upcoming Live Streams</h2>');
}

const GUEST_FIELDS = [
  "Date",
  "Name",
  "Guest Title",
  "Stream Title",
  "Stream Description",
  "YouTube Stream Link",
  "Twitter Username",
  "Twitch Handle",
  "GitHub Handle",
  "YouTube Channel",
  "Website",
] as const;

export async function getStreamSchedule({
  apiKey,
  baseId,
}: {
  apiKey: string;
  baseId: string;
}): Promise<StreamGuestInfo[]> {
  // Only get guests on the stream schedule from the day before and on
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 0, 0);

  const startDate = yesterday.toISOString();
  // Only get guests on the stream schedule from the day before and on
  const filter = `&filterByFormula=AND(IS_AFTER({Date}, '${startDate}'), {On%20Schedule})`;
  const sorter = `&sortField=Date&sortDirection=asc`;

  // Generates querystring key value pairs that look like this, Name&fields[]=Guest%20Title&fields[]=Stream%20Title
  const fields = GUEST_FIELDS.map(encodeURIComponent).join("&fields[]=");

  // Uses the Airtable API's filterByFormula (see https://support.airtable.com/docs/how-to-sort-filter-or-retrieve-ordered-records-in-the-api)
  const streamGuestInfoQueryUrl = `https://api.airtable.com/v0/${baseId}/Stream%20Guests?${filter}${sorter}&fields[]=${fields}`;

  const response = await fetch(streamGuestInfoQueryUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  interface GuestRecord {
    createdTime: string;
    fields: Record<(typeof GUEST_FIELDS)[number], string>;
  }

  const { records } = (await response.json()) as { records: GuestRecord[] };
  // Can't use satifies. Functions bundler doesn't support it yet
  const schedule: StreamGuestInfo[] = records.map(({ fields }) => {
    const {
      Date: date,
      Name: name,
      "Guest Title": title,
      "Stream Title": streamTitle,
      "Stream Description": streamDescription,
      "YouTube Stream Link": youtubeStreamLink,
      "Twitter Username": twitter,
      "Twitch Handle": twitch,
      "GitHub Handle": github,
      "YouTube Channel": youtube,
      Website: website,
    } = fields;

    return {
      date,
      name,
      title: title ?? "",
      streamTitle,
      streamDescription,
      youtubeStreamLink,
      twitter,
      twitch,
      github,
      youtube,
      website,
    };
  });

  return schedule;
}
