import React, {useEffect, useState, useRef} from 'react';
import axiosClient from "../../services/axios-client.js";
import {Link, useParams} from "react-router-dom";
import {Button} from "primereact/button";
import {BounceLoader} from "react-spinners";
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css';
import MailboxChart from "../../components/mailbox/mailboxChart.jsx";
import { useNavigate } from "react-router-dom";
import LinkedinHeaderCards from "../../components/linkedin/linkedinHeaderCards.jsx";
import LinkedinInfoCard from "../../components/linkedin/linkedinInfoCard.jsx";


const Linkedin = () => {
    const {id} = useParams()
    const [linkedin, setLinkedin] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showLinkedin, setShowLinkedin] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getLinkedin();
    }, [])

    const getLinkedin = () => {
        axiosClient.get(`/linkedin-accounts/${id}`)
            .then(response => {
                setLinkedin(response.data.data)
                setLoading(false)
                setShowLinkedin(true)
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
            {showLinkedin && (
                <div>
                    <Toast ref={toast} />
                    <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round mb-3">
                        <div className="flex justify-content-between align-items-center ">
                            <div className="flex align-items-center">
                                <Button icon="pi pi-arrow-left" onClick={() => navigate(-1)} className="mr-2" rounded outlined
                                        aria-label="Filter" />
                                <h1>Linkedin</h1>
                            </div>
                        </div>
                    </div>
                    <LinkedinHeaderCards/>
                    <div className="grid mt-1">
                        <div className="col-12 lg:col-5">
                            <LinkedinInfoCard linkedin={linkedin} toast={toast}/>
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

export default Linkedin;
