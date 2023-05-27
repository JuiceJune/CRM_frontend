import React, { useRef, useState} from 'react';
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {BounceLoader} from "react-spinners";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const {setUser, setToken} = useStateContext()

    const onSubmit = (event) => {
        event.preventDefault()
        setLoading(true);
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null);
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
                setLoading(false);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422) {
                    if(response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        });
                    }
                }
                setLoading(false);
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            {loading ? (
                <BounceLoader
                    color={"#5B08A7"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">
                            Login
                        </h1>
                        {errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                        }
                        <input ref={emailRef} type="email" placeholder="Email"/>
                        <input ref={passwordRef} type="password" placeholder="Password"/>
                        <button className="btn btn-block">Login</button>

                        {/*<p className="message">*/}
                        {/*    Not Registered? <Link to="/signup">Create an account</Link>*/}
                        {/*</p>*/}

                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
