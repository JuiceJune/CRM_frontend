import {InputText} from "primereact/inputtext";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import JoditEditor from 'jodit-react';
import {updateMailbox} from "../../store/slices/mailboxesSlice.js";
import {Button} from "primereact/button";

const MailboxForm = ({mailbox}) => {
    const [name, setName] = useState(mailbox.name);
    const [signature, setSignature] = useState(mailbox.signature);
    const [sendingLimit, setSendingLimit] = useState(mailbox.send_limit);
    const dispatch = useDispatch();

    const editor = useRef(null);

    const config = {
        buttons: [
            'bold',
            'italic',
            'underline', '|',
            'ul',
            'ol', '|',
            'outdent', 'indent', '|',
            'font',
            'fontsize', '|',
            'brush',
            'paragraph', '|',
            'image',
            'link', '|',
            'align',
            'hr',
            'eraser',
            'source', '|',
            'undo', 'redo'
        ],
        toolbarAdaptive: false, // Вимикаємо автоматичне розташування кнопок
        showCharsCounter: false, // Вимикаємо лічильник символів (якщо не потрібно)
        showXPathInStatusbar: false // Вимикаємо відображення шляху (якщо не потрібно)
    };

    const handleSave = () => {
        const updatedMailbox = {
            id: mailbox.id,
            email: mailbox.email,
            name: name,
            signature: signature,
            send_limit: sendingLimit
        };
        dispatch(updateMailbox(updatedMailbox));
    };

    const handleCancel = () => {
        setName(mailbox.name);
        setSignature(mailbox.signature);
        setSendingLimit(mailbox.send_limit);
    };

    return (
        <div className="card flex flex-column gap-6 justify-content-center w-8 m-auto">
            <div className="flex flex-column gap-2">
                <label htmlFor="name">From name</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="flex flex-column gap-2">
                <label htmlFor="signature">Signature</label>
                <JoditEditor
                    ref={editor}
                    value={signature}
                    config={config}
                    onBlur={newContent => setSignature(newContent)}
                />
            </div>
            <div className="flex flex-column gap-2">
                <label htmlFor="sendingLimit">Sending limit</label>
                <InputText id="sendingLimit" value={sendingLimit} onChange={(e) => setSendingLimit(e.target.value)}/>
            </div>

            <div className={'flex gap-2 justify-content-between'}>
                <Button label="Save" severity="success" outlined className={'w-5'} onClick={handleSave}/>
                <Button label="Cancel" severity="secondary" outlined className={'w-5'} onClick={handleCancel}/>
            </div>
        </div>
    );
};

export default MailboxForm;