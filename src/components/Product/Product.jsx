import React from 'react';
import './Product.css'

const Product = (props) => {
    const {img, name, price, seller, ratings} = props.product;
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
            <button className="add-to-cart">Add to Cart</button>
        </div>
    );
};

export default Product;