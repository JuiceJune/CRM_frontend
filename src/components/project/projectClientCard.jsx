import React from 'react';
import 'primeicons/primeicons.css';
import {Avatar} from "primereact/avatar";


const ProjectClientCard = (props) => {
    const {project} = props
    if(project.client) {
        return (
            <div>
                <div className="text-500 font-medium mb-2 border-bottom-1 border-300 pb-1">
                    Client
                </div>
                <div className="flex pt-1">
                    <div className="flex">
                        <Avatar image={'../' + project.client.logo} size="large" shape="circle" />
                    </div>
                    <div className="pl-2 my-auto hidden-overflow z-5">
                        <div className="text-500">{project.client.company}</div>
                        <div className="text-600 text-base">{project.client.name}</div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProjectClientCard;
