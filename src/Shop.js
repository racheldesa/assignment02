import React, { useState, useEffect } from "react";
import items from "./products.json";

const Shop = () => {

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const listItems = items.map((el) => (
        <div class="row border-top border-bottom" key={el.id}>
            <div class="row main align-items-center">
                <div class="col-2">
                <img class="img-fluid" src={el.image} />
                </div>
            <div class="col">
                <div class="row text-muted">{el.title}</div>
                <div class="row">{el.category}</div>
            </div>
            <div class="col">
                <button type="button" variant="light" onClick={() => removeFromCart(el)}> - </button>{" "}
                <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
            </div>
            <div class="col">
                ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
            </div>
            </div>
        </div>
    ));

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <img class="img-fluid" src={el.image} width={150} />
            {el.title}
            ${el.price}
        </div>
    ));

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    };

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    return (
        <div>
            <div>{listItems}</div>
            <div>Items in Cart: </div>
            <div>{cartItems}</div>
        </div>
    )
}

export default Shop;