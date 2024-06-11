import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams } from "react-router-dom";
import {editCampaign, updateCampaign} from "../../store/slices/campaignsSlice.js";
import CampaignHeader from "../../components/campaign/CampaignHeader.jsx";
import { Divider } from 'primereact/divider';
import CampaignSettings from "../../components/campaign/CampaignSettings.jsx";

const EditCampaign = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const campaigns = useSelector(state => state.campaigns);
    const [campaign, setCampaign] = useState(campaigns.campaign || {});

    useEffect(() => {
        dispatch(editCampaign(id)).then((response) => {
            setCampaign(response.payload.campaign);
            setLoading(false);
        });
    }, [dispatch, id]);


    const handleUpdate = () => {
        console.log(campaign)
        dispatch(updateCampaign(campaign));
    };

    const handleInputChange = (field, value) => {
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            [field]: value,
        }));
    };

    if (loading || campaigns.loading || !campaigns.campaign) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CampaignHeader edit campaign={campaign} onUpdate={handleUpdate} handleInputChange={handleInputChange}/>
            <Divider/>
            <CampaignSettings campaign={campaign} handleInputChange={handleInputChange} setCampaign={setCampaign}/>
        </div>
    );
};

export default EditCampaign;