import { makePersisted } from "@solid-primitives/storage";
import { Component, JSX, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import type { FeedData } from "@extractus/feed-extractor";

const FeedContext = createContext<[FeedData[], SetStoreFunction<FeedData[]>]>([
  [],
  () => [],
]);

export const FeedProvider: Component<{ children: JSX.Element }> = (props) => {
  const [feedStore, setFeedStore] = makePersisted(createStore<FeedData[]>([]), {
    name: "feed-sources",
  });

  return (
    <FeedContext.Provider value={[feedStore, setFeedStore]}>
      {props.children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => {
  return useContext(FeedContext);
};
