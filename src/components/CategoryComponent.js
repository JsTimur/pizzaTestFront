import React from 'react';
import ProductComponent from "./Product/ProductComponent";
import {loadBasket} from "../localStorage";

class CategoryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category : props.category,
            isShowProducts : props.isShowProducts,
            products : [],
            basket : loadBasket()
        }
    }

    componentDidMount() {
        if (this.state.isShowProducts) {
            let k = 0;
            const products = this.state.category.products.map( item =>
                <ProductComponent
                    key={k++}
                    product={item}
                    basketItem={this.state.basket.find((e) => e.id === item.id)}
                />
            );
            this.setState({
                products : products
            })
        }
    }

    render() {
        return (
        <div className="category">
            <p className="h4 my-3">{this.state.category.name}</p>
            <div className="row">
                {this.state.products}
            </div>
        </div>
        );
    }

}

export default CategoryComponent;