import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';

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
        let newCart = [...cart, product]
        setCart(newCart);
    }

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
            <div className="order-container">
                <h1>The Cart: {cart.length}</h1>
            </div>
        </div>
    );
};

export default Shop;