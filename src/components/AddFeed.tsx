import { Flex } from "./ui/flex";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { saveFeed } from "../lib/api";
import { Component } from "solid-js";

export const AddFeed: Component = () => {
  return (
    <form action={saveFeed} method="post">
      <Label class="mb-2 block font-light text-muted-foreground" for="feed-url">
        Enter Feed Url
      </Label>
      <Flex class="gap-2">
        <Input id="feed-url" name="url" />
        <Button aria-label="Add Feed">
          <span class="rotate-45 text-xl">⚲</span>
        </Button>
      </Flex>
    </form>
  );
};
