import MailboxTable from "../../components/mailbox/mailboxTable.jsx";
import axiosClient from "../../services/axios-client.js";
import React, {useEffect, useState} from 'react';
import {BounceLoader} from "react-spinners";
import {Button} from "primereact/button";
import 'primeicons/primeicons.css';
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";

const Mailboxes = () => {
    const [mailboxes, setMailboxes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [googleLoginUrl, setGoogleLoginUrl] = useState("");
    const { showToast } = useStateContext();

    useEffect(() => {
        setLoading(true);
        getMailboxes();
        addMailbox();
        checkQueryParams();
    }, [])

    const checkQueryParams = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.size > 0) {
                const status = urlParams.get('status');
                const message = urlParams.get('message');

                const email = urlParams.get('email');
                showToast(status, message, email);

                const url = new URL(window.location.href);
                url.search = ''; // Очищаємо всі параметри
                window.history.replaceState(null, '', url.toString());
            }
        } catch (error) {
            handleAxiosError(error, showToast);
        }
    }

    const getMailboxes = () => {
        axiosClient.get('/mailboxes')
            .then(response => {
                setMailboxes(response.data)
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const addMailbox = () => {
        axiosClient.get('/google/login')
            .then(response => {
                setGoogleLoginUrl(response.data);
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const googleUrlRedirect = () => {
        window.location.href = googleLoginUrl;
    }

    return (
        <div>
            {loading ? (
                <BounceLoader color="#5B08A7" loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/>
            ) : (
                <div>
                    <div className="card mb-3 flex justify-content-between align-items-center">
                        <h1>Mailboxes</h1>
                        <Button icon="pi pi-plus" loading={loading} label="Add Mailbox" onClick={googleUrlRedirect}/>
                    </div>
                    <MailboxTable mailboxes={mailboxes} loading={loading}/>
                </div>
            )}
        </div>
    );
};

export default Mailboxes;
