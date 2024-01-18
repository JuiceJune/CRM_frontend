import React, {useEffect, useState} from 'react';
import axiosClient from "../../services/axios-client.js";
import {useParams} from "react-router-dom";
import {BounceLoader} from "react-spinners";
import {DataTable} from "primereact/datatable";
import 'primeicons/primeicons.css';
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {Column} from "primereact/column";
import {Button} from "primereact/button";


const CampaignQueueTable = () => {
    const {id} = useParams()
    const {showToast} = useStateContext();
    const [campaignQueue, setCampaignQueue] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getCampaignQueue();
    }, [])

    const getCampaignQueue = () => {
        axiosClient.get(`/campaigns/${id}/queue`)
            .then(response => {
                console.log(response);
                setCampaignQueue(response.data)
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
                navigate(-1);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const clearQueue = () => {
        axiosClient.get(`/campaigns/${id}/queue-clear`)
            .then(response => {
                setCampaignQueue(null);
                showToast('success', 'Queue cleared successfully', response.data);
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
                navigate(-1);
            })
            .finally(() => {
                setLoading(false)
            });
    }


    return (
        <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round mb-3">
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
                    <Button icon="pi pi-check" label="Clear" onClick={clearQueue} className="mb-3"/>
                    <DataTable value={campaignQueue} style={{width: '100%'}} responsiveLayout="scroll">
                        <Column field="job.queue" header="queue"></Column>
                        <Column field="campaign.name" header="campaign"></Column>
                        <Column field="prospect.first_name" header="firstname"></Column>
                        <Column field="prospect.last_name" header="lastname"></Column>
                        <Column field="job.available_at" header="time"></Column>
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default CampaignQueueTable;
