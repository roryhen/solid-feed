import { action, cache, redirect } from "@solidjs/router";
import { storage } from "./db";
import { FeedData, extract } from "@extractus/feed-extractor";
import { slugify } from "./utils";

type FeedSource = {
  id: string;
  slug: string;
  feed: FeedData;
};

type Unread = {
  id: string;
  published: Date;
};

export const getFeeds = cache(async () => {
  "use server";
  return ((await storage.getItem("app:feeds")) as FeedSource[]) || [];
}, "feeds");

export const getFeed = cache(async (slug: string) => {
  "use server";
  return (await getFeeds()).find((feed) => feed.slug === slug);
}, "feed");

export const getUnread = cache(async () => {
  "use server";
  return ((await storage.getItem("app:unread")) as Unread[]) || [];
}, "unread");

export const saveFeed = action(async (formData: FormData) => {
  "use server";
  const url = String(formData.get("url"));
  let result: FeedData;

  // parse feed
  try {
    result = await extract(url);
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to extract feed",
      error: error,
    };
  }

  // save unread
  // for (const entry of result.entries?.slice(0, 3) || []) {
  //   await saveUnread({
  //     id: entry.id,
  //     published: entry.published ? new Date(entry.published) : new Date(),
  //   });
  // }

  // check if feed exists
  const feeds = await getFeeds();
  const hasFeed = feeds.findIndex((source) => source.id === url);
  if (hasFeed !== -1) {
    return {
      message: "Feed already exists",
      error: null,
    };
  }

  // save feed
  await storage.setItem("app:feeds", [
    ...feeds,
    { id: url, slug: slugify(result.title ?? ""), feed: result },
  ]);
  return {
    message: "Feed saved",
    error: null,
  };
}, "save-feed");

export const saveUnread = action(async (unread: Unread) => {
  "use server";
  const unreads = (await getUnread()).filter((entry) => entry.id !== unread.id);
  await storage.setItem("app:unread", [...unreads, unread]);
  return {
    message: "Added to unread",
    error: null,
  };
}, "save-unread");

export const deleteFeed = action(async (id: string) => {
  "use server";
  const feeds = (await getFeeds()).filter((source) => source.id !== id);
  await storage.setItem("app:feeds", feeds);
  return {
    message: "Feed deleted",
    error: null,
  };
}, "delete-feed");

export const markAsRead = action(async (unread: Unread) => {
  "use server";
  const unreads = (await getUnread()).filter((entry) => entry.id !== unread.id);
  await storage.setItem("app:unread", unreads);
  return {
    message: "Marked as read",
    error: null,
  };
}, "mark-as-read");
