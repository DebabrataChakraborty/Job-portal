import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 👈 Import navigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginLottieData from '../../assets/lottie/login.json';
import Lottie from 'lottie-react';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../../shared/SocialLogin';

const SignIn = () => {
    const { signInUser } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate();
    console.log('in signIn page', location)
    const from = location.state || '/';


    const handleSignIn = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!emailRegex.test(email)) {
            toast.error("❌ Invalid email format. Please enter a valid email.");
            return;
        }

        if (!passwordRegex.test(password)) {
            if (password.length < 6) {
                toast.error("❌ Password must be at least 6 characters long.");
            } else if (!/[A-Z]/.test(password)) {
                toast.error("❌ Password must include at least one uppercase letter.");
            } else if (!/\d/.test(password)) {
                toast.error("❌ Password must include at least one number.");
            } else {
                toast.error("❌ Invalid password.");
            }
            return;
        }

        signInUser(email, password)
            .then(result => {
                console.log('sign in', result.user);
                toast.success("✅ Logged in successfully!");
                navigate(from);
            })
            .catch(error => {
                console.log(error);
                toast.error("❌ Login failed. Please try again.");
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={loginLottieData}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Login Now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" />
                            <label className="fieldset-label">Password</label>
                            <input type="password" name="password" className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </form>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
