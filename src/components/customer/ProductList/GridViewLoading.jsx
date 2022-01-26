const GridViewLoading = () => {
    return (
        <div className='gridViewLoading'>
            {Array.from({ length: 12 }).map((_, index) => {
                return (
                    <div key={index} className='gridViewLoading__item'>
                        <div className='gridViewLoading__item__img'></div>
                        <div className='gridViewLoading__item__name'></div>
                        <div className='gridViewLoading__item__price'></div>
                    </div>
                );
            })}
        </div>
    );
};

export default GridViewLoading;
