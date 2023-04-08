import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveCartItem = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };
    return (
        <div className='shop-container order-cart'>
            <div className="review-container">
                {
                    savedCart.map(product => <ReviewItem
                        key={product.id}
                        product={product}
                        handleRemoveCartItem={handleRemoveCartItem}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={savedCart} handleClearCart={handleClearCart}>
                    <Link className="link-btn review-btn" to='/checkout'>Proceed Checkout
                        <span><FontAwesomeIcon icon={faCreditCard} /></span>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Order;