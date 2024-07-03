import { Component, For, Show, createMemo } from "solid-js";
import { FeedItem } from "./feed-item";
import { useFeedContext } from "./feed-provider";
import { Flex } from "./ui/flex";

export const FeedList: Component<{ filter: "all" | "unread" }> = () => {
  const [feeds] = useFeedContext();
  const entries = createMemo(() => {
    return feeds
      ?.flatMap((feed) => {
        return (feed.entries ?? []).map((entry) => ({
          ...entry,
          source: feed.title,
        }));
      })
      .sort(
        (a, b) =>
          new Date(b?.published ?? 0).getTime() -
          new Date(a?.published ?? 0).getTime(),
      );
  });

  return (
    <Flex class="gap-3 p-4 pt-0" alignItems="stretch" flexDirection="col">
      <Show
        when={entries().length}
        fallback={<p>Nothing to read, add another feed perhaps?</p>}
      >
        <For each={entries()}>{(entry) => <FeedItem entry={entry} />}</For>
      </Show>
    </Flex>
  );
};
