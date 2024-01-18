import React from 'react';
import 'primeicons/primeicons.css';
import {InputText} from "primereact/inputText";
import {Editor} from "primereact/editor";

const CampaignMessageInfo = (props) => {
    const {subject, message, signature} = props;

    return (
        <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full mb-3">
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="subject">Subject</label>
                <InputText id="subject" name="subject" value={subject} disabled />
            </div>

            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="message">Message</label>
                <Editor value={message}
                        id="message"
                        name="message"
                        readOnly />
            </div>

            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="signature">Signature</label>
                <Editor value={signature}
                        id="signature"
                        name="signature"
                        readOnly />
            </div>
        </div>
    );
};

export default CampaignMessageInfo;
