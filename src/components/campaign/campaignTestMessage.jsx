import React, {useEffect, useState} from 'react';
import 'primeicons/primeicons.css';
import {InputText} from "/primereact/inputText";
import {Button} from "primereact/button";
import axiosClient from "../../services/axios-client.js";
import {useParams} from "react-router-dom";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

const CampaignTestMessage = (props) => {
    const {mailboxId, subject, message} = props;
    const { showToast } = useStateContext();
    const [loading, setLoading] = useState(false)
    const [testEmail, setTestEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [snippets, setSnippets] = useState({});

    useEffect(() => {
        findAllSnippetsInMessage(message)
    }, [])

    const findAllSnippetsInMessage = (message) => {
        const regex = /{{(.*?)}}/g;
        let match;
        const snippetsData = {};

        while ((match = regex.exec(message)) !== null) {
            snippetsData[match[1]] = "";
        }

        setSnippets(snippetsData);
    }

    const onSend = () => {
        if (testEmail && isEmailValid) {
            setLoading(true)
            axiosClient.post(`/campaigns/sendTestEmail`, {
                mailbox_id: mailboxId,
                subject: subject,
                message: message,
                test_email: testEmail,
                snippets: snippets
            })
                .then((response) => {
                    showToast("success", "Success", response.data);
                })
                .catch(error => {
                    handleAxiosError(error, showToast);
                })
                .finally(() => {
                    setLoading(false);
                })
        } else {
            showToast("error", "Error", "Email is not valid");
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setTestEmail(email);
        setIsEmailValid(validateEmail(email));
    }

    const handleSnippetChange = (snippetKey, event) => {
        const updatedSnippets = { ...snippets };
        updatedSnippets[snippetKey] = event.target.value;
        setSnippets(updatedSnippets);
    };

    return (
        <div className="flex flex-column gap-2">
            <label htmlFor="testEmail" className="text-500">Test email</label>
            <div>
                <InputText className='mb-3'
                           id="testEmail"
                           name="testEmail"
                           value={testEmail}
                           placeholder="someone@mail.com"
                           onChange={handleEmailChange} />
                <div>
                    {Object.keys(snippets).map((snippetKey) => (
                        <div key={snippetKey}>
                            <label className="text-500">Snippet: <em className="">{snippetKey}</em></label>
                            <InputText className='mb-3 mt-2'
                                       id={snippetKey}
                                       name={snippetKey}
                                       value={snippets[snippetKey]}
                                       placeholder={snippetKey}
                                       onChange={(e) => handleSnippetChange(snippetKey, e)}
                            />
                        </div>
                    ))}
                </div>
                <Button icon="pi pi-send" outlined loading={loading} label="Send" onClick={onSend}/>
            </div>
        </div>
    );
};

export default CampaignTestMessage;
