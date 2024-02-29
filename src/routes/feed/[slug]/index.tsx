import {
  RouteDefinition,
  RouteSectionProps,
  createAsync,
} from "@solidjs/router";
import { For, Show } from "solid-js";
import { FeedItem } from "~/components/FeedItem";
import { getFeed } from "~/lib/api";

export const route = {
  load({ params }) {
    return getFeed(params.slug);
  },
} satisfies RouteDefinition;

export default function FeedPage({ params }: RouteSectionProps) {
  const feed = createAsync(() => getFeed(params.slug));
  return (
    <Show when={feed()} fallback={<div>Loading...</div>}>
      <h1 class="font-extrabold text-3xl mb-4">{feed()?.feed.title}</h1>
      <ul class="grid gap-3">
        <For each={feed()?.feed.entries}>
          {(entry) => (
            <li>
              <FeedItem entry={entry} />
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
}
