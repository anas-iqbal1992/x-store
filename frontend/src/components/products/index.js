import React, { useEffect } from 'react';
import { getProducts } from './../../actions/index';
import { connect } from 'react-redux';
import List from './List';
const Products = (props) => {
    const { getProducts, productList } = props;
    console.log('productList=>', productList.docs)
    useEffect(() => {
        getProducts(props.match.params.id);
    }, [props.match.params.id]);
    return (
        <div className='viewed'>
            <List products={productList.docs} />
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        productList: state.products
    }
}
export default connect(mapStateToProps, { getProducts })(Products);