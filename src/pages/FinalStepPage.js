import React from 'react';
import API from '../api';
import {loadBasket} from "../localStorage";
import {changeProductsCount, setFullPrice} from "../actions";
import {connect} from "react-redux";
import {basketItemsCount, basketItemsPrices} from "../reducers/initHelpers";

class ConnectedFinalStepPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            address : '',
            items : loadBasket(),
            isFinished : false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        API.post('/order', this.state)
            .then(res => {
                if (res.data.result) {
                    this.setState({isFinished : true}, () => {
                        localStorage.clear();
                        this.props.changeProductsCount(basketItemsCount());
                        this.props.setFullPrice(basketItemsPrices());
                    });
                } else {
                    // problem
                }
            })
            .catch(error => {
                console.error(error);
            });
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value});
    }

    render() {
        return (
            <>
                <div className="col-12 text-center">
                    <h1 className="text-uppercase h3 mb-4">Final STEP</h1>
                </div>
                <div className="col-12">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form hidden={this.state.isFinished} onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Address(input your full Address):</label>
                                    <input required={true} value={this.state.address}  onChange={this.handleChange} className="form-control" name="address" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input required={true} value={this.state.email} onChange={this.handleChange} className="form-control"  name="email" type="text"/>
                                </div>
                                <div className="form-group text-center">
                                    <button className="btn mt-2  btn-success" type="submit">Make order</button>
                                </div>
                            </form>
                            <p hidden={!this.state.isFinished}>
                                Order successfully added, Thank you!
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeProductsCount: products => dispatch(changeProductsCount(products)),
        setFullPrice: fullPrice => dispatch(setFullPrice(fullPrice)),
    };
}
const FinalStepPage = connect(null,
    mapDispatchToProps)(ConnectedFinalStepPage);

export default FinalStepPage;