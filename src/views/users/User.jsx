import React, {useEffect, useState, useRef} from 'react';
import axiosClient from "../../axios-client.js";
import {Link, useParams} from "react-router-dom";
import {Button} from "primereact/button";
import {BounceLoader} from "react-spinners";
import {Toast} from 'primereact/toast'
import 'primeicons/primeicons.css';
import MailboxHeaderCards from "../../components/mailbox/mailboxHeaderCards";
import MailboxChart from "../../components/mailbox/mailboxChart.jsx";
import MailboxInfoCard from "../../components/mailbox/mailboxInfoCard.jsx";
import {useNavigate} from "react-router-dom";
import UserInfo from "../../components/user/userInfo.jsx";
import UserProjectsTable from "../../components/user/userProjectsTable.jsx";


const User = () => {
    const {id} = useParams()
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showUser, setShowUser] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getUser();
    }, [])

    const getUser = () => {
        axiosClient.get(`/users/${id}`)
            .then(response => {
                setUser(response.data.data)
                setLoading(false)
                setShowUser(true);
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
                                <h1>{user.name}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="grid mt-1">
                        <div className="col-12 lg:col-4">
                            <UserInfo user={user} toast={toast}/>
                        </div>
                        <div className="col-12 lg:col-8">
                            <UserProjectsTable projects={user.projects} loading={loading} toast={toast}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
