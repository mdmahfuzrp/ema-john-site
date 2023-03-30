import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const {img, name, price, seller, ratings} = props.product;
    const handleAddToCart = props.handleAddToCart;
    return (
        <div className='product'>
            <div className="top-img">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h2 className='product-name'>{name}</h2>
                <h3 className='product-price'>Price: ${price}</h3>
                <p className='product-seller'>Manufacturer: {seller}</p>
                <p className='product-rating'>Rating: {ratings} Star</p>
            </div>
            <button onClick={()=> handleAddToCart(props.product)} className="add-to-cart">
                Add to Cart
                <span className='cart-icon'><FontAwesomeIcon icon={faShoppingCart}/></span>
                </button>
        </div>
    );
};

export default Product;