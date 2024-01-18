import React, {useState} from 'react';
import { Button } from 'primereact/button';
import {useStateContext} from "../../../contexts/ContextProvider.jsx";
import CampaignStepForm from "./campaignStepForm.jsx";

const CampaignSteps = (props) => {
    const {campaign, setCampaign, snippets, loading, setLoading} = props;

    const handleAddStep = () => {
        const newStepNumber = campaign.steps.length + 1;
        let newStep = {step: newStepNumber, sending_time_json: {
                Mon: [true, "08:00", "15:00"],
                Tues: [true, "08:00", "15:00"],
                Wed: [true, "08:00", "15:00"],
                Thurs: [true, "08:00", "15:00"],
                Fri: [true, "08:00", "15:00"],
                Sat: [false, "08:00", "15:00"],
                Sun: [false, "08:00", "15:00"]
            }, period: 120, start_after: {
                time: 3,
                time_type: "days"
            }, versions: [
                {version: 'A', subject: '', message: ''}
            ]}
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            steps: [
                ...prevCampaign.steps,
                newStep
            ],
        }));
    };

    const handleRemoveStep = (index) => {
        setCampaign((prevCampaign) => {
            const newSteps = [...prevCampaign.steps];
            newSteps.splice(index, 1);

            // Оновлення індексації для кожного кроку після видалення
            const updatedSteps = newSteps.map((step, idx) => ({ ...step, step: idx + 1 }));

            return {
                ...prevCampaign,
                steps: updatedSteps,
            };
        });
    };


    const handleStepInputChange = (index, field, value) => {
        // Оновити властивості конкретного кроку за індексом
        setCampaign((prevCampaign) => {
            const newSteps = [...prevCampaign.steps];
            newSteps[index] = {
                ...newSteps[index],
                [field]: value,
            };
            return {
                ...prevCampaign,
                steps: newSteps,
            };
        });
    };

    return (
        <div className="mb-3">
            <div className="flex justify-content-between align-items-center ">
                <div className="flex flex-column gap-2 mb-3">
                    {campaign.steps.map((step, index) => (
                        <CampaignStepForm key={index}
                                          index={index}
                                          step={step}
                                          snippets={snippets}
                                          campaign={campaign}
                                          setCampaign={setCampaign}
                                          handleStepInputChange={handleStepInputChange}
                                          handleRemoveStep={handleRemoveStep}
                        />
                    ))}
                    <div className="flex gap-2 mb-3 mt-4">
                        <Button icon="pi pi-plus" loading={loading} label="Add Step"
                                onClick={handleAddStep}/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CampaignSteps;
