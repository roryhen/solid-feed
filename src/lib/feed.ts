import { FeedData, extract } from "@extractus/feed-extractor";
import { Params } from "@solidjs/router";
import { withHttps } from "ufo";
import type {
  FeedDataEnhanced,
  FeedEntryEnhanced,
} from "~/components/feed-provider";
import { slugify } from "./utils";

export async function extractFeed(url: string) {
  "use server";

  let normalizedURL = withHttps(url);
  let result: FeedData | undefined;

  try {
    result = await extract(normalizedURL, {
      getExtraFeedFields: (feedData: { image?: { url?: string } }) => {
        console.log("feedData", JSON.stringify(feedData, null, 2));
        return {
          image: feedData?.image?.url,
        };
      },
    });

    if (!result || !result.entries?.length) {
      throw new Error("No feed found");
    }
  } catch (error) {
    return {
      message: "Failed to extract feed",
      error: error,
    };
  }

  let withUnread = addExtraFields(normalizedURL, result);

  return withUnread;
}

function addExtraFields(xml: string, feedData: FeedData) {
  let newEntries = (feedData?.entries ?? []).map((entry, i) => {
    return {
      ...entry,
      source: feedData.title,
      unread: i < 3,
      tags: [],
    };
  });

  return {
    ...feedData,
    xml,
    entries: newEntries,
  };
}

export function hasExistingFeed(feedStore: FeedData[], feedData: FeedData) {
  return feedStore.some((feed) => feed.link === feedData.link);
}

export function filterFeeds(feed: FeedDataEnhanced, params: Partial<Params>) {
  return !params.feed || slugify(feed.title ?? "") === params.feed;
}

export function filterEntries(
  entry: FeedEntryEnhanced,
  params: Partial<Params>,
) {
  if (params.tag) {
    return entry.tags.includes(params.tag);
  }

  if (params.q) {
    let re = new RegExp(params.q, "i");
    return re.test(entry.title ?? "") || re.test(entry.description ?? "");
  }

  return true;
}
