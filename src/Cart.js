import React, { useState, useEffect } from "react";
import items from "./products.json";
import Shop from "./Shop";

const Cart = () => {

    return (
        <div>
            <h2>My Cart</h2>
            <div>{Shop.cartItems}</div>
        </div>
    )
}

export default Cart;