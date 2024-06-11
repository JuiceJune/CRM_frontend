import CampaignStatCards from "./CampaignStatCards.jsx";
import CampaignStepsList from "./CampaignStepsList.jsx";

const CampaignStats = () => {
    return (
        <div>
            <div>
                <CampaignStatCards/>
            </div>
            <div>
                <CampaignStepsList/>
            </div>
        </div>
    );
};

export default CampaignStats;