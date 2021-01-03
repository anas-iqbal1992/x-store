import React, { useEffect } from "react";
import { getCategories } from '../../actions/index';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
const InnerHeader = (props) => {
    const { getCategories, categories } = props;
    useEffect(() => {
        getCategories()
    }, []);
    const subListItems = (subcategories) => {
        return subcategories.map((item,idx) =>
            <li key={idx}><NavLink to={`/products/${item._id}`}>{item.name}</NavLink></li>
        );
    }
    const listItems = categories.map((category) =>
        <li key={category._id}>
            <a href="#">{category.name}<i className="ti-angle-down"></i></a>
            <ul className="dropdown">
                {subListItems(category.subcategories)}
            </ul>
        </li>
    );

    return (
        <div className="header-inner">
            <div className="container">
                <div className="cat-nav-head">
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <div className="menu-area">
                                <nav className="navbar navbar-expand-lg">
                                    <div className="navbar-collapse">
                                        <div className="nav-inner">
                                            <ul className="nav main-menu menu navbar-nav">
                                                <li className="active"><a href="#">Home</a></li>
                                                {listItems}
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        categories: state.categories,
        subCategories: state.subCategories
    }
}

export default connect(mapStateToProps, { getCategories })(InnerHeader)