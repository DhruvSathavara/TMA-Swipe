'use client';
import React, { useState, useRef } from "react";

const SwipableMemesComponent = ({ memes }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef();

    const handleTouchStart = (e) => {
        containerRef.current.startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        const touchX = e.touches[0].clientX;
        const moveX = touchX - containerRef.current.startX;
        containerRef.current.style.transform = `translateX(${moveX}px)`;
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        const moveX = endX - containerRef.current.startX;

        if (moveX > 100) {
            // Swipe Right
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (moveX < -100) {
            // Swipe Left
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, memes.length - 1));
        }

        containerRef.current.style.transform = `translateX(0px)`;
    };

    return (
        <div className="swipe-container">
            {memes.map((meme, index) => (
                <div
                    key={index}
                    className={`swipe-card-container ${index === currentIndex ? "active" : ""}`}
                    ref={index === currentIndex ? containerRef : null}
                    onTouchStart={index === currentIndex ? handleTouchStart : null}
                    onTouchMove={index === currentIndex ? handleTouchMove : null}
                    onTouchEnd={index === currentIndex ? handleTouchEnd : null}
                >
                    <div
                        className="swipe-card"
                        style={{ backgroundImage: `url(${meme})` }}
                    />
                </div>
            ))}
        </div>
    );
};

export default SwipableMemesComponent;