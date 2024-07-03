import type { RouteSectionProps } from "@solidjs/router";
import { For, Show } from "solid-js";
import { FeedItem } from "~/components/feed-item";
import { useFeedContext } from "~/components/feed-provider";
import { Flex } from "~/components/ui/flex";
import { slugify } from "~/lib/utils";

export default function FeedPage({ params }: RouteSectionProps) {
  const [feeds] = useFeedContext();

  const feed = () =>
    feeds.find((f) => f.title && slugify(f.title) === params.slug);

  return (
    <Show when={feeds}>
      <h1 class="font-extrabold text-3xl mb-4">{feed()?.title}</h1>
      <Flex class="gap-3 p-4 pt-0" alignItems="stretch" flexDirection="col">
        <For each={feed()?.entries}>
          {(entry) => (
            <li>
              <FeedItem entry={entry} />
            </li>
          )}
        </For>
      </Flex>
    </Show>
  );
}
