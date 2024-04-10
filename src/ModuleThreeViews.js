import React, { useState, useEffect } from "react";
import Shop from './Shop';
import Cart from './Cart';
import {Products} from './Products';
import {Categories} from './Categories';

function ThreeViews() {
    const [view, setView] = useState(0); // 0 --> Shop, 1 --> Cart, 2 --> Confirmation
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);

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

export default ThreeViews;