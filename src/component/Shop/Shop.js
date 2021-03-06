import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData);
    const frist10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(frist10);

    const [cart, setCart] = useState([]);

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        // console.log(savedCart);
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        // console.log("hello", product);
        // const newCart = [...cart, product]
        // setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key, count)

        const toBeAddedkey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedkey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            
           <div className="product-container">
                {/* <h3>{products.length}</h3> */}
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true} 
                        handleAddProduct = {handleAddProduct}
                        product={pd}>  
                        </Product>)
                }
           </div>
           <div className="cart-container">
               <Cart cart={cart}></Cart>
               <Link to="/review">
                    <button className="main-button">Order Review</button>
                </Link>
           </div>
        </div>
    );
};

export default Shop;