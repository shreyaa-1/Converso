import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";

import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {

    const [emailDetails, setemailDetails] = useState({
        email: "",
    });
    const [otpd, setotpd] = useState("");
    const [otpDetails, setotpDetails] = useState(
    );
    const navigate = useNavigate();

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setemailDetails({
            ...emailDetails,
            [name]: value,
        });
    };
    const inputChange2 = (e) => {
        const { name, value } = e.target;
        return setotpDetails({
            ...otpDetails,
            [name]: value,
        });
    };

    const formSubmit = async (e) => {
        try {
            e.preventDefault();
            const { email } = emailDetails;
            if (!email) {
                return toast.error("Input field should not be empty");
            }

            const { data } = await toast.promise(
                axios.post("/user/sendotp", {
                    email
                })
            );
            setotpd(data.otp);
            console.log(otpd);


            localStorage.setItem("token", data.token);
            return navigate("/chats");
        } catch (error) {
            return error;
        }
    };

    const formSubmit2 = async (e) => {
        try {
            e.preventDefault();
            const { userotp } = otpDetails;
            const { data } = await toast.promise(
                axios.post("/user/register", {
                    otpd, userotp
                })

            );
            
            // if (data.otp) {
            //     return navigate("/register");
            // }

            // else {
            //     return navigate("/");
            // }
            localStorage.setItem("token", data.token);
            return navigate("/chats");
        } catch (error) {
            return error;
        }
    };

    return (
        <section className="register-section flex-center">
            <div className="register-container flex-center">
                <h2 className="form-heading">OTP authentication</h2>
                <form onSubmit={formSubmit} className="register-form">
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={emailDetails.email}
                        onChange={inputChange}
                    /> <label htmlFor="name"> Email</label>
                    <button type="submit" className="btn form-btn">
                        SEND OTP
                    </button>
                </form>
                <form onSubmit={formSubmit2} className="register-form">
                    <input type="otp"
                        name="otp"
                        className="form-input"
                        placeholder="Enter the otp"
                        value={otpDetails}
                        onChange={inputChange}
                    /> <label htmlFor="name2"> OTP</label>

                    <button type="submit" className="btn form-btn">
                        VERIFY
                    </button>

                </form>        {/* <p className= "already-user"> */}
                {/* Not a user?{" "} */}
                <NavLink className="login-link" to={"/register"}>
                    Register
                </NavLink>

                {/* </p> */}
            </div>
        </section>
    );
}

export default Login;
