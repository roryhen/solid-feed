import { action, cache } from "@solidjs/router";
import type { FeedData } from "@extractus/feed-extractor";
import { extract } from "@extractus/feed-extractor";
import { storage } from "./db";
import { slugify } from "./utils";
import { extractFeed } from "./feed";

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

  // parse feed

  const result = await extractFeed(url);

  if ("message" in result) {
    return result;
  }

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
