import {Divider} from 'primereact/divider';
import MessageEditor from "../MessageEditor.jsx";
import SubjectInput from "../SubjectInput.jsx";
import {Button} from 'primereact/button';
import TestMessageDialog from "./TestMessageDialog.jsx";
import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
const VersionSettings = ({campaign, version, stepIndex, versionIndex, handleVersionInputChange}) => {
    const [showTestMessageDialog, setShowTestMessageDialog] = useState(false);

    useEffect(() => {
        if (campaign.steps[stepIndex].reply_to_exist_thread.reply && campaign.steps[stepIndex].reply_to_exist_thread.step) {
            campaign.steps.forEach(item => {
                if (item.step === campaign.steps[stepIndex].reply_to_exist_thread.step) {
                    handleVersionInputChange(stepIndex, versionIndex, 'subject', item.versions[0].subject);
                }
            });
        }
    }, [stepIndex, versionIndex]);

    return (
        <div className='flex justify-content-between'>
            <div className='w-7 flex flex-column gap-3'>
                <SubjectInput
                    value={version.subject}
                    disabled={campaign.steps[stepIndex].reply_to_exist_thread.reply}
                    onChange={(event) => {
                        handleVersionInputChange(stepIndex, versionIndex, 'subject', event.target.value);
                    }}
                />
                <MessageEditor value={version.message} onChange={(event) => {
                    handleVersionInputChange(stepIndex, versionIndex, 'message', event)
                }}/>
            </div>
            <Divider layout="vertical"/>
            <TestMessageDialog
                mailbox_id={campaign.mailbox?.id}
                visible={showTestMessageDialog}
                setVisible={setShowTestMessageDialog}
                subject={campaign.steps[stepIndex].reply_to_exist_thread.reply ? campaign.steps[campaign.steps[stepIndex].reply_to_exist_thread.step - 1].versions.subject : version.subject}
                message={version.message}
            />

            <div className='w-3 flex flex-column gap-3'>
                <Button icon="pi pi-send" label="Send test email" severity="secondary" outlined
                        onClick={() => setShowTestMessageDialog(true)}/>
                <Button icon="pi pi-list-check" label="Spam check this email" severity="secondary" outlined/>
            </div>
        </div>
    );
};

export default VersionSettings;