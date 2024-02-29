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

export const FeedItem: Component<{
  entry: FeedEntry & {
    source?: string;
  };
}> = (props) => {
  return (
    <Card>
      <CardHeader>
        <Flex>
          <CardTitle>
            <a href={props.entry.link}>{props.entry.title}</a>
          </CardTitle>
          <p class="text-sm text-muted-foreground">{props.entry.source}</p>
        </Flex>
        <CardDescription>
          {Intl.DateTimeFormat("en-US").format(
            new Date(props.entry.published ?? "")
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>{props.entry.description}</CardContent>
    </Card>
  );
};
