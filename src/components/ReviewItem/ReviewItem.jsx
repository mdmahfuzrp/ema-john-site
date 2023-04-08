import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ReviewItem = ({product, handleRemoveCartItem}) => {
    const {id, name, img, price, quantity} = product;
    return (
        <div className='cart-product'>
            <img src={img} alt="" />
            <div className="cart-product-right">
                <div className="cart-product-info">
                    <h1>{name}</h1>
                    <p>Price: <span>${price}</span></p>
                    <p>Order Quantity: <span>{quantity}</span></p>
                </div>
                <Link onClick={()=>handleRemoveCartItem(id)} className="delete-btn"><FontAwesomeIcon className='delete-icon' icon={faTrashCan}/></Link>
            </div>
        </div>
    );
};

export default ReviewItem;