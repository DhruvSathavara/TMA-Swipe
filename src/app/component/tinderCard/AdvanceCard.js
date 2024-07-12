'use client';

import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'

function Advanced({ memes }) {

    console.log(memes);
    const [currentIndex, setCurrentIndex] = useState(memes.length - 1);
    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(memes.length)
                .fill(0)
                .map(() => React.createRef()),
        [memes.length]
    );

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canSwipe = currentIndex >= 0;

    const swiped = (direction, index) => {
        const newIndex = (index - 1 + memes.length) % memes.length;
        updateCurrentIndex(newIndex);
    };

    const outOfFrame = (idx) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    };

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < memes.length) {
            await childRefs[currentIndex].current.swipe(dir); // This triggers the swipe
        }
    };

    return (
        <div className="swipe-container">
            <link
                href="https://fonts.googleapis.com/css?family=Damion&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
                rel="stylesheet"
            />
            <div className="cardContainer">
                {memes.map((meme, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className="swipe"
                        key={meme + index}
                        onSwipe={(dir) => swiped(dir, index)}
                        onCardLeftScreen={() => outOfFrame(index)}
                        flickOnSwipe={true}
                        preventSwipe={['up', 'down']}
                        swipeRequirementType="position"
                        swipeThreshold={150}
                    >
                        <div
                            style={{ backgroundImage: `url(${meme})` }}
                            className="card"
                        />
                    </TinderCard>

                ))}
            </div>
            <div className="buttons">
                <button
                    style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
                    onClick={() => swipe('left')}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                    style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
                    onClick={() => swipe('right')}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
        </div>
    );
}

export default Advanced;
