import { Show, createMemo } from "solid-js";
import Nav from "~/components/nav";
import { IconInbox, IconRSS, IconStar } from "~/components/ui/icons";
import { getDomainName } from "~/lib/utils";
import AddFeed from "./add-feed";
import { useFeedStore } from "./feed-provider";
import { Separator } from "./ui/separator";
import { FAVORITE, FEED, TAG } from "~/lib/constants";

export default function Sidebar(props: { isCollapsed: boolean }) {
  let [feeds] = useFeedStore();

  let links = createMemo(() => {
    return feeds.map((feed) => ({
      title: feed.title ?? "",
      label: "",
      icon: IconRSS,
      variant: "ghost" as const,
      filter: {
        name: FEED,
        value: getDomainName(feed.link ?? "") ?? "",
      },
    }));
  });

  return (
    <>
      <AddFeed isCollapsed={props.isCollapsed} />
      <Separator />
      <Nav
        isCollapsed={props.isCollapsed}
        links={[
          {
            title: "All",
            label: "",
            icon: IconInbox,
            variant: "default",
          },
          {
            title: "Favorites",
            label: "",
            icon: IconStar,
            variant: "ghost",
            filter: { name: TAG, value: FAVORITE },
          },
        ]}
      />
      <Separator />
      <Show when={!!links().length}>
        <Nav isCollapsed={props.isCollapsed} links={links()} />
      </Show>
    </>
  );
}
