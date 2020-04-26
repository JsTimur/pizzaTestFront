import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import API from "../api";
import {loadBasket} from "../localStorage";
import ProductComponent from "../components/Product/ProductComponent";
import {connect} from "react-redux";

class ConnectedBasketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoad: false,
            basket: loadBasket()
        };
    }

    componentDidMount() {
        API.get('products')
            .then(res => {
                let k = 0;

                // get id's from basket items
                let basketItemIds = [];
                this.state.basket.forEach(x => basketItemIds.push(x.id));

                // filter all products by basket items id
                const filteredProducts = res.data.data.filter((item) => basketItemIds.includes(item.id));
                const products = filteredProducts.map(item =>
                    <ProductComponent
                        hideIfZero={true}
                        key={k++}
                        product={item}
                        basketItem={this.state.basket.find((e) => e.id === item.id)}
                    />
                );
                this.setState({
                    products: products,
                    isLoad: true,
                });
            }).catch(error => {
            console.error(error);
        });
    }

    render() {
        if (this.state.isLoad) {
            return (
                <>
                <div className="col-12 text-center">
                    <h1 className="text-uppercase h3 mb-4">Basket page</h1>
                </div>

                    {this.props.countProducts > 0 ?
                        <div className="col-12">
                            <div className="row justify-content-center">
                                {this.state.products}
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-8 text-right">
                                    <Link to="/final-step">
                                        <button className="btn btn-outline-success">
                                            Final Step >
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="col-12">
                            <p className="text-center">First, add some product to basket.</p>
                        </div>
                    }

                </>
            );
        } else {
            return null;
        }
    }

}

const mapStateToProps = state => {
    return {
        countProducts: state.countProducts,
    };
};

const BasketPage = connect(mapStateToProps)(ConnectedBasketPage);

export default withRouter(BasketPage);