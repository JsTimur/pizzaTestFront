import React from 'react';
import {Link} from "react-router-dom";
import BasketHeaderComponent from "./BasketHeaderComponent";

function HeaderComponent() {
    return <header className="header">
        <div className="container">
            <div className="row header__content justify-content-center">
                <div className="col-md-6">
                    <div className="header__logotype-block    ">
                        <p className="text-uppercase h4 m-0">
                            <Link className="text-dark" to="/">pizzatest</Link>
                        </p>

                        <p className="m-0 mx-3 ">
                            <Link className="text-secondary" to="order-history">Order history</Link>
                        </p>
                    </div>
                </div>
                <div className="col-md-6 text-md-right">
                    <BasketHeaderComponent/>
                </div>
            </div>
        </div>
    </header>;
}

export default HeaderComponent;