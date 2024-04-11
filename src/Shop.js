import React, { useState, useEffect } from "react";
import items from "./products.json";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

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
            <div class="container">
                <div class="row row-cols-4">
                    {listItems}
                </div>
            </div>
        </div>
    )
}

export default Shop;