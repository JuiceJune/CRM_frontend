import React from 'react';
import 'primeicons/primeicons.css';
import { Accordion, AccordionTab } from 'primereact/accordion';
import CampaignVersionsPanel from "../version/campaignVersionsPanel.jsx";
import CampaignStepDeliveryTime from "./campaignStepDeliveryTime.jsx";

const CampaignStepsPanel = (props) => {
    const {steps, signature, mailboxId} = props;

    return (
        <div>
            <Accordion multiple activeIndex={[0]}>
                {steps.map( (step, index) => {
                    return (
                        <AccordionTab key={index} header={"Step " + step.step}>
                            <div className="flex gap-5">
                                <div className="w-8">
                                    <CampaignVersionsPanel versions={step.versions} signature={signature} mailboxId={mailboxId}/>
                                </div>
                                <div>
                                    <CampaignStepDeliveryTime step={step}/>
                                </div>
                            </div>
                        </AccordionTab>
                    )
                })}
            </Accordion>
        </div>
    );
};

export default CampaignStepsPanel;
