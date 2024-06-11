import { InputSwitch } from 'primereact/inputswitch';
import {useRef, useState} from "react";
import {Accordion, AccordionTab} from 'primereact/accordion';
import {InputText} from "primereact/inputtext";
import JoditEditor from 'jodit-react';

const CampaignVersionsList = (props) => {
    // eslint-disable-next-line react/prop-types
    const {StatusValue, versions} = props;
    const [checked, setChecked] = useState(true);
    const editor = useRef(null);
    const config = {
        buttons: [],
        readonly: true,
        toolbarAdaptive: false, // Вимикаємо автоматичне розташування кнопок
    };

    const versionTemplate = (version) => {
        return (
            <div key={version.id} className='flex justify-content-between'>
                <div className='flex align-items-center gap-2'>
                    <i className='pi pi-envelope' style={{ fontSize: '1.7rem' }}></i>
                    <h4>Version {version.version}</h4>
                    <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                </div>

                <StatusValue status="Sent" value={version.sentAllTimeCount} />
                <StatusValue status="Queued" value={version.queuedNowCount} />
                <StatusValue status="Delivered" value={version.deliveredAllTimeCount} whole={version.sentAllTimeCount}/>
                <StatusValue status="Opened" value={version.openedAllTimeCount} whole={version.deliveredAllTimeCount}/>
                <StatusValue status="Responded" value={version.respondedAllTimeCount} whole={version.deliveredAllTimeCount}/>
                <StatusValue status="Bounced" value={version.bouncedAllTimeCount} whole={version.deliveredAllTimeCount}/>
                <StatusValue status="Opt-out" value={version.unsubscribeAllTimeCount} whole={version.deliveredAllTimeCount}/>
            </div>
        )
    }

    return (
        <Accordion multiple className="card">
            {versions.map(version => (
                <AccordionTab key={version.version} header={versionTemplate(version)}>
                    <div className="w-full mb-4">
                        <label>Subject</label>
                        <InputText
                            value={version.subject}
                            disabled
                            className={'w-full mt-2'}
                        />
                    </div>
                    <div>
                        <label>Message</label>
                        <JoditEditor
                            className={'w-full mt-2'}
                            ref={editor}
                            value={version.message}
                            config={config}
                        />
                    </div>
                </AccordionTab>
            ))}
        </Accordion>
    );
};

export default CampaignVersionsList;