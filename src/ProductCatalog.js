import React, { useState, useEffect } from "react";
import Cart from './Cart';
import {Products} from './Products';
import {Categories} from './Categories';
import items from "./products.json";

function ProductCatalog() {
    const [view, setView] = useState(0); // 0 --> Shop, 1 --> Cart, 2 --> Checkout
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    // Shop function for Browse
    const Shop = () => {
        const listItems = items.map((el) => (
            <div class="col mb-4">
                <div class="card h-100">
                    <div key={el.id}>
                        <img class="card-img-top" src={el.image} />
                        <div class="card-body flex-column">
                            <h2 class="card-title">{el.title}</h2>
                            <div class="card-text"> 
                                <p>{el.category} </p>
                                <p>${el.price}</p> 
                            </div>
                            <div class="btn-group border rounded">
                                <span class="border">
                                <button type="button" class="btn btn-default" onClick={() => removeFromCart(el)}> - </button>{" "}
                                </span>
                                <span class="border">
                                <button type="button" class="btn btn-default" variant="light" onClick={() => addToCart(el)}> + </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    
        const cartItems = cart.map((el) => (
            <div key={el.id}>
                <img class="img-fluid" src={el.image} width={150} />
                {el.title}
                ${el.price}
                {el.rating.count}
            </div>
        ));
    
        const addToCart = (el) => {
            let inCart = false;
            for (let item in cart) {
                if (item.id == el.id) {
                    item.rating.count += 1;
                    inCart = true;
                    break;
                }
            }
            if (!inCart) {
                let returnEl = el;
                returnEl.rating.count = 0;
                setCart([...cart, returnEl]);
            }
        };
    
        const removeFromCart = (el) => {
            for (let item in cart) {
                if (item.id == el.id) {
                    if (item.rating.count < 2) {
                        let hardCopy = [...cart];
                        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
                        setCart(hardCopy);
                    } else {
                        item.rating.count -= 1;
                        break;
                    }
                }
            }
        };
    
        return (
            <div>
                <div class="container">
                    <div class="row row-cols-4">
                        {listItems}
                    </div>
                </div>
            </div>
        )
    }

    function goToCart() {
        setView(1);
    }
    function confirm() {
        setView(2);
    }
    function backToBrowse() {
        setView(0);
    }

    function ShopView() {
        return (
            <div>
                <p>Browse Function</p>
                <div className="py-10">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={handleChange} />
                    <Shop />
                </div>
                <div>{Shop.cartItems}</div>
                <button type="button" class="btn btn-primary" onClick={goToCart}>View Cart</button>
            </div>
        );
    }

    function CartView () {
        return (
            <div>
                <p>Cart Function</p>
                <Cart />
                <div>{Shop.cartItems}</div>
                <button type="button" class="btn btn-primary" onClick={confirm}>Checkout</button>
            </div>
        );

    }

    function CheckoutView () {
        return (
            <div>
                <p>Confirmation Function</p>
                <button type="button" class="btn btn-primary" onClick={backToBrowse}>Back to Browse</button>
            </div>
        );
    }

    const handleChange = (e) => {
        setQuery(e.target.value);
        const results = Products.filter(eachProduct => {
            if (e.target.value === "") return ProductsCategory;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setProductsCategory(results);
    }

    return (
        <div>
            <span class="border border-white">
            <div class="btn-group">
                <button type="button" class="btn btn-primary" onClick={backToBrowse}>Shop</button>
                <button type="button" class="btn btn-primary" onClick={goToCart}>Cart</button>
                <button type="button" class="btn btn-primary" onClick={confirm}>Checkout</button>
            </div>
            </span>
            {view == 0 && <ShopView />}
            {view == 1 && <CartView />}
            {view == 2 && <CheckoutView />}
        </div>
    );
}

export default ProductCatalog;