import { useState } from 'react';

const SingleProductThumbnail = ({ img }) => {
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    return (
        <>
            {!thumbnailLoaded && (
                <div className='singleProductThumbnail__loading'></div>
            )}
            <img
                src={img}
                alt=''
                onLoad={() => {
                    setThumbnailLoaded(true);
                }}
                className={
                    !thumbnailLoaded
                        ? 'singleProductThumbnail singleProductThumbnail__hidden'
                        : 'singleProductThumbnail'
                }
            />
        </>
    );
};

export default SingleProductThumbnail;
