import {Accordion, AccordionTab} from "primereact/accordion";
import TimeLimits from "./edit/TimeLimits.jsx";
import Steps from "./Steps.jsx";
import Summary from "./edit/Summary.jsx";

// eslint-disable-next-line react/prop-types
const CampaignSettings = ({campaign, handleInputChange, setCampaign}) => {
    const headerTemplate = (name) => {
        return (
            <h2 className='text-center py-3'>
                {name}
            </h2>
        )
    }

    return (
        <Accordion>
            <AccordionTab header={headerTemplate('1 - TIME')}>
                <TimeLimits campaign={campaign} handleInputChange={handleInputChange}/>
            </AccordionTab>
            <AccordionTab header={headerTemplate('2 - PATH')}>
                <Steps campaign={campaign} setCampaign={setCampaign}/>
            </AccordionTab>
            <AccordionTab header={headerTemplate('4 - SUMMARY')}>
                <Summary campaign={campaign}/>
            </AccordionTab>
        </Accordion>
    );
};

export default CampaignSettings;