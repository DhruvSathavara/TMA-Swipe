import React from 'react';
import SwipableMemesComponent from '../MemeComponent';

const AllMemes = ({ memes }) => {

    return (
        <>
            <SwipableMemesComponent memes={memes} />
        </>
    );
};

export default AllMemes;