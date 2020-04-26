import React from 'react';
import './main.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from "./components/HeaderComponent";
import BasketPage from "./pages/BasketPage";
import HomePage from "./pages/HomePage";
import FooterComponent from "./components/FooterComponent";
import FinalStepPage from "./pages/FinalStepPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <Router>
        <HeaderComponent/>
        <div className="container content">
            <div className="row">
                <Switch>
                    <Route path="/basket">
                        <BasketPage/>
                    </Route>
                    <Route path="/final-step">
                        <FinalStepPage/>
                    </Route>
                    <Route path="/order-history">
                        <OrderHistoryPage/>
                    </Route>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </div>
        </div>
        <FooterComponent/>
    </Router>
  );
}

export default App;
