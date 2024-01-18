import React from 'react';
import { Button } from 'primereact/button';
import CampaignVersionForm from "./campaignVersionForm.jsx";

const CampaignVersions = (props) => {
    const {step, stepIndex, setCampaign, snippets, campaign} = props;

    const getAlphabetLetter = (index) => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[index];
    };

    const handleAddVersion = (stepIndex) => {
        setCampaign((prevCampaign) => {
            const steps = [...prevCampaign.steps];
            const newVersionLetter = getAlphabetLetter(steps[stepIndex].versions.length);
            const newVersion = { version: newVersionLetter, subject: '', message: '' };

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
                .map((version, index) => ({ ...version, version: getAlphabetLetter(index) }));

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
                    idx === versionIndex ? { ...version, [field]: value } : version
                ),
            };
            return {
                ...prevCampaign,
                steps: steps,
            };
        });
    };


    const replacePTagsWithDivs = (inputText) => {
        let replacedText = inputText.replace(/<p>/g, '<div>');
        replacedText = replacedText.replace(/<\/p>/g, '</div>');
        return replacedText;
    }

    const handleVersionEditorChange = (stepIndex, versionIndex, field, value) => {
        let modifiedText = replacePTagsWithDivs(value);
        setCampaign((prevCampaign) => {
            const steps = [...prevCampaign.steps];
            steps[stepIndex] = {
                ...steps[stepIndex],
                versions: steps[stepIndex].versions.map((version, idx) =>
                    idx === versionIndex ? { ...version, [field]: modifiedText } : version
                ),
            };
            return {
                ...prevCampaign,
                steps: steps,
            };
        });
    };

    return (
        <div className="mb-3">
            <div className="flex justify-content-between align-items-center ">
                <div className="flex flex-column gap-2 mb-3">
                    {step.versions.map((version, index) => (
                        <CampaignVersionForm
                            key={index}
                            index={index}
                            snippets={snippets}
                            stepIndex={stepIndex}
                            versionIndex={index}
                            version={version}
                            handleVersionInputChange={handleVersionInputChange}
                            handleRemoveVersion={handleRemoveVersion}
                            handleVersionEditorChange={handleVersionEditorChange}
                        />
                    ))}
                    <div className="flex gap-2 mb-3 mt-4">
                        <Button icon="pi pi-plus" label="Add Version" onClick={() => handleAddVersion(stepIndex)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignVersions;
