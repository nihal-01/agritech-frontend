const ListViewLoading = () => {
    return (
        <div className='listViewLoading'>
            {Array.from({ length: 12 }).map((_, index) => {
                return (
                    <div className='listViewLoading__item' key={index}>
                        <div className='listViewLoading__item__img'></div>
                        <div className='listViewLoading__item__content'>
                            <div className='listViewLoading__item__content__name'></div>
                            <div className='listViewLoading__item__content__stars'></div>
                            <div className='listViewLoading__item__content__price'></div>
                            <div className='listViewLoading__item__content__desc1'></div>
                            <div className='listViewLoading__item__content__desc2'></div>
                            <div className='listViewLoading__item__content__btn'></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListViewLoading;
