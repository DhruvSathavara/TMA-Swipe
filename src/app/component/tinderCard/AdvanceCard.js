'use client';

import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';

function Advanced({ memes }) {
    const [currentIndex, setCurrentIndex] = useState(memes.length - 1);
    const [swipeDirection, setSwipeDirection] = useState(null);
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
        setSwipeDirection(direction);
        setTimeout(() => {
            const newIndex = index - 1;
            updateCurrentIndex(newIndex);
            setSwipeDirection(null);
        }, 300); // Display duration in milliseconds
    };

    const outOfFrame = (idx) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    };

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < memes.length) {
            setSwipeDirection(dir); // Set swipe direction for label
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
                    currentIndex === index && (
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
                            <div className={`card ${swipeDirection ? 'swipe-overlay' : ''}`}
                                style={{ backgroundImage: swipeDirection ? 'none' : `url(${meme})` }}
                            >
                                {swipeDirection && (
                                    <div className="swipe-label">
                                        {swipeDirection === 'left' ? 'Not Fun 🙄' : 'Fun 🤣'}
                                    </div>
                                )}
                            </div>
                        </TinderCard>
                    )
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