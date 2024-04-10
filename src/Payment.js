import React, { useState } from "react";
import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();
const [dataF,setDataF] = useState({});
const [viewer,setViewer] = useState(0);

function Payment() {
    const onSubmit = data => {
        setDataF(data);
        setViewer(1);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input {...register("firstName", { required: true })} placeholder="First Name" className="form-control"/>
                    {errors.firstName && <p className="text-danger">First Name is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("lastName", { required: true })} placeholder="Last Name" className="form-control"/>
                    {errors.lastName && <p className="text-danger">Last Name is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("email", { required: true, pattern: /^\S+@\S+$/i  })} placeholder="Email" className="form-control"/>
                    {errors.email && <p className="text-danger">Email is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("creditCard", { required: true })} placeholder="Credit Card" className="form-control"/>
                    {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("address", { required: true })} placeholder="Address" className="form-control"/>
                    {errors.address && <p>Address is required.</p>}
                </div>
                <div className="form-group">
                <input {...register("address2")} placeholder="Address 2" className="form-control"/>
                </div>    
                <div className="form-group">
                    <input {...register("city", { required: true })} placeholder="City" className="form-control"/>
                    {errors.city && <p className="text-danger">City is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("state", { required: true })} placeholder="State" className="form-control"/>
                    {errors.state && <p className="text-danger">State is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("zip", { required: true })} placeholder="Zip" className="form-control"/>
                    {errors.zip && <p className="text-danger">Zip is required.</p>}
                </div>
                    

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}