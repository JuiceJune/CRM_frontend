import React, {useState} from 'react';
import {Editor} from "primereact/editor";
import {Button} from "primereact/button";
import axiosClient from "../../services/axios-client.js";
import {BounceLoader} from "react-spinners";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

const MailboxSignature = (props) => {
    const {mailbox, setMailbox, id} = props;
    const [loading, setLoading] = useState(false)
    const { showToast } = useStateContext();

    const updateSignature = async () => {
        try {
            setLoading(true);
            mailbox.mailbox_id = mailbox.id;
            const response = await axiosClient.put(`/mailboxes/${id}`, mailbox);
            showToast("success", response.data, mailbox.email);

        } catch (error) {
            handleAxiosError(error, showToast);
        } finally {
            setLoading(false);
        }
    }
    const replacePTagsWithDivs = (inputText) => {
        let replacedText = inputText.replace(/<p>/g, '<div>');
        replacedText = replacedText.replace(/<\/p>/g, '</div>');
        return replacedText;
    }
    const handleEditorChange = (field, value) => {
        let modifiedText = replacePTagsWithDivs(value);
        setMailbox((prevMailbox) => ({
            ...prevMailbox,
            [field]: modifiedText,
        }));
    };
    return (
        <div>
            {loading ? (
                <BounceLoader
                    color={"#5B08A7"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full mb-2 mt-2">
                    <div className='flex justify-content-between align-items-center mb-2'>
                        <div className="block text-500 font-medium mb-3">Signature</div>
                        <Button size="small" label="Save" severity="success" text onClick={updateSignature} />
                    </div>
                    <Editor value={mailbox.signature}
                            id="message"
                            name="message"
                            onTextChange={(event) => handleEditorChange( 'signature', event.htmlValue)}
                    />
                </div>
            )}
        </div>
    );
};

export default MailboxSignature;
