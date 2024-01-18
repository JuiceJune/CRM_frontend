import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import axiosClient from "../../services/axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {ArrowLeftCircle} from "react-bootstrap-icons";
import {InputText} from "/primereact/inputText";
import {Password} from "primereact/password";
import {Button} from "primereact/button";

const UserForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        position: '',
    })

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/users/create`)
            .then((response) => {
                console.log(response)
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }, [])

    const onSubmit = (event) => {
        // event.preventDefault()
        console.log(user)
        // if(user.id) {
        //     axiosClient.put(`/users/${user.id}`, user)
        //         .then((response) => {
        //             console.log(response)
        //             setNotification("User was successfully updated")
        //             navigate('/users')
        //         })
        //         .catch(err => {
        //             const response = err.response;
        //             if(response && response.status === 422) {
        //                 setErrors(response.data.errors);
        //             }
        //         })
        // } else {
        //     axiosClient.post(`/users`, user)
        //         .then(() => {
        //             setNotification("User was successfully created")
        //             navigate('/users')
        //         })
        //         .catch(err => {
        //             const response = err.response;
        //             if(response && response.status === 422) {
        //                 setErrors(response.data.errors);
        //             }
        //         })
        // }
    }

    return (
        <div>
            <div style={{padding: '0 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {user.id && <h1>Update User: {user.name}</h1>}
                {!user.id && <h1>New User</h1>}
                <Link to={'/users'}><ArrowLeftCircle color="#5b08a7" size={28} style={{cursor: 'pointer'}}/></Link>
            </div>
            <div className='card animated faidInDown'>
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                {!loading &&
                    <div>
                        <div className="flex flex-column gap-2 mb-4">
                            <label htmlFor="text">Name</label>
                            <InputText id="name" onChange={event => setUser({...user, name: event.target.value})}/>
                            <small>
                                Enter your name.
                            </small>
                        </div>
                        <div className="flex flex-column gap-2 mb-4">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" onChange={event => setUser({...user, email: event.target.value})}/>
                            <small>
                                Enter your email to reset your password.
                            </small>
                        </div>
                        <div className="flex flex-column gap-2 mb-3">
                            <label htmlFor="password">Password</label>
                            <Password toggleMask  id="password" onChange={event => setUser({...user, password: event.target.value})}/>
                        </div>
                        <div className="flex gap-2 mb-3 mt-4">
                            <Button icon="pi pi-check" loading={loading} label="Save" onClick={onSubmit}/>
                            <Button loading={loading} label="Cancel" severity="danger" onClick={() => navigate(-1)} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default UserForm;
