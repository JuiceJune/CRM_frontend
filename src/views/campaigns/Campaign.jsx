import React, {useEffect, useState} from 'react';
import axiosClient from "../../services/axios-client.js";
import {useParams} from "react-router-dom";
import {BounceLoader} from "react-spinners";
import 'primeicons/primeicons.css';
import {useNavigate} from "react-router-dom";
import CampaignHeaderCards from "../../components/campaign/campaignHeaderCards.jsx";
import CampaignInfoCard from "../../components/campaign/campaignInfoCard.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import CampaignMessageInfo from "../../components/campaign/campaignMessageInfo.jsx";
import CampaignTestMessage from "../../components/campaign/campaignTestMessage.jsx";
import CampaignSendTimeInfo from "../../components/campaign/campaignSendTimeInfo.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import CampaignHeader from "../../components/campaign/campaignHeader.jsx";
import CampaignProspects from "../../components/campaign/campaignProspects.jsx";
import CampaignQueueTable from "../../components/campaign/campaignQueueTable.jsx";
import CampaignStepsPanel from "../../components/campaign/step/campaignStepsPanel.jsx";


const Campaign = () => {
    const {id} = useParams()
    const {showToast} = useStateContext();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getCampaign();
    }, [])

    const getCampaign = () => {
        axiosClient.get(`/campaigns/${id}`)
            .then(response => {
                console.log(response);
                setCampaign(response.data)
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
                navigate(-1);
            })
            .finally(() => {
                setLoading(false)
            })
    }


    return (
        <div>
            {loading || !campaign ? (
                <BounceLoader
                    color={"#5B08A7"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div>
                    <CampaignHeader campaign={campaign} navigate={navigate} setLoading={setLoading} id={id}
                                    setCampaign={setCampaign}
                    />
                    {/*<CampaignQueueTable/>*/}
                    <CampaignHeaderCards/>
                    <CampaignInfoCard campaign={campaign}/>
                    <CampaignStepsPanel steps={campaign.steps} signature={campaign.mailbox.signature} mailboxId={campaign.mailbox.id}/>
                    <CampaignProspects/>
                </div>
            )}
        </div>
    );
};

export default Campaign;
