import { FAVORITE } from "~/lib/constants";
import { FeedEntryEnhanced, useFeedStore } from "./feed-provider";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Flex } from "./ui/flex";
import { IconExternalLink, IconStar } from "./ui/icons";
import { Separator } from "./ui/separator";

export default function FeedItem(props: { entry?: FeedEntryEnhanced }) {
  let [feeds, setFeeds] = useFeedStore();
  let pubDate = Intl.DateTimeFormat("en-US").format(
    new Date(props.entry?.published ?? ""),
  );

  let isFavorite = () => props.entry?.tags.includes(FAVORITE);

  let toggleFavorite = () => {
    setFeeds(
      { from: 0, to: feeds?.length - 1 || 0 },
      "entries",
      (entry) => entry.id === props.entry?.id,
      "tags",
      (tags) =>
        isFavorite()
          ? tags.filter((tag) => tag !== FAVORITE)
          : [...tags, FAVORITE],
    );
  };

  let toggleUnread = () => {
    setFeeds(
      { from: 0, to: feeds?.length - 1 || 0 },
      "entries",
      (entry) => entry.id === props.entry?.id,
      "unread",
      (unread) => !unread,
    );
  };

  return (
    <Card
      class="relative group data-[unread=false]:opacity-50"
      data-unread={props.entry?.unread}
    >
      <Separator
        class="absolute left-0 rounded-full group-data-[unread=true]:border-8 group-data-[unread=true]:border-amber-300 [clip-path:inset(0_80%_0_0)]"
        orientation="vertical"
      />
      <CardHeader class="p-4">
        <Flex class="gap-2" alignItems="start">
          <button type="button" onClick={toggleFavorite}>
            <IconStar
              class={`${isFavorite() ? "fill-amber-300 " : ""}stroke-amber-300`}
            />
          </button>
          <CardTitle class="text-md leading-none">
            <a class="flex gap-2" href={props.entry?.link} target="_blank">
              {props.entry?.title}
              <IconExternalLink class="text-muted-foreground" />
            </a>
          </CardTitle>
          <time
            class="ms-auto text-sm font-semibold text-muted-foreground"
            datetime={pubDate}
          >
            {pubDate}
          </time>
        </Flex>
        <CardDescription>{props.entry?.source}</CardDescription>
      </CardHeader>
      <Flex class="p-4 pt-0 gap-8" alignItems="end">
        <CardContent class="p-0 text-xs">
          {props.entry?.description}
        </CardContent>
        <Button
          class="shrink-0 text-xs"
          size="sm"
          variant="secondary"
          onClick={toggleUnread}
        >
          Mark {props.entry?.unread ? "read" : "unread"}
        </Button>
      </Flex>
    </Card>
  );
}
