import { Component, JSX, Show, Suspense } from "solid-js";
import { Nav } from "~/components/nav";
import { IconInbox, IconStar, IconUser } from "~/components/ui/icons";
import { SearchField } from "./search-field";
import { Separator } from "./ui/separator";
import { useFeedContext } from "./feed-provider";
import { extractFeed } from "~/lib/feed";
import { showToast } from "./ui/toast";

export const Sidebar: Component<{ isCollapsed: boolean }> = (props) => {
  const [feeds, setFeeds] = useFeedContext();
  const links = () => {
    return feeds.map((feed) => {
      return {
        title: feed.title ?? "",
        label: "",
        icon: IconUser,
        variant: "ghost" as const,
      };
    });
  };

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    const toast = {
      title: "ERROR!",
      description: "Something went wrong",
    };

    if (!e.target) {
      showToast(toast);
      return;
    }

    const url = new FormData(e.target as HTMLFormElement)
      .get("url")
      ?.toString();

    if (!url) {
      showToast(toast);
      return;
    }

    extractFeed(url).then((parsed) => {
      if ("message" in parsed) {
        showToast({ ...toast, description: parsed.message });
        return;
      }

      setFeeds((feeds) => [...feeds, parsed]);
    });
  };

  return (
    <>
      <SearchField
        class="p-2"
        label="Enter feed url"
        isCollapsed={props.isCollapsed}
        onSubmit={handleSubmit}
      />
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
          },
        ]}
      />
      <Separator />
      <Show when={links().length}>
        <Nav isCollapsed={props.isCollapsed} links={links()} />
      </Show>
    </>
  );
};
