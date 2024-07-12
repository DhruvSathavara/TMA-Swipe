import AllMemes from './component/post/allMemes';
import Advanced from './component//tinderCard/AdvanceCard'
import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";
// import TinderCard from "./component/tinderCard/tinderCard";

// Assuming the actual structure of embeds based on your description
interface Embed {
  type: string;
  url?: string;
  image?: {
    url: string;
  };
  [key: string]: any; // To accommodate other possible properties
}

async function fetchMemes() {
  const client = new NeynarAPIClient("C97766C5-7700-47BC-B388-34CFC2D909C1");

  try {
    const memesChannelUrl =
      "chain://eip155:1/erc721:0xfd8427165df67df6d7fd689ae67c8ebf56d9ca61";

    const feed = await client.fetchFeed(FeedType.Filter, {
      filterType: FilterType.ParentUrl,
      parentUrl: memesChannelUrl,
    });

    // console.log('feed is here======', feed.casts[0].embeds);

    const memes = feed.casts
      .flatMap(cast => cast.embeds as Embed[])
      .filter(embed => embed.url || embed.image?.url)
      .map(embed => embed.url || embed.image?.url);

    return memes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const memes = await fetchMemes();
  // return (
  //   <main>
  //     <AllMemes memes={memes} />
  //   </main>
  // );

  return (
    <main>
      <Advanced memes={memes} />
    </main>
  );


  // return (
  //   <view style={{ flex: 1 }}>
  //     {memes && memes.map((meme, index) => {
  //       return <TinderCard meme={meme} />
  //     }).reverse()}
  //   </view>
  // )

}