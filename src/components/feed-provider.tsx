import type { FeedData, FeedEntry } from "@extractus/feed-extractor";
import { makePersisted } from "@solid-primitives/storage";
import { JSX, createContext, onMount, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

export type FeedEntryEnhanced = FeedEntry & {
  source?: string;
  unread: boolean;
  tags: string[];
};

export type FeedDataEnhanced = FeedData & {
  xml: string;
  entries: FeedEntryEnhanced[];
};

let FeedContext = createContext<
  [FeedDataEnhanced[], SetStoreFunction<FeedDataEnhanced[]>]
>([[], () => []]);

export default function FeedProvider(props: { children: JSX.Element }) {
  let [feedStore, setFeedStore] = makePersisted(
    createStore<FeedDataEnhanced[]>([]),
    {
      name: "feed-sources",
    },
  );

  onMount(() => {
    if (feedStore.length > 0) {
      // TODO: check for new entries
    }
  });

  return (
    <FeedContext.Provider value={[feedStore, setFeedStore]}>
      {props.children}
    </FeedContext.Provider>
  );
}

export function useFeedStore() {
  return useContext(FeedContext);
}
