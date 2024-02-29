import { createAsyncStore } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import { getFeeds } from "~/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { slugify } from "~/lib/utils";
import { Flex } from "./ui/flex";

export const FeedList: Component = () => {
  const feeds = createAsyncStore(() => getFeeds());
  return (
    <Show when={feeds()?.length} fallback={"No feeds found"}>
      <ul class="mt-4 grid gap-2">
        <For each={feeds()}>
          {(source) => (
            <li>
              <a href={`/feed/${slugify(source.feed.title ?? "")}`}>
                <Card>
                  <CardHeader>
                    <Flex class="gap-6" justifyContent="start">
                      <img
                        src={
                          new URL(source.feed.link || "").origin +
                          "/favicon.ico"
                        }
                        alt=""
                        width={16}
                        height={16}
                      />
                      <CardTitle>{source.feed.title}</CardTitle>
                      <CardDescription></CardDescription>
                    </Flex>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </a>
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
};
