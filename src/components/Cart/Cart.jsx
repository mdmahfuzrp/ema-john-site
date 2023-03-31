import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Cart = ({cart}) => {
    let total = 0;
    let totalShipping = 0;
    for(const product of cart){
        total = total + product.price;
        totalShipping = totalShipping + product.shipping;
    }
    const tax = total*7/100;
    const grandTotal = total + totalShipping + tax;
    return (
        <div className='cart'>
            <h1 className='cart-title'>Order Summary</h1>
            <div className="cart-info">
                <p>Selected Items: {cart.length}</p>
                <p>Total Price: ${total}</p>
                <p>Shipping Charge: ${totalShipping}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
            </div>
            <div className="cart-btn-container">
                <button className="cart-btn">Clear Cart
                    <span><FontAwesomeIcon icon={faTrashCan} /></span>
                </button>
                <button className="review-btn">Review Order
                    <span><FontAwesomeIcon icon={faArrowRight} /></span>
                </button>
            </div>
        </div>
    );
};

export default Cart;