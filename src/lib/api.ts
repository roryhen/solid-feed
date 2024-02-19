import { action, cache } from "@solidjs/router";
import { storage } from "./db";
import { FeedData, extract } from "@extractus/feed-extractor";

type FeedSource = {
  id: string;
  feed: FeedData;
};

type Unread = {
  id: string;
  published: Date;
}

export const getFeeds = cache(async () => {
  return ((await storage.getItem("feeds")) as FeedSource[]) || [];
}, "feeds");

export const getFeed = cache(async (id: string) => {
  return (await getFeeds()).find((feed) => feed.id === id);
}, "feed");

export const getUnread = cache(async () => {
  return ((await storage.getItem("unread")) as Unread[]) || [];
}, "unread");

export const saveFeed = action(async (formData: FormData) => {
  const url = String(formData.get("url"));
  let result: FeedData;
  try {
    result = await extract(url);
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to extract feed",
      error: error,
    };
  }

  const feeds = await getFeeds();
  const hasFeed = feeds.findIndex((source) => source.id === url);
  if (hasFeed !== -1) {
    return {
      message: "Feed already exists",
      error: null,
    };
  }

  // save unread
  for (const entry of result.entries?.slice(0,3) || []) {
    await saveUnread({id: entry.id, published: entry.published ? new Date(entry.published) : new Date()});
  }

  await storage.setItem("feeds", [...feeds, { id: url, feed: result }]);
  return {
    message: "Feed saved",
    error: null,
  };
});

export const saveUnread = action(async (unread: Unread) => {
  const unreads = (await getUnread()).filter((entry) => entry.id !== unread.id);
  await storage.setItem("unread", [...unreads, unread]);
  return {
    message: "Added to unread",
    error: null,
  };
});

export const deleteFeed = action(async (id: string) => {
  const feeds = (await getFeeds()).filter((source) => source.id !== id);
  await storage.setItem("feeds", feeds);
  return {
    message: "Feed deleted",
    error: null,
  };
});

export const markAsRead = action(async (unread: Unread) => {
  const unreads = (await getUnread()).filter((entry) => entry.id !== unread.id);
  await storage.setItem("unread", unreads);
  return {
    message: "Marked as read",
    error: null,
  };
});
