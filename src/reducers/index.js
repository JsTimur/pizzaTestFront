import {basketItemsCount, basketItemsPrices} from "./initHelpers";
const initialState = {
    fullPrices: basketItemsPrices(),
    countProducts: basketItemsCount(),
    deliveryCost: 0,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_PRODUCT_COUNT":
            return Object.assign({}, state, {
                countProducts: action.payload
            });
        case "SET_DELIVERY_COST":
            return Object.assign({}, state, {
                deliveryCost: action.payload
            });
        case "SET_FULL_PRICE":
            return Object.assign({}, state, {
                fullPrices: action.payload
            });
        default:
            return state;
    }
}

export default rootReducer;