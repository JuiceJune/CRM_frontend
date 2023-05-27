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


const Mailbox = () => {
    const {id} = useParams()
    const [mailbox, setMailbox] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showMailbox, setShowMailbox] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getMailbox();
    }, [])

    const getMailbox = () => {
        axiosClient.get(`/mailboxes/${id}`)
            .then(response => {
                setMailbox(response.data.data)
                setLoading(false)
                setShowMailbox(true);
            })
            .catch((e) => {
                setLoading(false)
                if(e.response.status === 403 || e.response.status === 404) {
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
            {showMailbox && (
                <div>
                    <Toast ref={toast}/>
                    <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round mb-3">
                        <div className="flex justify-content-between align-items-center ">
                            <div className="flex align-items-center">
                                <Button icon="pi pi-arrow-left" onClick={() => navigate(-1)} className="mr-2" rounded outlined
                                        aria-label="Filter"/>
                                <h1>{mailbox.email}</h1>
                            </div>
                        </div>
                    </div>
                    <MailboxHeaderCards/>
                    <div className="grid mt-1">
                        <div className="col-12 lg:col-5">
                            <MailboxInfoCard mailbox={mailbox} toast={toast}/>
                        </div>
                        <div className="col-12 lg:col-7">
                            <MailboxChart/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mailbox;
