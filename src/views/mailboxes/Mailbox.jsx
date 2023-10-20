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
import MailboxTable from "../../components/mailbox/mailboxTable.jsx";


const Mailbox = () => {
    const {id} = useParams()
    const [mailbox, setMailbox] = useState([]);
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        getMailbox();
        setLoading(false);
    }, [id]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.size > 0) {
            const status = urlParams.get('status');
            const message = urlParams.get('message');
            const email = urlParams.get('email');

            toast.current.show({ severity: status, summary: message, detail: email, life: 3000 });

            const url = new URL(window.location.href);
            url.search = ''; // Очищаємо всі параметри
            window.history.replaceState(null, '', url.toString());
        }
    }, []);


    const getMailbox = () => {
        setLoading(true);
        axiosClient.get(`/mailboxes/${id}`)
            .then(response => {
                setMailbox(response.data.data)
            })
            .catch((e) => {
                if(e.response.status === 403 || e.response.status === 404) {
                    // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Not Found', life: 3000 });
                    navigate('/not-found');
                }
            })
            .finally(() => {
                setLoading(false); // Встановлюємо loading в false незалежно від результату запиту.
            });
    }

    if (loading) {
        return <BounceLoader color="#5B08A7" loading={loading} size={100} aria-label="Loading Spinner"
                             data-testid="loader"/>;
    }

    return (
        <div>
            {loading ? (
                <BounceLoader
                    color={"#5B08A7"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
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
