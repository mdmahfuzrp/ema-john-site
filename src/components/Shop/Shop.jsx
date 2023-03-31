import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    // State
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    // Data Loaded From Other Place
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);
    
    const handleAddToCart = (product) =>{
        let newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    };

    useEffect(()=>{
        const getData = getShoppingCart();
        console.log(getData);
    }, [])

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;