import { FeedData, extract } from "@extractus/feed-extractor";

export async function extractFeed(url: string) {
  "use server";

  let result: FeedData;

  try {
    result = await extract(url, {
      getExtraFeedFields: (feedData: any) => {
        return {
          image: feedData?.image?.url || "",
        };
      },
    });
  } catch (error) {
    return {
      message: "Failed to extract feed",
      error: error,
    };
  }

  return result;
}
