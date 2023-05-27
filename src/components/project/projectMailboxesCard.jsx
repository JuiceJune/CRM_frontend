import React from 'react';
import 'primeicons/primeicons.css';
import {Link} from "react-router-dom";
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";


const ProjectMailboxesCard = (props) => {
    const {mailboxes} = props

    if (mailboxes) {
        return (
            <div>
                <div className="text-500 font-medium mb-2 border-bottom-1 border-300 pb-1">
                    Mailboxes
                </div>
                {mailboxes.map((mailbox, index) => {
                    const badgeTemplate = <img src={"../" + mailbox.email_provider_logo} alt="badge"
                                               style={{width: '24px', height: '24px'}}/>;
                    return (
                        <div key={index} className="transition-colors transition-duration-500 hover:surface-200">
                            <Link to={`/mailboxes/${mailbox.id}`} className="a-decoration">
                                <div className="flex justify-content-between align-items-center pt-1">
                                    <div className="flex">
                                        <div className="flex">
                                            <Badge value={badgeTemplate} className="p-0 bg-white"/>
                                            <Avatar image={'../' + mailbox.avatar} size="large" shape="circle" />
                                        </div>
                                        <div className="pl-2 my-auto hidden-overflow z-5">
                                            <div className="text-500">{mailbox.name}</div>
                                            <div className="text-600 text-base">{mailbox.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>
                <div className="text-500 font-medium mb-2 border-bottom-1 border-300 pb-1">
                    Mailboxes
                </div>
                <div className="flex pt-1 text-500">
                    Not specified
                </div>
            </div>
        )
    }
};

export default ProjectMailboxesCard;
