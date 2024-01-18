import React from 'react';
import 'primeicons/primeicons.css';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Divider } from 'primereact/divider';
import CampaignTestMessage from "../campaignTestMessage.jsx";

const CampaignVersionsPanel = (props) => {
    const {versions, signature, mailboxId} = props;

    return (
        <div>
            <Accordion multiple activeIndex={[0]}>
                {versions.map( (version, index) => {
                    return (
                        <AccordionTab key={index} header={"Step " + version.version}>
                            <div>
                                <b>Subject:</b> {version.subject}
                            </div>
                            <Divider />
                            <div dangerouslySetInnerHTML={{ __html: version.message }} />
                            <div dangerouslySetInnerHTML={{ __html: signature }} />
                            <Divider />
                            <CampaignTestMessage mailbox={mailboxId} subject={version.subject} message={version.message}/>
                        </AccordionTab>
                    )
                })}
            </Accordion>
        </div>
    );
};

export default CampaignVersionsPanel;
