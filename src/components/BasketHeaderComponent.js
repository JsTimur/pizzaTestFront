import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class ConnectedBasketHeaderComponent extends React.Component {

    render() {
        return (
            <div className="header-basket">
                <div className="header-basket__info-box">
                    { this.props.countProducts > 0 &&
                        <div>
                            <span className="text-secondary">Products: </span>
                            <b>{this.props.countProducts}</b>
                        </div>
                    }
                    <div>
                        { this.props.fullPrices.length > 0 && this.props.fullPrices[0][0] > 0 &&
                            <div className="header-basket__price-box">
                                <div className="d-inline-block align-self-center">
                                    <span className="text-secondary">Price: </span>
                                </div>
                                <div className="d-inline-block">
                                    {this.props.fullPrices.map((item, index) =>
                                        <span className="d-block" key={index}><b>{item[0]} {item[1]}</b></span>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                    <Link to="/basket" className="mr-0">
                        <div className="btn btn-outline-success">Go to Basket</div>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fullPrices: state.fullPrices,
        countProducts: state.countProducts,
        deliveryCost: state.deliveryCost,
    };
};

const BasketHeaderComponent = connect(mapStateToProps)(ConnectedBasketHeaderComponent);

export default BasketHeaderComponent;