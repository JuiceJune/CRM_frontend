import MailboxHeaderCards from "../../components/mailbox/mailboxHeaderCards";
import MailboxSignature from "../../components/mailbox/mailboxSignature.jsx";
import MailboxInfoCard from "../../components/mailbox/mailboxInfoCard.jsx";
import MailboxHeader from "../../components/mailbox/mailboxHeader.jsx";
import MailboxChart from "../../components/mailbox/mailboxChart.jsx";
import axiosClient from "../../services/axios-client.js";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BounceLoader} from "react-spinners";
import {useParams} from "react-router-dom";
import 'primeicons/primeicons.css';
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";

const Mailbox = () => {
    const { showToast } = useStateContext();
    const [loading, setLoading] = useState(false)
    const [mailbox, setMailbox] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        setLoading(true);
        checkQueryParams();
        getMailbox();
    }, [id]);

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

    const getMailbox = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(`/mailboxes/${id}`);
            console.log(response);
            setMailbox(response.data);
        } catch (error) {
            handleAxiosError(error, showToast);
        } finally {
            setLoading(false);
        }
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
                    <MailboxHeader mailbox={mailbox} navigate={navigate} setLoading={setLoading} id={id}/>
                    <MailboxHeaderCards/>
                    <MailboxSignature mailbox={mailbox} setMailbox={setMailbox} setLoading={setLoading} id={id}/>
                    <div className="grid mt-1">
                        <div className="col-12 lg:col-5">
                            <MailboxInfoCard mailbox={mailbox}/>
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
