'use client';

import React, { useState, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const SwipableMemesComponent = ({ memes }) => {
    const [currentIndex, setCurrentIndex] = useState(memes.length - 1);
    const [currentMemes, setCurrentMemes] = useState(memes);
    const childRefs = useRef(memes.map(() => React.createRef()));

    useEffect(() => {
        if (currentIndex < 0) {
            // Reset the currentIndex to the end of the new list of memes
            setCurrentIndex(currentMemes.length - 1);
        }
    }, [currentIndex, currentMemes]);

    const swiped = (direction, index) => {
        console.log(`You swiped ${direction} on ${index}`);
        if (index < currentMemes.length - memes.length) {
            setCurrentIndex(memes.length - 1);
            setCurrentMemes((prevMemes) => [...prevMemes, ...memes]);
        } else {
            setCurrentIndex(index - 1);
        }
    };

    const outOfFrame = (index) => {
        console.log(`${index} left the screen`);
    };

    const swipe = (dir) => {
        if (currentIndex >= 0 && currentIndex < currentMemes.length) {
            childRefs.current[currentIndex].current.swipe(dir); // Swipe the card
        }
    };

    return (
        <>
            <div>
                <div className="memecard_container">
                    {currentMemes.map((meme, index) => (
                        <TinderCard
                            ref={childRefs.current[index]}
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