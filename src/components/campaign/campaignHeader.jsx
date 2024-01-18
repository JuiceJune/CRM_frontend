import React from 'react';
import { Button } from 'primereact/button';
import axiosClient from "../../services/axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";

const CampaignHeader = (props) => {
    const {campaign, navigate, setLoading, id, setCampaign} = props;
    const { showToast } = useStateContext();

    const deleteCampaign = () => {
        setLoading(true);
        axiosClient.delete(`/campaigns/${id}`)
            .then(response => {
                showToast('success', 'Campaign deleted successfully', response.data);
                navigate("/campaigns");
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const startCampaign = () => {
        setLoading(true);
        axiosClient.get(`/campaigns/${id}/start`)
            .then(response => {
                setCampaign(response.data);
                showToast('success', 'Campaign started successfully', response.data.name);
            })
            .catch((error) => {
                console.log(error);
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const stopCampaign = () => {
        setLoading(true);
        axiosClient.get(`/campaigns/${id}/stop`)
            .then(response => {
                setCampaign(response.data);
                showToast('success', 'Campaign stopped successfully', response.data.name);
            })
            .catch((error) => {
                console.log(error);
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round mb-3">
            <div className="flex justify-content-between align-items-center ">
                <div className="flex align-items-center">
                    <Button icon="pi pi-arrow-left" onClick={() => navigate(-1)} className="mr-2" rounded
                            outlined
                            aria-label="Filter"/>
                    <h1>{campaign.name}</h1>
                </div>
                <div className="flex gap-3">
                    {campaign.status === 'stopped' ?
                        <Button icon="pi pi-check" label="Start" onClick={startCampaign}/> :
                        <Button icon="pi pi-times" label="Stop" onClick={stopCampaign}/>
                    }
                    <Button icon="pi pi-pencil" label="Edit Campaign" onClick={() => {
                        navigate(`/campaigns/${id}/edit`)
                    }}/>
                    <Button icon="pi pi-trash" severity="danger" label="Delete Campaign" onClick={deleteCampaign}/>
                </div>
            </div>
        </div>
    );
}

export default CampaignHeader;
