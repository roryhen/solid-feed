import { RouteDefinition, createAsync } from "@solidjs/router";
import { For, createMemo } from "solid-js";
import { FeedItem } from "~/components/FeedItem";
import { Grid } from "~/components/ui/grid";
import { getFeeds } from "~/lib/api";

export const route = {
  load() {
    return getFeeds();
  },
} satisfies RouteDefinition;

export default function HomePage() {
  const feeds = createAsync(() => getFeeds());
  const entries = createMemo(() => {
    return feeds()
      ?.flatMap((source) => {
        return (
          source.feed.entries?.map((entry) => {
            return {
              ...entry,
              source: source.feed.title,
            };
          }) || []
        );
      })
      .sort(
        (a, b) =>
          new Date(b?.published ?? 0).getTime() -
          new Date(a?.published ?? 0).getTime()
      );
  });

  return (
    <Grid class="gap-3">
      <For each={entries()}>{(entry) => <FeedItem entry={entry} />}</For>
    </Grid>
  );
}
