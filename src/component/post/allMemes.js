import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";

const AllMemes = () => {
    let memes;

    const client = new NeynarAPIClient("C97766C5-7700-47BC-B388-34CFC2D909C1");
    const getMemes = async () => {
        try {
            const memesChannelUrl =
                "chain://eip155:1/erc721:0xfd8427165df67df6d7fd689ae67c8ebf56d9ca61";

            const feed = await client.fetchFeed(FeedType.Filter, {
                filterType: FilterType.ParentUrl,
                parentUrl: memesChannelUrl,
            });

            console.log('feed is here======', feed.casts[2].embeds);

            // const memes = feed.casts.map(cast => {
            //     return cast.embeds
            //         .filter(embed => embed.type === 'image')
            //         .map(embed => embed.url);
            // }).flat();

            const memes = feed.casts
                .flatMap(cast => cast.embeds)
                .filter(embed => embed.url)
                .map(embed => embed.url);

            console.log('memes:', memes);

            return (
                <div>
                    {memes.length > 0 ? (
                        memes.map((meme, index) => (
                            <img key={index} src={meme} alt={`Meme ${index}`} />
                        ))
                    ) : (
                        <p>No memes found!</p>
                    )}
                </div>
            );
        } catch (error) {
            console.log(error);
            return (
                <p>Prolly data not fetched yet!</p>
            );
        }
    };

    return (
        <>
            <p>all memes page</p>
            {getMemes()}
            {/* <button onClick={getMemes}>Get Data</button> */}
            {/* <p>{memes ? memes : "prolly not fetched"}</p> */}
        </>
    );
};

export default AllMemes;