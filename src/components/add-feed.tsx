import type { JSX } from "solid-js";
import { extractFeed, hasExistingFeed } from "~/lib/feed";
import { useFeedStore } from "./feed-provider";
import SearchField from "./search-field";
import { showToast } from "./ui/toast";

export default function AddFeed(props: { isCollapsed?: boolean }) {
  let [feeds, setFeeds] = useFeedStore();

  let handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    let toast = {
      title: "ERROR!",
      description: "Something went wrong",
    };

    if (!e.target) {
      showToast(toast);
      return;
    }

    let url = new FormData(e.target as HTMLFormElement).get("q")?.toString();

    if (!url) {
      showToast(toast);
      return;
    }

    extractFeed(url).then((parsed) => {
      if ("message" in parsed) {
        showToast({ ...toast, description: parsed.message });
        return;
      }

      if (feeds && hasExistingFeed(feeds, parsed)) {
        showToast({ ...toast, description: "You already added this feed" });
        return;
      }

      setFeeds((feeds) => [...feeds, parsed]);
    });
  };

  return (
    <SearchField
      class="p-2"
      label="Enter feed url"
      isCollapsed={props.isCollapsed}
      onSubmit={handleSubmit}
    />
  );
}
