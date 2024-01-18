import React from 'react';
import 'primeicons/primeicons.css';
import {Badge} from 'primereact/badge';
import {Password} from 'primereact/password';
import {Button} from "primereact/button";

const MailboxInfoCard = (props) => {
    const {mailbox} = props;
    const onValueCopy = (value) => {
        navigator.clipboard.writeText(value)
        // toast.current.show({severity: 'success', summary: 'Value copied', detail: value, life: 3000});
    };

    return (
        <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
            <div className="flex border-bottom-1 border-300 pb-3 pt-1">
                <div className="flex">
                    <img alt="Avatar" src='http://localhost:3000/mailboxes//avatars/default.png' width="52" style={{ borderRadius: '50%' }}/>
                </div>
                <div className="pl-2 my-auto hidden-overflow z-5">
                    <div className="text-500">{mailbox.name}</div>
                    <div className="text-600 text-base">{mailbox.email}</div>
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between">
                    <div className="flex align-items-center">
                        <i className="pi pi-key" style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                        <span>Password:</span>
                    </div>
                    <div className="flex">
                        {mailbox.password ? (
                            <div className="flex">
                                <div className="text-500 text-sm">
                                    <Password value={mailbox.password} disabled toggleMask className="password-value"/>
                                </div>
                                <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                                        onClick={() => onValueCopy(mailbox.password)}/>
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
                <div className="px-2 flex justify-content-between">
                    <div className="flex align-items-center">
                        <i className="pi pi-key " style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                        <span style={{whiteSpace: "nowrap"}}>App Password:</span>
                    </div>
                    {mailbox.app_password ? (
                        <div className="flex">
                            <div className="text-500 text-sm">
                                <Password value={mailbox.app_password} disabled toggleMask className="password-value"/>
                            </div>
                            <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                                    onClick={() => onValueCopy(mailbox.app_password)}/>
                        </div>
                    ) : (
                        <div className="text-500 text-sm">
                            Not exists
                        </div>
                    )}
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex align-items-center">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-envelope"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Domain:</span>
                        </div>
                        <div className="text-500 text-sm">
                            {mailbox.domain}
                        </div>
                    </div>
                    <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                            onClick={() => onValueCopy(mailbox.domain)}/>
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-folder"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "5px"}}></i>
                            <span>Project:</span>
                        </div>
                        {mailbox.project ? (
                            <div className="text-500 text-sm flex align-items-center gap-2">
                                <a className="text-500 hidden-overflow" href="#">{mailbox.project.name}</a>
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
                            <i className="pi pi-user" style={{color: 'grey', fontSize: '1rem', marginRight: "3px"}}></i>
                            <span>CSM:</span>
                        </div>
                        {mailbox.csm ? (
                            <div className="text-500 text-sm flex align-items-center">
                                <a className="text-500" href="#">{mailbox.csm.name}</a>
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
                            <i className="pi pi-users"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "3px"}}></i>
                            <span>SDRs:</span>
                        </div>
                        {mailbox.sdrs ? (
                            <div className="text-500 text-sm flex align-items-center">
                                {mailbox.sdrs.map((sdr, index) => {
                                   return(
                                       <a key={index} className="text-500" href="#">{sdr.name + " "}</a>
                                   )
                                })}
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
                <div className="px-2">
                    {mailbox.phone ? (
                        <div className="flex justify-content-between">
                            <div className="flex align-items-center mr-2">
                                <i className="pi pi-phone"
                                   style={{color: 'grey', fontSize: '1rem', marginRight: "4px"}}></i>
                                <span>Phone:</span>
                                <div className="text-500 text-sm ml-2">
                                    {mailbox.phone}
                                </div>
                            </div>
                            <div>
                                <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                                        onClick={() => onValueCopy(mailbox.phone)}/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex align-items-center">
                            <div className="flex align-items-center mr-3">
                                <i className="pi pi-phone"
                                   style={{color: 'grey', fontSize: '1rem', marginRight: "3px"}}></i>
                                <span>Phone:</span>
                            </div>
                            <div className="text-500 text-sm">
                                Not exists
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="py-3 border-bottom-1 border-300 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex align-items-center">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-stopwatch"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "3px"}}></i>
                            <span>Created at:</span>
                        </div>
                        <div className="text-500 text-sm">
                            {mailbox.created_at}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-3 text-600 text-base">
                <div className="px-2 flex justify-content-between align-items-center">
                    <div className="flex align-items-center">
                        <div className="flex align-items-center mr-2">
                            <i className="pi pi-stopwatch"
                               style={{color: 'grey', fontSize: '1rem', marginRight: "3px"}}></i>
                            <span>Password updated at:</span>
                        </div>
                        {mailbox.password_change_date ? (
                            <div className="text-500 text-sm">
                                {mailbox.password_change_date}
                            </div>
                        ) : (
                            <div className="text-500 text-sm">
                                Not updated
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MailboxInfoCard;
