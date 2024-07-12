import { useSearchParams } from "@solidjs/router";
import { ErrorBoundary, For, Show, createMemo } from "solid-js";
import { filterEntries, filterFeeds } from "~/lib/feed";
import FeedItem from "./feed-item";
import { FeedEntryEnhanced, useFeedStore } from "./feed-provider";
import { Flex } from "./ui/flex";
import ErrorPanel from "./error-panel";

export default function FeedList(props: { filter: "all" | "unread" }) {
  let [searchParams] = useSearchParams();
  let [feeds] = useFeedStore();
  let entries = createMemo(() => {
    return feeds
      .filter((feed) => filterFeeds(feed, searchParams))
      .flatMap((feed) => feed.entries)
      .filter((entry) => filterEntries(entry, searchParams))
      .sort(
        (a, b) =>
          new Date(b?.published ?? 0).getTime() -
          new Date(a?.published ?? 0).getTime(),
      );
  });

  let filterUnread = (entry?: FeedEntryEnhanced) => {
    return props.filter === "unread" ? entry?.unread : true;
  };

  return (
    <Flex class="gap-3 p-4 pt-0" alignItems="stretch" flexDirection="col">
      <ErrorBoundary
        fallback={(error) => <ErrorPanel message={error.message} />}
      >
        <Show
          when={!!entries().length}
          fallback={<p>Nothing to read, add another feed perhaps?</p>}
        >
          <For each={entries().filter(filterUnread)}>
            {(entry) => <FeedItem entry={entry} />}
          </For>
        </Show>
      </ErrorBoundary>
    </Flex>
  );
}
