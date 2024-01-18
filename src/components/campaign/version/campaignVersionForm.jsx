import React, { useState } from 'react';
import {Button} from "primereact/button";
import {InputText} from "/primereact/inputText";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";
import {Editor} from "primereact/editor";

const CampaignVersionForm = (props) => {
    const {index, stepIndex, versionIndex, version, snippets, handleVersionInputChange, handleVersionEditorChange, handleRemoveVersion} = props;
    const { showToast } = useStateContext();

    const onSnippetCopy = (value) => {
        navigator.clipboard.writeText(value)
        showToast('success', 'Snippet copied', value);
    };

    return (
        <div key={index} className="mb-4">
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="subject">Subject</label>
                <InputText
                    id="subject"
                    value={version.subject}
                    onChange={(event) => handleVersionInputChange(stepIndex, versionIndex, 'subject', event.target.value)}
                />
            </div>

            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="message">Message</label>
                <Editor
                    value={version.message}
                    onTextChange={(event) => handleVersionEditorChange(stepIndex, versionIndex, 'message', event.htmlValue)}
                    style={{ height: '320px' }}
                />
            </div>

            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="message">Snippets</label>
                <div className="flex justify-content-start flex-wrap gap-2">
                    {Object.keys(snippets).length > 0 ? (
                        Object.entries(snippets).map(([key, value], index) => (
                            <Button
                                key={index}
                                label={`${value}`}
                                severity="secondary"
                                outlined
                                rounded
                                onClick={() => onSnippetCopy("{{" + value + "}}")}
                            />
                        ))
                    ) : null}
                </div>
            </div>

            <Button icon="pi pi-trash" size="small" severity="danger" label="Remove version" onClick={() => handleRemoveVersion(stepIndex, versionIndex)}/>
        </div>
    );
};

export default CampaignVersionForm;
