import {useRef} from 'react';
import {Stepper} from 'primereact/stepper';
import {StepperPanel} from 'primereact/stepperpanel';
import StepSettings from "./StepSettings.jsx";
import { Button } from 'primereact/button';

// eslint-disable-next-line react/prop-types
const Steps = ({campaign, setCampaign}) => {
    const stepperRef = useRef(null);

    const handleAddStep = () => {
        let newStep = {
            step: campaign.steps.length + 1,
            sending_time_json: campaign.steps[campaign.steps.length - 1].sending_time_json ?? {
                Mon: [true, "08:00", "15:00"],
                Tues: [true, "08:00", "15:00"],
                Wed: [true, "08:00", "15:00"],
                Thurs: [true, "08:00", "15:00"],
                Fri: [true, "08:00", "15:00"],
                Sat: [false, "08:00", "15:00"],
                Sun: [false, "08:00", "15:00"]
            },
            period: campaign.steps[campaign.steps.length - 1].period ?? 120,
            start_after: campaign.steps[campaign.steps.length - 1].start_after ?? {
                time: 3,
                time_type: "days"
            }, versions: [
                {version: 'A', subject: '', message: ''}
            ],
            reply_to_exist_thread: {
                reply: true,
                step: campaign.steps.length
            }
        }
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

            const updatedSteps = newSteps.map((step, idx) => ({...step, step: idx + 1}));

            return {
                ...prevCampaign,
                steps: updatedSteps,
            };
        });
    };

    const handleStepInputChange = (index, field, value) => {
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
        <Stepper ref={stepperRef} style={{flexBasis: '50rem'}}>
            {campaign.steps.map((step, index) => (
                <StepperPanel key={index} header={`Step - ${step.step}`}>
                    <div className={'flex align-items-center justify-content-between gap-3 mb-2 border-solid border-1 border-200 border-round-sm px-4'}>
                        <div className={'flex align-items-center'}>
                            <div>Step: {step.step}</div>
                            <Button icon="pi pi-trash" text severity="danger" size="small" onClick={() => handleRemoveStep(index)}/>
                        </div>
                        <Button icon="pi pi-plus" text severity="success" size="small" onClick={handleAddStep}/>
                    </div>
                    <StepSettings campaign={campaign} step={step} handleStepInputChange={handleStepInputChange} index={index} setCampaign={setCampaign}/>
                </StepperPanel>
            ))}
        </Stepper>
    );
};

export default Steps;