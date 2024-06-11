import {Stepper} from 'primereact/stepper';
import {StepperPanel} from 'primereact/stepperpanel';
import {useRef} from "react";
import VersionSettings from "../VersionSettings.jsx";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";

const Versions = ({campaign, step, stepIndex, setCampaign, handleStepInputChange}) => {
    const stepperRef = useRef(null);

    const getAlphabetLetter = (index) => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[index];
    };

    const handleAddVersion = (stepIndex) => {
        setCampaign((prevCampaign) => {
            const steps = [...prevCampaign.steps];
            const newVersionLetter = getAlphabetLetter(steps[stepIndex].versions.length);
            const newVersion = {version: newVersionLetter, subject: '', message: ''};

            steps[stepIndex] = {
                ...steps[stepIndex],
                versions: [...steps[stepIndex].versions, newVersion],
            };

            return {
                ...prevCampaign,
                steps: steps,
            };
        });
    };

    const handleRemoveVersion = (stepIndex, versionIndex) => {
        setCampaign((prevCampaign) => {
            const steps = [...prevCampaign.steps];
            const updatedVersions = steps[stepIndex].versions
                .filter((_, index) => index !== versionIndex)
                .map((version, index) => ({...version, version: getAlphabetLetter(index)}));

            steps[stepIndex] = {
                ...steps[stepIndex],
                versions: updatedVersions,
            };

            return {
                ...prevCampaign,
                steps: steps,
            };
        });
    };

    const handleVersionInputChange = (stepIndex, versionIndex, field, value) => {
        setCampaign((prevCampaign) => {
            const steps = [...prevCampaign.steps];
            steps[stepIndex] = {
                ...steps[stepIndex],
                versions: steps[stepIndex].versions.map((version, idx) =>
                    idx === versionIndex ? {...version, [field]: value} : version
                ),
            };
            return {
                ...prevCampaign,
                steps: steps,
            };
        });
    };

    return (
        <Stepper ref={stepperRef} style={{flexBasis: '50rem'}}>
            {step.versions.map((version, index) => (
                <StepperPanel key={index} header={`Version - ${version.version}`}>
                    <div
                        className={'flex align-items-center justify-content-between gap-3 mb-2 border-solid border-1 border-200 border-round-sm px-4'}>
                        <div className={'flex align-items-center'}>
                            <div>Version: {version.version}</div>
                            <Button icon="pi pi-trash" text severity="danger" size="small"
                                    onClick={() => handleRemoveVersion(stepIndex, index)}/>
                        </div>
                        <Button icon="pi pi-plus" text severity="success" size="small"
                                onClick={() => handleAddVersion(stepIndex)}/>
                    </div>
                    <Divider/>
                    <VersionSettings
                        campaign={campaign}
                        version={version}
                        stepIndex={stepIndex}
                        versionIndex={index}
                        handleVersionInputChange={handleVersionInputChange}
                        handleStepInputChange={handleStepInputChange}
                    />
                </StepperPanel>
            ))}
        </Stepper>
    );
};

export default Versions;