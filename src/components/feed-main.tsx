import { useSearchParams } from "@solidjs/router";
import { createMemo, mergeProps, Suspense } from "solid-js";
import FeedList from "~/components/feed-list";
import SearchField from "~/components/search-field";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useFeedStore } from "./feed-provider";
import { slugify } from "~/lib/utils";

export function TopBar(props: { name?: string }) {
  props = mergeProps({ name: "Feed" }, props);

  return (
    <div class="flex gap-2 items-center px-4 py-2">
      <h1 class="text-xl font-bold">{props.name}</h1>
      <TabsList class="ml-auto">
        <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">
          Unread
        </TabsTrigger>
        <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
          All items
        </TabsTrigger>
      </TabsList>
    </div>
  );
}

export default function FeedMain() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [feeds] = useFeedStore();

  let handleSearch = (e: SubmitEvent) => {
    let term =
      new FormData(e.target as HTMLFormElement).get("q")?.toString() || "";
    setSearchParams({ q: term });
  };

  let title = createMemo(() => {
    return feeds.find((feed) => slugify(feed.title ?? "") === searchParams.feed)
      ?.title;
  });

  return (
    <Tabs class="max-h-screen flex flex-col" defaultValue="unread">
      <TopBar name={title()} />
      <Separator />
      <SearchField onSubmit={handleSearch} />
      <Suspense fallback={<p>Loading...</p>}>
        <TabsContent
          value="unread"
          class="flex flex-col flex-1 overflow-auto m-0"
        >
          <FeedList filter="unread" />
        </TabsContent>
        <TabsContent value="all" class="flex-1 m-0">
          <FeedList filter="all" />
        </TabsContent>
      </Suspense>
    </Tabs>
  );
}
