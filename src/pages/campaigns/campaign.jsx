import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchCampaign} from "../../store/slices/campaignsSlice.js";
import TabNavbar from "../../components/navbars/TabNavbar.jsx";
import CampaignStats from "../../components/campaign/CampaignStats.jsx";
import CampaignHeader from "../../components/campaign/CampaignHeader.jsx";
import CampaignProspects from "../../components/campaign/CampaignProspects.jsx";

const Campaign = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampaign(id));
    }, [dispatch, id]);

    const campaigns = useSelector(state => state.campaigns);

    if (campaigns.loading || !campaigns.campaign) { // Додали перевірку на campaigns.project
        return <div>Loading...</div>;
    }

    return (
        <div className='m-8'>
            <CampaignHeader campaign={campaigns.campaign}/>
            <TabNavbar content={[
                {
                    name: "Campaign Stats",
                    component: <CampaignStats/>
                },
                {
                    name: "Prospects",
                    component: <CampaignProspects/>
                },
                {
                    name: "Autoreplied",
                    component: <div>Autoreplied</div>
                },
                {
                    name: "Deliverability",
                    component: <div>Deliverability</div>
                }
            ]}/>
        </div>
    );
};

export default Campaign;