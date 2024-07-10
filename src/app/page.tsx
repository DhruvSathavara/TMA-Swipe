// src/app/page.tsx
import AllMemes from './component/post/allMemes';
import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";

async function fetchMemes() {
  const client = new NeynarAPIClient("C97766C5-7700-47BC-B388-34CFC2D909C1");

  try {
    const memesChannelUrl =
      "chain://eip155:1/erc721:0xfd8427165df67df6d7fd689ae67c8ebf56d9ca61";

    const feed = await client.fetchFeed(FeedType.Filter, {
      filterType: FilterType.ParentUrl,
      parentUrl: memesChannelUrl,
    });

    const memes = feed.casts
      .flatMap(cast => cast.embeds)
      .filter(embed => embed.url)
      .map(embed => embed.url);

    return memes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const memes = await fetchMemes();
  return (
    <main>
      <AllMemes memes={memes} />
    </main>
  );
}