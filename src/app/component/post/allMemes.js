// import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";
// import SwipableMemesComponent from "../MemeComponent";

// export async function getServerSideProps() {
//     const client = new NeynarAPIClient("C97766C5-7700-47BC-B388-34CFC2D909C1");

//     try {
//         const memesChannelUrl =
//             "chain://eip155:1/erc721:0xfd8427165df67df6d7fd689ae67c8ebf56d9ca61";

//         const feed = await client.fetchFeed(FeedType.Filter, {
//             filterType: FilterType.ParentUrl,
//             parentUrl: memesChannelUrl,
//         });

//         console.log('here is feed', feed);

//         const memes = feed.casts
//             .flatMap(cast => cast.embeds)
//             .filter(embed => embed.url)
//             .map(embed => embed.url);

//         return { props: { memes } };
//     } catch (error) {
//         console.log(error);
//         return { props: { memes: [] } };
//     }
// }

// const AllMemes = ({ memes }) => {
//     return (
//         <>
//             <p>All Memes Page</p>
//             <SwipableMemesComponent memes={memes} />
//         </>
//     );
// };

// export default AllMemes;

// components/AllMemes.js
// src/components/AllMemes.js
import React from 'react';
// import SwipableMemesComponent from './SwipableMemesComponent';
import SwipableMemesComponent from '../MemeComponent';

const AllMemes = ({ memes }) => {

    console.log('memes in all memes compo', memes);
    return (
        <>
            <p>All Memes Page</p>
            <SwipableMemesComponent memes={memes} />
        </>
    );
};

export default AllMemes;