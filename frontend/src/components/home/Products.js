import React, { useEffect } from "react";
import OwlItems from './OwlItems';
import { getProductList } from './../../actions/index';
import { connect } from 'react-redux';
const Products = (props) => {
    const { getProductList, productList } = props;
    useEffect(() => {
        getProductList()
    }, []);
    const Lists = productList.map((item, idx) =>
        <div className="row" key={idx}>
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="mb-0-5">{item.name}</h3>
                    </div>
                </div>
                <div className="row mt-10">
                    <div className="col-lg-12">
                        <OwlItems products={item.product} key={idx} />
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className="viewed">
            {Lists}
        </div>
    )
}
function mapStateToProps(state) {
    return {
        productList: state.productList,
    }
}

export default connect(mapStateToProps, { getProductList })(Products);