import React, {useEffect, useState, useRef} from 'react';
import axiosClient from "../../axios-client.js";
import {BounceLoader} from "react-spinners";
import {Toast} from 'primereact/toast'
import 'primeicons/primeicons.css';
import MailboxTable from "../../components/mailbox/mailboxTable.jsx";
import {Button} from "primereact/button";

const Mailboxes = () => {
    const [mailboxes, setMailboxes] = useState([]);
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);
    const [googleLoginUrl, setGoogleLoginUrl] = useState("");

    useEffect(() => {
        setLoading(true);
        getMailboxes();
        addMailbox();

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

        setLoading(false)
    }, [])

    const getMailboxes = () => {
        axiosClient.get('/mailboxes')
            .then(response => {
                setMailboxes(response.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const addMailbox = () => {
        axiosClient.get('/google/login')
            .then(response => {
                setGoogleLoginUrl(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
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
                    <Toast ref={toast} />
                    <div className="card mb-3 flex justify-content-between align-items-center">
                        <h1>Mailboxes</h1>
                        <Button icon="pi pi-plus" loading={loading} label="Add Mailbox" onClick={() => {window.location.href = googleLoginUrl}} />
                    </div>
                    <MailboxTable mailboxes={mailboxes} loading={loading} toast={toast}/>
                </div>
            )}
        </div>
    );
};

export default Mailboxes;
