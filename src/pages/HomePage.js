import React from 'react';
import API from '../api';
import CategoryComponent from "../components/CategoryComponent";
import {connect} from "react-redux";
import {setDeliveryCost} from "../actions";

class ConnectedHomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories : [],
            isLoad : false
        }
    }

    componentDidMount() {
        API.get('config')
            .then(res => {
                this.props.setDeliveryCost(res.data.delivery_cost ?? 0);
            }).catch(error => {
               console.error(error);
            });
        API.get('categories')
            .then(res => {
                this.setState({
                    categories : res.data.data ?? [],
                    isLoad : true
                });
            }).catch(error => {
                console.error(error);
            });
    }

    render() {
        let k = 0;
        const categories = this.state.categories.map( item =>
            <CategoryComponent key={k++} category={item} isShowProducts={true}/>
        );
        return (
            <>
                <div className="col-12 text-center">
                    <h1 className="text-uppercase h3 mb-4">Our menu</h1>
                </div>
                <div className="col-12">
                    {categories}
                </div>
            </>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        setDeliveryCost: deliveryCost => dispatch(setDeliveryCost(deliveryCost)),
    };
}

const HomePage = connect(null,
    mapDispatchToProps)(ConnectedHomePage);


export default HomePage;