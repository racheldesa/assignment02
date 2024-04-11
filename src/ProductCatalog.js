import React, { useState, useEffect } from "react";
import {Products} from './Products';
import {Categories} from './Categories';
import { useForm } from "react-hook-form";

function ProductCatalog() {
    const [view, setView] = useState(0); // 0 --> Shop, 1 --> Cart, 2 --> Checkout
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [dataF, setDataF] = useState({});
    const {register, handleSubmit, formState: {errors}} = useForm();

    // Shop function for Browse
    const Shop = () => {
        const listItems = ProductsCategory.map((el) => (
            <div class="col mb-4">
                <div class="card h-100 bg-secondary-subtle shadow">
                    <div key={el.id}>
                        <img class="card-img-top p-4" src={el.image} />
                        <div class="card-body flex-column">
                            <h2 class="card-title">{el.title}</h2>
                            <div class="card-text"> 
                                <p class="text-primary">{el.category} </p>
                                <p class="text-info-emphasis">${el.price}</p> 
                            </div>
                            <div class="btn-group border rounded">
                                <span class="border">
                                <button type="button" class="btn btn-default bg-light-subtle shadow border-dark-subtle" onClick={() => removeFromCart(el)}> - </button>
                                </span>
                                <span class="border">
                                <button type="button" class="btn btn-default bg-light-subtle shadow border-dark-subtle" variant="light" onClick={() => addToCart(el)}> + </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    
        const addToCart = (el) => {
            let inCart = false;
            let newCart = cart.map((nextItem => {
                if (nextItem.id === el.id) {
                    inCart = true;
                    setCartTotal(cartTotal + el.price);
                    return {
                        ...nextItem, count : nextItem.count + 1,
                    }
                } else {
                    return nextItem;
                }
            }))
            if (!inCart) {
                let returnEl = el;
                returnEl.count = 1;
                setCartTotal(cartTotal + returnEl.price)
                setCart([...cart, returnEl]);
            } else {
                setCart(newCart);
            }
        };
    
        const removeFromCart = (el) => {
            let inCart = false;
            let removeObject = false;
            let newCart = cart.map((nextItem => {
                if (nextItem.id === el.id) {
                    inCart = true;
                    if (nextItem.count < 2) {
                        removeObject = true;
                        return nextItem;
                    } else {
                        setCartTotal(cartTotal - nextItem.price);
                        return {
                            ...nextItem, count : nextItem.count - 1
                        }
                    }
                } else {
                    return nextItem;
                }
            }))
            if (inCart) {
                if (removeObject) {
                    let hardCopy = [...cart];
                    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
                    setCartTotal(cartTotal - el.price);
                    setCart(hardCopy);
                } else {
                    setCart(newCart);
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

    // Function for Cart View
    const Cart = () => {
        const cartItems = cart.map((el) => (
            <div class="row mb-4 bg-secondary-subtle p-2 border border-dark-subtle shadow">
                <div class="col">{el.title}</div>
                <div class="col">{el.description}</div>
                <div class="col">{el.count}</div>
                <div class="col">${el.price}</div>
                <div class="col"><img class="img-fluid" src={el.image} width={150} /></div>
            </div>
        ));
        return (
            cartItems
        )
    }
    // Function for Payment in Cart View
    function Payment () {
        const onSubmit = data => {
            console.log(data);
            setDataF(data);
            confirm();
        }
        return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
                    <div class="container mb-4">
                        <div class="row">
                            <div class="col">
                                <div  className="form-group">
                                    <input {...register("fullName", {required: true})} type="text" placeholder="Full Name" className="form-control border border-primary-subtle" />
                                    {errors.fullName && <p className="text-danger">Full Name is required.</p>}
                                </div>
                            </div>
                            <div class="col">
                                <div class="col" className="form-group">
                                    <input {...register("email", {required: true, pattern: /^\S+@\S+$/i})} placeholder="Email" className="form-control border border-primary-subtle" />
                                    {errors.email && <p className="text-danger">Email is required.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div className="form-group" class="mb-4">
                            <input {...register("creditCard", {required: true})} type="number" placeholder="Credit Card" className="form-control border border-primary-subtle" />
                            {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
                        </div>
                    </div>
                    <div class="container mb-4">
                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <input {...register("address", {required: true, pattern:"\d{5,5}(-\d{4,4})?"})} placeholder="Address" className="form-control border border-primary-subtle" />
                                    {errors.address && <p className="text-danger">Address is required.</p>}
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <input {...register("address2")} placeholder="Address 2" className="form-control border border-primary-subtle" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container mb-4">
                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <input {...register("city", {required: true})} placeholder="City" className="form-control border border-primary-subtle"/>
                                    {errors.city && <p className="text-danger">City is required.</p>}
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <input {...register("state", {required: true})} placeholder="State" className="form-control border border-primary-subtle"/>
                                    {errors.state && <p className="text-danger">State is required.</p>}
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <input {...register("zip", {required: true, pattern:"/^[0-9\b]+$/"})} type="number" placeholder="Zip"className="form-control border border-primary-subtle" />
                                    {errors.zip && <p className="text-danger">Zip is required.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Order</button>
                </form>
            </div>);
    }

    // Functions to swtich views
    function goToCart() {
        setView(1);
    }
    function confirm() {
        setView(2);
    }
    function backToBrowseFresh() {
        setCart([]);
        setCartTotal(0);
        setDataF({});
        setView(0);
    }

    function backToBrowse() {
        setView(0);
    }

    function ShopView() {
        return (
            <div>
                <span class="border border-white">
                    <div class="btn-group mb-4 shadow">
                        <button type="button" class="btn btn-primary border" onClick={backToBrowse}>Shop</button>
                        <button type="button" class="btn btn-primary border" onClick={goToCart}>Cart</button>
                    </div>
                </span>
                <div className="">
                    <h1 class="mb-3 fs-2 fw-bold ">Let's Shop!</h1>
                    <input class="form-control mr-sm-2 mb-4 shadow" type="search" placeholder="Search" aria-label="Search" value={query} onChange={handleSearch} />
                    <Shop />
                </div>
                <button type="button" class="btn btn-primary" onClick={goToCart}>View Cart</button>
            </div>
        );
    }

    function CartView () {
        return (
            <div class="mt-4">
                <div>
                    <span class="border border-white mb-4">
                        <div class="btn-group mb-4 shadow">
                            <button type="button" class="btn btn-primary border" onClick={backToBrowse}>Shop</button>
                            <button type="button" class="btn btn-primary border" onClick={goToCart}>Cart</button>
                        </div>
                    </span>
                </div>
                <button type="button" class="btn btn-primary" onClick={backToBrowse}>Return</button>
                <h2 class="fs-1 text-center mb-4 text-decoration-underline fw-semibold">My Cart</h2>
                <div class="container">
                    <div class="row mb-4">
                        <div class="col text-decoration-underline">Name</div>
                        <div class="col text-decoration-underline">Description</div>
                        <div class="col text-decoration-underline">Count</div>
                        <div class="col text-decoration-underline">Price</div>
                        <div class="col text-decoration-underline">Photo</div>
                    </div>
                    <Cart />
                    <div class="row mb-4 border border-secondary-subtle">
                        <div class="col"></div>
                        <div class="col"></div>
                        <div class="col fw-semibold">Total</div>
                        <div class="col fw-semibold">${cartTotal}</div>
                        <div class="col"></div>
                    </div>
                </div>
                <h1 class="fs-2 text-center text-decoration-underline fw-semibold">Payment Information</h1>
                <Payment />
            </div>
        );

    }

    const Confirmation = () => {
        const confirmedItems = cart.map((el) => (
            <div class="col mb-4">
                <div class="card border bg-secondary-subtle shadow-sm">
                    <h1 class="m-3 text-center">{el.title}</h1>
                    <img class="card-img-top p-4" src={el.image} />
                </div>
                
            </div>
        ));
        const maskCreditCard = ((creditCardIDInput) => {
            const creditCardLength = creditCardIDInput.length;
            const maskLength = creditCardLength-4;
            let creditCardID = creditCardIDInput;
             for (let i = 0; i < creditCardLength; i++) {
                if (i < maskLength) {
                    creditCardID = creditCardID.replace(creditCardIDInput[i], '*');
                }
            }
            return creditCardID;
        });
        return (
            <div class="p-3">
                <h1 class="mb-4 fw-bold fs-1">Order Confirmed!</h1>
                <div class="container">
                    <div class="row row-cols-3">
                        {confirmedItems}
                    </div>
                </div>
                <div class="fs-3 fw-semibold mb-2">Order total: {cartTotal}</div>
                <div class="">
                    <h1 class="fs-5">Order details: </h1>
                    <p>Name: {dataF.fullName}</p>
                    <p>Email: {dataF.email}</p>
                    <p>Ordered with Credit Card: {maskCreditCard(dataF.creditCard)}</p>
                    <p>Shipping to {dataF.address} {dataF.city}, {dataF.state} {dataF.zip}</p>
                </div>
            </div>
        )
    }
    function ConfirmationView () {
        return (
            <div>
                <Confirmation/>
                <button type="button" class="btn btn-primary mt-4" onClick={backToBrowseFresh}>Back to Browse</button>
            </div>
        );
    }

    const handleSearch = (e) => {
        setQuery(e.target.value);
        const results = Products.filter(eachProduct => {
        if (e.target.value === "") {
            return ProductsCategory;
        } else {
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        } 
        });
        setProductsCategory(results);
    }
    

    return (
        <div class="p-4 bg-body-tertiary">
            {view === 0 && <ShopView />}
            {view === 1 && <CartView />}
            {view === 2 && <ConfirmationView />}
        </div>
    );
}

export default ProductCatalog;