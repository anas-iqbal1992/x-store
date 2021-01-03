import React from 'react';
import PriceCalculate from './../../utils/PriceCalculate';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlItems = ({ products }) => {

    const ProductList = (products) => {
        return products.map((item, idx) =>
            <div key={idx} className="card">
                <div className="img-box">
                    <img className="card-img-top img-responsive pro-list-image" src={item.main_images} alt="Card image cap" />
                </div>
                <div className="card-body">
                    <h5 className="card-title title-length"> {item.name}</h5>
                    <p className="card-text"> {item.brand}</p>
                    <p className="card-text">{PriceCalculate(item)}</p>
                </div>
            </div>
        );
    }
    return (
        <OwlCarousel
            className="owl-theme"
            loop
            margin={1}
            nav
            items={5}
        >
            {ProductList(products)}
        </OwlCarousel>
    )
}
export default OwlItems;