'use client';

import React, { useState, useEffect, useRef } from "react";
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

// Helper functions for swipe calculations
const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: 1000 });
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const SwipableMemesComponent = ({ memes }) => {

    console.log('memes in swipable compo', memes);

    const [gone] = useState(() => new Set()); // Set to keep track of swiped cards
    const [props, api] = useSprings(memes.length, i => ({ ...to(i), from: from() })); // Create springs for each card

    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2; // If you flick hard enough, trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
        if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, add index to gone set
        api.start(i => {
            if (index !== i) return; // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index);
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flies out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1; // Active cards lift up a bit
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } };
        });
        if (!down && gone.size === memes.length) setTimeout(() => gone.clear() || api.start(i => to(i)), 600); // When all cards are gone, reset the deck
    });

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
                    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                    <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${memes[i]})` }} className="swipe-card" />
                </animated.div>
            ))}
        </div>
    );
};

export default SwipableMemesComponent;