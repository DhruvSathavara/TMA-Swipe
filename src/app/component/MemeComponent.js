'use client';

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useSpring, animated } from '@react-spring/web';

const SwipableMemesComponent = ({ memes }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matchMessage, setMatchMessage] = useState('');
    const [props, api] = useSpring(() => ({ x: 0, opacity: 1 }));

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const handleSwipe = (direction) => {
        if (direction === 'right') {
            setMatchMessage('Match!!');
            setTimeout(() => {
                setMatchMessage('');
                setCurrentIndex((prevIndex) => (prevIndex + 1) % memes.length);
                api.start({ x: 0, opacity: 1 });
            }, 1000); // Display the match message for 1 second
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % memes.length);
            api.start({ x: 0, opacity: 1 });
        }
        api.start({ x: direction === 'right' ? 500 : -500, opacity: 0 });
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        flexDirection: 'column',
    };

    const cardStyle = {
        width: '90%',
        maxWidth: '400px',
        height: '90%',
        maxHeight: '600px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'absolute',
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    };

    const matchMessageStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '2rem',
        color: 'green',
        backgroundColor: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    if (!memes || memes.length === 0) {
        return <p>No memes found!</p>;
    }

    return (
        <div style={containerStyle} {...handlers}>
            {matchMessage && <div style={matchMessageStyle}>{matchMessage}</div>}
            <animated.div style={{ ...cardStyle, ...props }}>
                <img src={memes[currentIndex]} alt={`Meme ${currentIndex}`} style={imageStyle} />
            </animated.div>
        </div>
    );
};

export default SwipableMemesComponent;