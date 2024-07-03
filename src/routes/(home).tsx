import { FeedList } from "~/components/feed-list";
import { SearchField } from "~/components/search-field";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function HomePage() {
  return (
    <Tabs class="max-h-screen flex flex-col" defaultValue="unread">
      <div class="flex items-center px-4 py-2">
        <h1 class="text-xl font-bold">Feed</h1>
        <TabsList class="ml-auto">
          <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">
            Unread
          </TabsTrigger>
          <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
            All items
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <SearchField />
      <TabsContent
        value="unread"
        class="flex flex-col flex-1 overflow-auto m-0"
      >
        <FeedList filter="unread" />
      </TabsContent>
      <TabsContent value="all" class="flex-1 m-0">
        <FeedList filter="all" />
      </TabsContent>
    </Tabs>
  );
}
