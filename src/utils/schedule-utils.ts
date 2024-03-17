import type { StreamGuestInfo } from "../components/StreamSchedule.astro";

export function buildHeadingAnchor(headingId: string) {
  return `
  <a href="#${headingId}" class="heading-permalink">
        <span class="visually-hidden"> permalink</span>
        <svg fill="currentColor" aria-hidden="true" focusable="false" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z"></path>
        </svg></a>
  `;
}

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

export function getScheduleMarkup({
  schedule,
  locale,
  timezone,
}: {
  schedule: StreamGuestInfo[];
  locale: string;
  timezone: string;
}) {
  const scheduleMarkup = schedule
    .map(
      (
        {
          date,
          streamTitle,
          streamDescription,
          youtubeStreamLink,
          name,
          title,
          twitter,
          website,
          twitch,
          youtube,
          github,
        },
      ) => {
        const guestDate = getLocalizedDate({
          date,
          locale,
          timezone,
          showTime: true,
        });
        const headingId = getHeadingId(name, date);

        return `
    <li class="post-list__item">
      <h2 id="${headingId}">${streamTitle} ${buildHeadingAnchor(headingId)}</h2>
      <time datetime="${date}">${guestDate}</time>
      <div>
        ${github === "nickytonline" ? "" : `<div>Guest: ${name}${title ? `, ${title}` : ""}</div>`}
        <nav class="nav" aria-label="Links for live stream guest ${name}">
          <ul>
          ${buildWebsiteLink({ name, website })}
          ${buildGithubLink({ name, github })}
          ${buildTwitterLink({ name, twitter })}
          ${buildTwitchLink({ name, twitch })}
          ${buildYoutubeLink({ name, youtube })}
          </ul>
        </nav>
        ${youtubeStreamLink ? getStreamLinks(youtubeStreamLink) : ""}
        ${streamDescription
            ? `<p class="gap-top-300">${streamDescription}</p>`
            : ``
          }
      </div>
    </li>
  `;
      }
    )
    .join("");

  return `<ol class="[ post-list__items ] [ sf-flow ] [ pad-top-300 ]">${scheduleMarkup}</ol>`;
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
