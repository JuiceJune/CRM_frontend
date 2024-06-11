import InfoCard from "../infoCards/InfoCard.jsx";
import InfoChartCard from "../infoCards/InfoChartCard.jsx";
import {useSelector} from "react-redux";

export default function CampaignStatCards() {
    const campaign = useSelector(state => state.campaigns.campaign);

    return (
        <div className='grid'>
            <div className='col-12 md:col-6 lg:col-3'>
                <InfoCard title='Prospects' image='pi-users' value={campaign.prospectsCount}/>
            </div>
            <div className='col-12 md:col-6 lg:col-3'>
                <InfoCard title='Invalid' image='pi-users' value={campaign.invalidAllTimeCount} whole={campaign.deliveredAllTimeCount}/>
            </div>
            <div className='col-12 md:col-6 lg:col-3'>
                <InfoCard title='Sent' image='pi-send' value={campaign.sentAllTimeCount} whole={campaign.prospectsCount}/>
            </div>
            <div className='col-12 md:col-6 lg:col-3'>
                <InfoCard title='Bounced' image='pi-shield' value={campaign.bouncedAllTimeCount} whole={campaign.sentAllTimeCount}/>
            </div>
            <div className='col-12 md:col-12 lg:col-2'>
                <InfoCard title='Delivered' image='pi-folder' value={campaign.deliveredAllTimeCount} whole={campaign.sentAllTimeCount} vertical={true}/>
            </div>
            <div className='col-12 md:col-12 lg:col-5'>
                <InfoChartCard title='Opened' image='pi-folder' value={campaign.openedAllTimeCount} whole={campaign.deliveredAllTimeCount}/>
            </div>
            <div className='col-12 md:col-12 lg:col-5'>
                <InfoChartCard title='Responded' image='pi-folder' value={campaign.respondedAllTimeCount} whole={campaign.deliveredAllTimeCount}/>
            </div>
        </div>
    )
}