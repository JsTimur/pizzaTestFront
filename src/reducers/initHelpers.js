import {loadBasket} from "../localStorage";

export function basketItemsCount() {
    const basketArray = loadBasket();
    return basketArray.map(item => item.count)
        .reduce((prev, curr) => prev + curr, 0);
}

export function basketItemsPrices() {
    const basketArray = loadBasket();
    return summOfProductArrayPrices(basketArray);
}

export function summOfProductArrayPrices(products) {
    if (products.length > 0) {
        let result = [];
        products[0].price.forEach((item) => {
            result.push([ 0, item.sign]);
        });
        products.forEach( (item, index) => {
            item.price.forEach((price, priceIndex) => {
                result[priceIndex][0] = round(result[priceIndex][0] + (item.count * price.value), 2);
            });
        });
        return result;
    } else {
        return [];
    }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}