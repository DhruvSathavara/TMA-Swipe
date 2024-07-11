'use client';

import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const SwipableMemesComponent = ({ memes }) => {
    const [currentIndex, setCurrentIndex] = useState(memes.length - 1);
    const childRefs = useRef([]);

    const swiped = (direction, index) => {
        console.log(`You swiped ${direction} on ${index}`);
        if (index === 0) {
            setCurrentIndex(memes.length - 1);
        } else {
            setCurrentIndex(index - 1);
        }
    };

    const outOfFrame = (index) => {
        console.log(`${index} left the screen`);
        if (currentIndex < 0) {
            setCurrentIndex(memes.length - 1);
        }
    };

    const swipe = (dir) => {
        if (currentIndex >= 0 && currentIndex < memes.length) {
            childRefs.current[currentIndex].swipe(dir); // Swipe the card
        }
    };

    return (
        <>
            <div>
                <div className="memecard_container">
                    {memes.map((meme, index) => (
                        <TinderCard
                            ref={(el) => (childRefs.current[index] = el)}
                            className="swipe"
                            key={index}
                            onSwipe={(dir) => swiped(dir, index)}
                            onCardLeftScreen={() => outOfFrame(index)}
                            preventSwipe={["up", "down"]}
                        >
                            <div
                                className="swipe-card"
                                style={{ backgroundImage: `url(${meme})` }}
                            />
                        </TinderCard>
                    ))}
                </div>
            </div>
            <div className="swipeButtons">
                <IconButton className="swipeButtons_Close" onClick={() => swipe('left')}>
                    <CloseIcon fontSize="large" />
                </IconButton>

                <IconButton className="swipeButtons_Favorite" onClick={() => swipe('right')}>
                    <FavoriteIcon fontSize="large" />
                </IconButton>
            </div>
        </>
    );
};

export default SwipableMemesComponent;