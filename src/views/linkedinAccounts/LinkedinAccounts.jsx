import React, {useEffect, useState, useRef} from 'react';
import axiosClient from "../../axios-client.js";
import {BounceLoader} from "react-spinners";
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css';
import LinkedinTable from "../../components/linkedin/linkedinTable.jsx";

const LinkedinAccounts = () => {
    const [linkedinAccounts, setLinkedinAccounts] = useState([]);
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);

    useEffect(() => {
        setLoading(true)
        getLinkedinAccounts();
    }, [])

    const getLinkedinAccounts = () => {
        axiosClient.get('/linkedin-accounts')
            .then(response => {
                setLinkedinAccounts(response.data)
                setLoading(false)
            })
            .catch(() => {
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
                        <h1>Linkedin Accounts</h1>
                    </div>
                    <LinkedinTable linkedinAccounts={linkedinAccounts} loading={loading} toast={toast}/>
                </div>
            )}
        </div>
    );
};

export default LinkedinAccounts;
