'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';

function Advanced({ memes }) {
    const [currentIndex, setCurrentIndex] = useState(memes.length - 1);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const currentIndexRef = useRef(currentIndex);
    const [backgroundColor, setBackgroundColor] = useState('#EFEFEF');  // Default background color
    const imgRef = useRef(null);
    useEffect(() => {
        if (currentIndex < 0 && memes.length > 0) {
            setCurrentIndex(memes.length - 1);
        }
    }, [currentIndex, memes.length]);
    // const ColorThief = require('colorthief');

    const childRefs = useMemo(() => Array(memes.length).fill(0).map(() => React.createRef()), [memes.length]);

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
        }, 300); // Clear direction after the transition
    };

    const outOfFrame = (idx) => {
        if (childRefs[idx].current) {
            childRefs[idx].current.restoreCard();
        }
    };

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < memes.length) {
            setSwipeDirection(dir);
            await childRefs[currentIndex].current.swipe(dir);
        }
    };

    return (
        <div className="swipe-container">
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
                            swipeThreshold={250}
                        >
                            <div className={`card ${swipeDirection ? 'swipe-overlay' : ''}`}>
                                {swipeDirection ? (
                                    <div className="swipe-label">
                                        {swipeDirection === 'left' ? 'Not Fun 🙄' : 'Fun 😄'}
                                    </div>
                                ) : (
                                    <>
                                        {meme.endsWith('.mp4') || meme.includes('video') ? (
                                            <video className="media" src={meme} controls />
                                        ) : (
                                            <div className="media" style={{ backgroundImage: `url(${meme})` }} />
                                        )}
                                    </>
                                )}
                            </div>
                        </TinderCard>
                    )
                ))}

            </div>
            <div className="buttons">
                <button
                    style={{ backgroundColor: swipeDirection === 'left' ? '#ff4d4d' : '#c3c4d3' }}
                    onClick={() => swipe('left')}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                    style={{ backgroundColor: swipeDirection === 'right' ? '#4dff4d' : '#c3c4d3' }}
                    onClick={() => swipe('right')}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
        </div>
    );
}

export default Advanced;
