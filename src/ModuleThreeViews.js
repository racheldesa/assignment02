import React, { useState, useEffect } from "react";
import Shop from './Shop'

function ThreeViews() {
    const [firstView, setFirstView] = useState(true);
    const [secondView, setSecondView] = useState(false);
    const [thirdView, setThirdView] = useState(false);

    function View1() {
        return (
            <div>
                <h1>Shop View</h1>
                <Shop />
            </div>
        )
    };
    function View2() {
        return (
            <div>
                <h1>Cart View</h1>
            </div>
        )
    };
    function View3() {
        return (
            <div>
                <h1>Confirmation View</h1>
            </div>
        )
    };

    const setView1 = () => {
        if (firstView === false) {
            setFirstView(true);
        }
        setSecondView(false);
        setThirdView(false);
    }

    const setView2 = () => {
        if (secondView === false) setSecondView(true);
        setFirstView(false);
        setThirdView(false);
    }

    const setView3 = () => {
        if (thirdView === false) setThirdView(true);
        setFirstView(false);
        setSecondView(false);
    }

    return (
        <div>
            <span class="border border-white">
            <div class="btn-group">
                <button type="button" class="btn btn-primary" onClick={setView1}>Shop</button>
                <button type="button" class="btn btn-primary" onClick={setView2}>Cart</button>
                <button type="button" class="btn btn-primary" onClick={setView3}>Checkout</button>
            </div>
            </span>
            {firstView && <View1 />}
            {secondView && <View2 />}
            {thirdView && <View3 />}
        </div>
    );
}

export default ThreeViews;