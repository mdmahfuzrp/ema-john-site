import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    // State
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [cart, setCart] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { totalProducts } = useLoaderData();
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];

    // Data Loaded From Other Place
    useEffect(() => {
        const url = `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(cartProducts => {
            const savedCart = [];
            for (const id in storedCart) {
                const addedProduct = cartProducts.find(product => product._id === id);
                if (addedProduct) {
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);
                }
            }
            setCart(savedCart);
        })


    }, [products]);

    const handleAddToCart = (product) => {
        let newCart = [];

        const exists = cart.find(pd => pd._id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product.id);
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        addToDb(product._id);
    };
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };

    const handleSetCurrentPage = (page) => {
        setCurrentPage(page);
    }

    const handleItemsPerPageChange = event =>{
        const pageNumber = event.target.value;
        setItemsPerPage(pageNumber);
        setCurrentPage(0);
    }

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >

                        <Link className="link-btn review-btn" to='/orders'>Review Orders
                            <span><FontAwesomeIcon icon={faArrowRight} /></span>
                        </Link>
                    </Cart>
                </div>
            </div>

            {/* Pagination */}
            <div className='pagination'>
                <p>Current Page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => handleSetCurrentPage(number)}
                    >
                        {number}
                    </button>)
                }
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </>
    );
};

export default Shop;