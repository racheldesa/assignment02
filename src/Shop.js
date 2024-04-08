import React, { useState, useEffect } from "react";
import items from "./products.json";

const Shop = () => {

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const listItems = items.map((el) => (
        <div key={el.id}>
            <img class="img-fluid" src={el.image} width={150} /> <br/>

            {el.title} <br/>
            {el.category} <br/>
            {el.price} <br/>

            <div class="btn-group border rounded">
                <span class="border">
                <button type="button" class="btn btn-default" onClick={() => removeFromCart(el)}> - </button>{" "}
                </span>
                <span class="border">
                <button type="button" class="btn btn-default" variant="light" onClick={() => addToCart(el)}> + </button>
                </span>
            </div>
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

    return (
        <div>
            {listItems}
        </div>
    )
}

export default Shop;