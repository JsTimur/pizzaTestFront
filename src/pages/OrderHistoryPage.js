import React from 'react';
import API from '../api';
import ProductLineViewComponent from "../components/Product/ProductLineViewComponent";
import {summOfProductArrayPrices} from "../reducers/initHelpers";

class OrderHistoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            items: [],
            isLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        API.post('orderHistory', { email : this.state.email })
            .then((res) => {
                if (res.data.result) {
                    for (let i in res.data.items) {
                        res.data.items[i].summary = summOfProductArrayPrices(JSON.parse(res.data.items[i].items));
                    }
                    this.setState({
                        items : res.data.items,
                        isLoaded : true,
                    })
                } else {
                    this.setState({
                        isLoaded : true,
                    })
                    // problem while loading
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const items = (this.state.isLoaded && this.state.items.length > 0) ? this.state.items.map(item =>
            <div className="card item mb-2" key={item.id}>
                <div className="card-body">

                        <div className="d-flex justify-content-between">
                            <p className="text-secondary">{new Date(item.created_at).toDateString()}</p>
                            <p className="text-secondary">Status: {item.is_finished ? 'Finished' : 'In progress'}</p>
                        </div>
                        <div className="products-box">
                            <div  className="product-line-view-item d-flex justify-content-between">
                                <div className="product-line-view-item__name">
                                    <p className="m-0 text-secondary">
                                       Name
                                    </p>
                                </div>
                                <div className="product-line-view-item__count text-center">
                                    <p className="m-0 text-secondary">
                                        Count
                                    </p>
                                </div>
                                <div className="product-line-view-item__price-box text-center">
                                   <p className="m-0 text-secondary">
                                       Price
                                   </p>
                                </div>
                            </div>
                            {
                                JSON.parse(item.items).map(product =>
                                    <ProductLineViewComponent key={product.id} product={product}/>
                                )
                            }
                            <div  className="border-top product-line-view-item d-flex justify-content-between">
                                <div className="product-line-view-item__name">

                                </div>
                                <div className="product-line-view-item__count text-center">
                                    <p className="m-0 text-secondary">
                                        Summary:
                                    </p>
                                </div>
                                <div className="product-line-view-item__price-box text-center">
                                        {item.summary.map((price,index) =>
                                         <p className="m-0 text-secondary" key={index}>
                                             {price[0]}
                                             {price[1]}
                                         </p>
                                        )}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        ) : null;
        return (
            <div className="col-md-12">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input required={true} className="form-control" type="text" name="email"
                                       onChange={this.handleChange} value={this.state.email}/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-outline-primary" type="submit">Check</button>
                            </div>
                        </form>
                        <div className="order-history">
                            {this.state.isLoaded && !items &&
                                <p>No orders found.</p>
                            }
                            {this.state.isLoaded &&
                             items
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default OrderHistoryPage;