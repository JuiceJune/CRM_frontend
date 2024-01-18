import React, {useEffect, useState, useRef} from 'react';
import axiosClient from "../../services/axios-client.js";
import {BounceLoader} from "react-spinners";
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css';
import CampaignTable from "../../components/campaign/campaignTable.jsx";
import {Button} from "primereact/button";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getCampaigns();
    }, [])

    const getCampaigns = () => {
        axiosClient.get('/campaigns')
            .then(response => {
                console.log(response);
                setCampaigns(response.data)
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
                        <h1>Campaigns</h1>
                        <Button icon="pi pi-plus" loading={loading} label="Add Campaign" onClick={() => {navigate("/campaigns/create");}}/>
                    </div>
                    <CampaignTable campaigns={campaigns} loading={loading} toast={toast}/>
                </div>
            )}
        </div>
    );
};

export default Campaigns;
