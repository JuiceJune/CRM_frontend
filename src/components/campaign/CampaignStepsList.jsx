import {Accordion, AccordionTab} from 'primereact/accordion';
import {useSelector} from "react-redux";
import CampaignVersionsList from "./CampaignVersionList.jsx";

const CampaignStepsList = () => {
    const steps = useSelector(state => state.campaigns.campaign.steps);

    const StatusValue = ({ status, value, whole }) => {
        return (
            <div className='flex align-items-center flex-column gap-4'>
                <div>
                    {status}
                </div>
                <div>
                    {whole ? `${((value / whole) * 100).toFixed(0)}% (${value})` : value}
                </div>
            </div>
        );
    };

    const headerTemplate = (step) => {
        return (
            <div className='flex justify-content-between'>
                <div className='ml-2 flex align-items-center gap-2'>
                    <i className='pi pi-envelope' style={{ fontSize: '1.7rem' }}></i>
                    <h3>{step.step} - Email</h3>
                </div>

                <StatusValue status="Sent" value={step.sentAllTimeCount}/>
                <StatusValue status="Queued" value={step.queuedNowCount}/>
                <StatusValue status="Delivered" value={step.deliveredAllTimeCount} whole={step.sentAllTimeCount}/>
                <StatusValue status="Opened" value={step.openedAllTimeCount} whole={step.deliveredAllTimeCount}/>
                <StatusValue status="Responded" value={step.respondedAllTimeCount} whole={step.deliveredAllTimeCount}/>
                <StatusValue status="Bounced" value={step.bouncedAllTimeCount} whole={step.deliveredAllTimeCount}/>
                <StatusValue status="Opt-out" value={step.unsubscribeAllTimeCount} whole={step.deliveredAllTimeCount}/>
            </div>
        )
    }

    return (
        <Accordion multiple className="card mt-6 mx-2">
            {steps.map(step => (
                <AccordionTab key={step.step} header={headerTemplate(step)}>
                    <CampaignVersionsList StatusValue={StatusValue} versions={step.versions}/>
                </AccordionTab>
            ))}
        </Accordion>
    );
};

export default CampaignStepsList;