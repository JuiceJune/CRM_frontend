import React, { useState } from 'react';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputNumber";
import CampaignSendTimePicker from "../campaignSendTimePicker.jsx";
import CampaignVersions from "../version/campaignVersions.jsx";
import { Divider } from 'primereact/divider';
import CampaignStepStartAfterForm from "./campaignStepStartAfterForm.jsx";

const CampaignStepForm = (props) => {
    const {index, step, setCampaign, handleStepInputChange, handleRemoveStep, snippets, campaign} = props;
    return (
        <div key={index} className="mb-4">
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="period">Period</label>
                <InputNumber
                    inputId="period"
                    value={step.period}
                    onValueChange={(event) => handleStepInputChange( index, 'period', event.target.value)}
                    suffix=" sec"
                    min={10} max={3600} />
            </div>

            <div className="flex flex-column gap-2 mb-4">
                <CampaignSendTimePicker sendingTimeJson={step.sending_time_json} handleStepInputChange={handleStepInputChange} index={index}/>
            </div>

            <div className="flex flex-column gap-2 mb-4">
                <CampaignStepStartAfterForm startAfter={step.start_after} stepIndex={index} setCampaign={setCampaign} handleStepInputChange={handleStepInputChange}/>
            </div>

            <div className="flex flex-column gap-2 mb-4">
                <CampaignVersions step={step} stepIndex={index} setCampaign={setCampaign} snippets={snippets} campaign={campaign}/>
            </div>

            <Button icon="pi pi-trash" size="small" severity="danger" label="Remove step" onClick={() => handleRemoveStep(index)}/>
            <Divider />
        </div>
    );
};

export default CampaignStepForm;
