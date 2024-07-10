import React from 'react';
import SwipableMemesComponent from '../MemeComponent';

const AllMemes = ({ memes }) => {

    console.log('memes in all memes compo', memes);
    return (
        <>
            <SwipableMemesComponent memes={memes} />
        </>
    );
};

export default AllMemes;