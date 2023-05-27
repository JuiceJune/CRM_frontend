import React from 'react';
import 'primeicons/primeicons.css';
import {Avatar} from "primereact/avatar";


const ProjectUserCard = (props) => {
    const {user, position} = props
    if(user) {
        if(user.length) {
            return (
                <div>
                    <div className="text-500 font-medium mb-2 border-bottom-1 border-300 pb-1">
                        {position}
                    </div>
                    {user.map((user, index) => {
                        return (
                            <div key={index}>
                                <div className="flex pt-1">
                                    <div className="flex">
                                        <Avatar image={'../' + user.avatar} size="large" shape="circle" />
                                    </div>
                                    <div className="pl-2 my-auto hidden-overflow z-5">
                                        <div className="text-500">{user.name}</div>
                                        <div className="text-600 text-base">{user.email}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <div className="text-500 font-medium mb-2 border-bottom-1 border-300 pb-1">
                        {position}
                    </div>
                    <div className="flex pt-1">
                        <div className="flex">
                            <img alt="Avatar" src={'../' + user.avatar} width="52"/>
                        </div>
                        <div className="pl-2 my-auto hidden-overflow z-5">
                            <div className="text-500">{user.name}</div>
                            <div className="text-600 text-base">{user.email}</div>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div>
                <div className="text-500 font-medium mb-2 border-bottom-1 border-300 pb-1">
                    {position}
                </div>
                <div className="flex pt-1 text-500">
                    Not specified
                </div>
            </div>
        )
    }
};

export default ProjectUserCard;
