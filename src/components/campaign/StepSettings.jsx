import {Accordion, AccordionTab} from "primereact/accordion";
import Versions from "./edit/Versions.jsx";
import CampaignSendTimePicker from "./CampaignSendTimePicker.jsx";

// eslint-disable-next-line react/prop-types
const StepSettings = ({campaign, step, handleStepInputChange, index, setCampaign}) => {
    const headerTemplate = (name) => {
        return (
            <h2 className='text-center py-3'>
                {name}
            </h2>
        )
    }

    return (
        <Accordion multiple activeIndex={[1]}>
            <AccordionTab header={headerTemplate('TIME')}>
                <CampaignSendTimePicker steps={campaign.steps} step={step} index={index} handleStepInputChange={handleStepInputChange}/>
            </AccordionTab>
            <AccordionTab header={headerTemplate('VERSIONS')}>
                <Versions campaign={campaign} step={step} stepIndex={index} setCampaign={setCampaign}/>
            </AccordionTab>
        </Accordion>
    );
};

export default StepSettings;