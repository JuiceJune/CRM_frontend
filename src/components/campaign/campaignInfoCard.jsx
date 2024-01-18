import React from 'react';
import 'primeicons/primeicons.css';
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

const CampaignInfoCard = (props) => {
    const {campaign} = props;
    const {showToast} = useStateContext();
    const onValueCopy = (value) => {
        navigator.clipboard.writeText(value)
        showToast('success', 'Value copied', value);
    };

    return (
        <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full mb-3">
            <div className="flex border-bottom-1 border-300 pb-3 pt-1">
                <div className="pl-2 my-auto hidden-overflow z-5">
                    <div className="text-500">{campaign.name}</div>
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-folder"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Status:</span>
                        </div>
                        {campaign.status ? (
                            <div className="text-500 text-sm flex align-items-center gap-2">
                                <p className="text-500 hidden-overflow">{campaign.status}</p>
                            </div>
                        ) : (
                            <div className="text-500 text-sm">
                                Not setup
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-folder"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Start date:</span>
                        </div>
                        {campaign.start_date ? (
                            <div className="text-500 text-sm flex align-items-center gap-2">
                                <p className="text-500 hidden-overflow">{campaign.start_date}</p>
                            </div>
                        ) : (
                            <div className="text-500 text-sm">
                                Not setup
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/*<div className="py-3 border-bottom-1 border-300 text-600 text-base">*/}
            {/*    <div className="px-2 flex justify-content-between align-items-center">*/}
            {/*        <div className="flex">*/}
            {/*            <div className="flex align-items-center mr-2">*/}
            {/*                <i className="pi pi-folder"*/}
            {/*                   style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>*/}
            {/*                <span>Period:</span>*/}
            {/*            </div>*/}
            {/*            {campaign.period ? (*/}
            {/*                <div className="text-500 text-sm flex align-items-center gap-2">*/}
            {/*                    <p className="text-500 hidden-overflow">{campaign.period} sec</p>*/}
            {/*                </div>*/}
            {/*            ) : (*/}
            {/*                <div className="text-500 text-sm">*/}
            {/*                    Not setup*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-folder"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Project:</span>
                        </div>
                        {campaign.project ? (
                            <div className="text-500 text-sm flex align-items-center gap-2">
                                {/*<Link to={`/mailboxes/${campaign.project.id}`} className="a-decoration text-500 hidden-overflow">{campaign.project}</Link> TODO Add project ID*/}
                                <a className="text-500 hidden-overflow" href="#">{campaign.project}</a>
                                <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                                        onClick={() => onValueCopy(campaign.project)}/>
                            </div>
                        ) : (
                            <div className="text-500 text-sm">
                                Not exists
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-folder"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Mailbox:</span>
                        </div>
                        {campaign.mailbox ? (
                            <div className="text-500 text-sm flex align-items-center gap-2">
                                <Link to={`/mailboxes/${campaign.mailbox.id}`} className="a-decoration text-500 hidden-overflow">{campaign.mailbox.email}</Link>
                                <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                                        onClick={() => onValueCopy(campaign.mailbox.email)}/>
                            </div>
                        ) : (
                            <div className="text-500 text-sm">
                                Not exists
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-folder"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Timezone:</span>
                        </div>
                        {campaign.timezone ? (
                            <div className="text-500 text-sm flex align-items-center gap-2">
                                <p className="text-500 hidden-overflow">{campaign.timezone}</p>
                            </div>
                        ) : (
                            <div className="text-500 text-sm">
                                Not exists
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-folder"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Send limit:</span>
                        </div>
                        {campaign.send_limit ? (
                            <div className="text-500 text-sm flex align-items-center gap-2">
                                <p className="text-500 hidden-overflow">{campaign.send_limit} emails</p>
                            </div>
                        ) : (
                            <div className="text-500 text-sm">
                                Not exists
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignInfoCard;
