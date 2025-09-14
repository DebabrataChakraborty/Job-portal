import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';

const SocialLogin = () => {
    const { singInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        singInWithGoogle()
            .then(result => {
                console.log(result.user);
                 navigate('/'); 
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (

        <div className='m-4'>
            <div className="divider divider-primary">OR</div>
            <button onClick={handleGoogleSignIn} 
            className="btn btn-info">Google</button>
        </div>
    );
};

export default SocialLogin;