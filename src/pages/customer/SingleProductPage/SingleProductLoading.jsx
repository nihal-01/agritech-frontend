const SingleProductLoading = () => {
    return (
        <div className='singleProductLoading'>
            <div className='singleProductLoading__images'>
                <div className='singleProductLoading__images__thumbnail'></div>
                <div className='singleProductLoading__images__lists'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className='singleProductLoading__content'>
                <div className='singleProductLoading__content__stock'></div>
                <div className='singleProductLoading__content__title'></div>
                <div className='singleProductLoading__content__star'></div>
                <div className='singleProductLoading__content__price'></div>
                <div className='singleProductLoading__content__description'>
                    <div></div>
                    <div></div>
                </div>
                <hr />
                <div className='singleProductLoading__content__addToCart'>
                    <span></span>
                    <span></span>
                </div>
                <hr />
                <div className='singleProductLoading__content__category'></div>
            </div>
        </div>
    );
};

export default SingleProductLoading;
