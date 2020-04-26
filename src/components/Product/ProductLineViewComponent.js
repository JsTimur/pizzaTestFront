import React from 'react';

function ProductLineViewComponent(props) {
    let priceBoxK = 0;
    return (
        <div key={props.product.id} className="border-top product-line-view-item d-flex justify-content-between">
            <div className="product-line-view-item__name">
                <p className="m-0">
                    {props.product.name}
                </p>
            </div>
            <div className="product-line-view-item__count text-center">
                <p className="m-0">
                    {props.product.count}
                </p>
            </div>
            <div className="product-line-view-item__price-box text-center">
                {props.product.price.map(price =>
                    <div className="price-box__price-item" key={priceBoxK++}>
                        {price.value}
                        {price.sign}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductLineViewComponent;


