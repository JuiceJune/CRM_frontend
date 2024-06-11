import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { Divider } from "primereact/divider";
import { useDispatch } from "react-redux";
import { sendTestMail } from "../../store/slices/campaignsSlice.js";

const TestMessageDialog = ({ mailbox_id, visible, setVisible, subject, message }) => {
    const [testEmail, setTestEmail] = useState('');
    const [snippets, setSnippets] = useState([]);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const extractSnippets = (text) => {
            const regex = /\{\{([a-z_]+)\}\}/gi;
            const matches = [];
            let match;
            while ((match = regex.exec(text)) !== null) {
                matches.push(match[1]);
            }
            return matches;
        };

        const subjectSnippets = extractSnippets(subject);
        const messageSnippets = extractSnippets(message);
        const allSnippets = [...new Set([...subjectSnippets, ...messageSnippets])];

        setSnippets(allSnippets.map(snippet => ({ key: snippet.toLowerCase(), value: '' })));
    }, [subject, message]);

    const handleSnippetInputChange = (index, value) => {
        const newSnippets = [...snippets];
        newSnippets[index] = { ...newSnippets[index], value };
        setSnippets(newSnippets);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = () => {
        const newErrors = {};

        if(!mailbox_id) {
            newErrors.mailbox = 'Campaign Mailbox not define';
        }

        if (!validateEmail(testEmail)) {
            newErrors.testEmail = 'Invalid email address';
        }

        snippets.forEach((snippet, index) => {
            if (!snippet.value) {
                newErrors[`snippet-${index}`] = 'This field is required';
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const sentTestMessage = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const snippetObject = snippets.reduce((acc, snippet) => {
                acc[snippet.key] = snippet.value;
                return acc;
            }, {});

            let data = {
                message,
                subject,
                test_email: testEmail,
                mailbox_id: mailbox_id,
                snippets: snippetObject
            };
            dispatch(sendTestMail(data));
        } catch (error) {
            console.log(error);
        } finally {
            setVisible(false);
        }
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Test Message</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" className="p-button-danger" onClick={() => setVisible(false)} autoFocus />
            <Button label="Send" icon="pi pi-check" onClick={sentTestMessage} autoFocus />
        </div>
    );

    return (
        <Dialog visible={visible} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
            <div className="card flex justify-content-center">
                <div className="flex flex-column gap-2">
                    {errors.mailbox && <small className="p-error">{errors.mailbox}</small>}
                    <label htmlFor="email">Email</label>
                    <InputText id="email" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} aria-describedby="email-help" />
                    {errors.testEmail && <small className="p-error">{errors.testEmail}</small>}
                    <small id="email-help">
                        Enter email address to send test email.
                    </small>
                </div>
            </div>
            <Divider />
            <div className="card flex justify-content-center gap-4 flex-wrap">
                {snippets.map((snippet, index) => (
                    <div key={index} className="flex flex-column gap-2 w-5">
                        <label htmlFor={`snippet-${index}`}>{snippet.key}</label>
                        <InputText
                            id={`snippet-${index}`}
                            className="p-inputtext-sm"
                            value={snippet.value}
                            onChange={(e) => handleSnippetInputChange(index, e.target.value)}
                        />
                        {errors[`snippet-${index}`] && <small className="p-error">{errors[`snippet-${index}`]}</small>}
                    </div>
                ))}
            </div>
        </Dialog>
    );
};

export default TestMessageDialog;
