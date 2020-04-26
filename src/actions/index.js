export function changeProductsCount(payload) {
    return { type: "CHANGE_PRODUCT_COUNT", payload }
}

export function setDeliveryCost(payload) {
    return { type: "SET_DELIVERY_COST", payload }
}

export function setFullPrice(payload) {
    return { type: "SET_FULL_PRICE", payload }
}