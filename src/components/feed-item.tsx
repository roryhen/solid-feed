import { Component } from "solid-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FeedEntry } from "@extractus/feed-extractor";
import { Flex } from "./ui/flex";
import { IconExternalLink } from "./ui/icons";

export const FeedItem: Component<{
  entry: FeedEntry & {
    source?: string;
  };
}> = (props) => {
  const pubDate = Intl.DateTimeFormat("en-US").format(
    new Date(props.entry.published ?? ""),
  );
  return (
    <Card>
      <CardHeader class="p-4">
        <Flex>
          <CardTitle class="text-md leading-none">
            <a class="flex gap-2" href={props.entry.link}>
              {props.entry.title}
              <IconExternalLink class="text-muted-foreground" />
            </a>
          </CardTitle>
          <time
            class="text-sm font-semibold text-muted-foreground"
            datetime={pubDate}
          >
            {pubDate}
          </time>
        </Flex>
        <CardDescription>{props.entry.source}</CardDescription>
      </CardHeader>
      <CardContent class="p-4 pt-0 text-xs">
        {props.entry.description}
      </CardContent>
    </Card>
  );
};
