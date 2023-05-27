import React from 'react';
import 'primeicons/primeicons.css';
import {Badge} from 'primereact/badge';
import {Password} from 'primereact/password';
import {Button} from "primereact/button";

const UserInfo = (props) => {
    const {toast, user} = props;
    const onValueCopy = (value) => {
        navigator.clipboard.writeText(value)
        toast.current.show({severity: 'success', summary: 'Value copied', detail: value, life: 3000});
    };

    return (
        <div className="card surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
            <div className="flex border-bottom-1 border-300 pb-3 pt-1">
                <img alt="Avatar" src={"../" + user.avatar} className="w-full"/>
            </div>
            <div className="flex border-bottom-1 border-300 pb-3 pt-3 justify-content-between">
                <div className="text-500">Name: {user.name}</div>
                <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                        onClick={() => onValueCopy(user.name)}/>
            </div>
            <div className="flex border-bottom-1 border-300 pb-3 pt-1 justify-content-between">
                <div className="text-600 text-base">Email: {user.email}</div>
                <Button icon="pi pi-copy" text severity="secondary" style={{padding: 0}}
                        onClick={() => onValueCopy(user.email)}/>
            </div>
            <div className="flex border-bottom-1 border-300 pb-3 pt-1">
                <div className="text-600 text-base">Position: {user.position}</div>
            </div>
            <div className="flex border-bottom-1 border-300 pb-3 pt-1">
                <div className="text-600 text-base">Location: {user.location}</div>
            </div>
            <div className="flex border-bottom-1 border-300 pb-3 pt-1">
                <div className="text-600 text-base">Birthday: {user.birthday}</div>
            </div>
            <div className="flex border-bottom-1 border-300 pb-3 pt-1">
                <div className="text-600 text-base">Start working: {user.start_date}</div>
            </div>
        </div>
    );
};

export default UserInfo;
