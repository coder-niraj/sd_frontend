import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoaderSkeleton = ({ height, width, baseColor, heighLightColor }) => {
    return (
        <Skeleton height={height} width={width} baseColor={baseColor} highlightColor={heighLightColor} />
    );
};
export default LoaderSkeleton