import React from 'react';
import PriceCalculate from './../../utils/PriceCalculate';
import _ from 'lodash';
const List = ({ products }) => {
    console.log(products)
    const ProductList = (products) => {
        if (!_.isEmpty(products)) {
            return products.map((item, idx) =>
                <div key={idx} className="col-lg-3">
                    <div className="card">
                        <div className="img-box">
                            <img className="card-img-top img-responsive pro-list-image" src={item.main_images} alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title title-length"> {item.name}</h5>
                            <p className="card-text"> {item.brand}</p>
                            <p className="card-text">{PriceCalculate(item)}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
    const ListHeading = (products) => {
        if (!_.isEmpty(products)) {
            return (
                <h3 className="mb-0-5">{products[0].subcategory.name}</h3>
            )
        }
    }
    return (
        <div>
            <div className="col-lg-12">
                <div className="row">
                    {ListHeading(products)}
                </div>
            </div>
            <div className="col-lg-12">
                <div className="row">
                    {ProductList(products)}
                </div>
            </div>
        </div>
    )
}
export default List;