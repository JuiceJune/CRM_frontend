import React, {useEffect, useState} from 'react';
import {Button} from "primereact/button";
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../services/axios-client.js";
import ProspectUpload from "../prospect/prospectUpload.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import ProspectsTable from "../prospect/prospectsTable.jsx";

export default function CampaignProspects() {
    const {id} = useParams();
    const {showToast} = useStateContext();
    const navigate = useNavigate();
    const [prospects, setProspects] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProspects();
    }, [])

    const getProspects = () => {
        setLoading(true)
        axiosClient.get(`/prospects`, {
            params: {
                campaign_id: id,
            }
        })
            .then(response => {
                setProspects(response.data);
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const deleteProspect = (id) => {
        axiosClient.delete(`/prospects/${id}`)
            .then(response => {
                showToast("success", response.data)
                getProspects();
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
                navigate(-1);
            })
            .finally(() => {
                setLoading(false)
            })
    };

    return (
        <div className="card mt-3">
            <div className="flex justify-content-between border-bottom-1 border-300 pb-2 pt-1">
                <div className="pl-2 my-auto hidden-overflow z-5">
                    <div className="text-500">Prospects</div>
                </div>
                <div className='flex gap-3'>
                    <Button size="small" className="flex align-items-center p-1" link icon="pi pi-plus"
                            label="Add Prospects" onClick={() => {
                        navigate(`/campaigns/${id}/prospects/create`);
                    }}/>
                </div>
            </div>
            <ProspectUpload id={id} getProspects={getProspects} loading={loading} setLoading={setLoading}/>
            <ProspectsTable prospects={prospects} loading={loading} setLoading={setLoading}
                            deleteProspect={deleteProspect}/>
        </div>
    );
}
