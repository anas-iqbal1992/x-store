import React from "react";
import _ from 'lodash';
const PriceCalculate = ({ offer, price }) => {
    const getPrice = ( offer, price) => {
        if (_.isEmpty(offer.upto)) {
            return (<span className="pro_price"><span><i className="fa fa-inr"></i>{price}</span></span>);
        } else {
            return (
                <span className="pro_price"><span><i className="fa fa-inr"></i>{Math.round(price * offer.upto / 100)}</span> <del><i className="fa fa-inr"></i>{price}</del></span>
            );
        }
    }
    return (
        <>
            {getPrice(offer, price)}
        </>
    );
}
export default PriceCalculate;