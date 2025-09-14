import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import registerLottieData from '../../assets/lottie/register.json'
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../../shared/SocialLogin';

const Register = () => {

    const { createUser } = useContext(AuthContext);
      const navigate = useNavigate();

    const handleRegister = e => {
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
    
        toast.success("✅ Valid credentials! Creating account...");
    
        createUser(email, password)
            .then(result => {
                toast.success("🎉 Registration successful!");
                console.log(result.user);
                navigate('/'); 
            })
            .catch(error => {
                toast.error(`❌ ${error.message}`);
            });
    };
    


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={registerLottieData}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="fieldset-label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </form>
                      <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;