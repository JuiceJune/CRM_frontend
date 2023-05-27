import React, {useEffect, useState, useRef} from 'react';
import {Button} from "primereact/button";
import {BounceLoader} from "react-spinners";
import {Toast} from 'primereact/toast'
import 'primeicons/primeicons.css';
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import UserInfo from "../../components/user/userInfo.jsx";
import UserForm from "../../components/user/userForm.jsx";
import axiosClient from "../../axios-client.js";


const Profile = () => {
    const {user, setUser} = useStateContext()
    const [loading, setLoading] = useState(true)
    const [showUser, setShowUser] = useState(false)
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setShowUser(false);
        if (user && user.id) {
            getUser()
            setLoading(false);
            setShowUser(true);
        }
    }, [user])

    const getUser = () => {
        axiosClient.get(`/users/${user.id}`)
            .then(response => {
                setUser(response.data.data)
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                if (e.response.status === 403 || e.response.status === 404) {
                    // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Not Found', life: 3000 });
                    navigate('/not-found');
                }
            })
    }

    if (loading) {
        return <BounceLoader color="#5B08A7" loading={loading} size={100} aria-label="Loading Spinner"
                             data-testid="loader"/>;
    }

    return (
        <div>
            {showUser && (
                <div>
                    <Toast ref={toast}/>
                    <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round mb-3">
                        <div className="flex justify-content-between align-items-center ">
                            <div className="flex align-items-center">
                                <Button icon="pi pi-arrow-left" onClick={() => navigate(-1)} className="mr-2" rounded
                                        outlined
                                        aria-label="Filter"/>
                                <h1>My Profile</h1>
                            </div>
                        </div>
                    </div>
                    <div className="grid mt-1">
                        <div className="col-12 lg:col-4">
                            <UserInfo user={user} toast={toast}/>
                        </div>
                        <div className="col-12 lg:col-8">
                            <UserForm user={user} toast={toast}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
