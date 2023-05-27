import React from 'react';
import 'primeicons/primeicons.css';
import {Link} from "react-router-dom";
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";


const ProjectLinkedinAccountsCard = (props) => {
    const {linkedinAccounts} = props
    if (linkedinAccounts) {
        return (
            <div>
                <div className="text-500 font-medium mb-2 border-bottom-1 border-300 pb-1">
                    linkedin Accounts
                </div>
                {linkedinAccounts.map((linkedin, index) => {
                    return (
                        <div key={index} className="transition-colors transition-duration-500 hover:surface-200">
                            <Link to={`/linkedin-accounts/${linkedin.id}`} className="a-decoration">
                                <div className="flex justify-content-between align-items-center pt-1">
                                    <div className="flex">
                                        <div className="flex">
                                            <Avatar image={'../' + linkedin.avatar} size="large" shape="circle" />
                                        </div>
                                        <div className="pl-2 my-auto hidden-overflow z-5">
                                            <div className="text-500">{linkedin.name}</div>
                                            <div className="text-600 text-base">{linkedin.email}</div>
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
                    linkedin Accounts
                </div>
                <div className="flex pt-1 text-500">
                    Not specified
                </div>
            </div>
        )
    }
};

export default ProjectLinkedinAccountsCard;
