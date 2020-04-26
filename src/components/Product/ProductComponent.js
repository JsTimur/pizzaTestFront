import React from 'react';
import {loadBasket, saveBasket} from "../../localStorage";
import {connect} from "react-redux";
import {changeProductsCount, setFullPrice} from "../../actions";
import {basketItemsCount, basketItemsPrices} from "../../reducers/initHelpers";

class ConnectedProductComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: props.product ?? [],
            count: this.props.basketItem ? this.props.basketItem.count : 0,
            hideIfZero: props.hideIfZero ?? false,
            isHidden: false,
        };

    }

    setCount(value) {
        this.setState({
            count: value,
        }, () => {
            if (this.state.hideIfZero) {
                if (value === 0) {
                    this.setState({isHidden: true});
                }
            }
            this.addToBasket();
        });
    };

    addToBasket() {
        /**
         * Add new item into the basket array if not exist or update count if element already in the basket
         */
        const product = {
            id: this.state.product.id,
            count: this.state.count,
            price: this.state.product.price,
            name: this.state.product.name
        };
        let basketArray = loadBasket();
        let pushNewElement = false;
        if (basketArray.length === 0) {
            pushNewElement = true;
        } else {
            const index = basketArray.findIndex((e) => e.id === product.id);
            if (index === -1) {
                pushNewElement = true;
            } else {
                if (product.count === 0) {
                    basketArray.splice(index, 1);
                } else {
                    basketArray[index] = product;
                }
            }
        }
        if (pushNewElement) {
            basketArray.push(product);
        }
        saveBasket(basketArray);
        this.props.changeProductsCount(basketItemsCount());
        this.props.setFullPrice(basketItemsPrices());
    }


    render() {
        let currentCount = this.state.count;
        let priceK = 0;
        const prices = this.state.product.price.map(price =>
            <div key={priceK++}>
                <span><b>{price.value}</b></span>
                <span><b>{price.sign}</b></span>
            </div>
        );
        return (
            <div className="product col-md-3 mb-5" hidden={this.state.isHidden}>
                <div className="product__image-box">
                    <img src={this.state.product.img} alt=""/>
                </div>
                <p className="product__name">{this.state.product.name}</p>
                <div className="product__description-box">
                    <p className="product__description text-secondary">{this.state.product.description}</p>

                </div>
                <div className="product__bottom-line-box">
                    <div className="product__prices">{prices}</div>
                    <div className="basket-control-box">
                        <div className="basket-control-box__product-count">
                            <button
                                onClick={() => this.setCount(currentCount - 1)}
                                className="basket-control-box__subtract"
                                disabled={currentCount === 0}
                            >-
                            </button>
                            <div className="basket-control-box__count">
                                <p>{currentCount}</p>
                            </div>
                            <button
                                onClick={() => this.setCount(currentCount + 1)}
                                className="basket-control-box__add "
                                disabled={currentCount === 100}
                            >+
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeProductsCount: products => dispatch(changeProductsCount(products)),
        setFullPrice: fullPrice => dispatch(setFullPrice(fullPrice)),
    };
}

const ProductComponent = connect(null,
    mapDispatchToProps)(ConnectedProductComponent);

export default ProductComponent;