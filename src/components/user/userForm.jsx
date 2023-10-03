import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosClient from "../../axios-client.js";
import {InputText} from "primereact/inputText";
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';


const UserForm = (props) => {
    const {user, toast} = props
    const [loading, setLoading] = useState(false)
    const [passwords, setPasswords] = useState({
        "email": user.email,
        "current_password": "",
        "new_password": "",
        "new_password_confirmation": "",
    })
    const navigate = useNavigate()
    const send = (event) => {
        setLoading(true);
        axiosClient.post(`/profile/update-password/${user.id}`, passwords)
            .then((response) => {
                console.log(response)
                if(response.status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Password Updated', life: 3000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Password Not Updated', life: 3000 });
                }
                setLoading(false);
            })
            .catch(err => {
                if(err.response.status === 422) {
                    const errorMessages = Object.values(err.response.data.errors).flatMap(messages => messages.flat());
                    errorMessages.map( (error) => {
                        toast.current.show({ severity: 'error', summary: error, life: 4000 });
                    })
                } else {
                    toast.current.show({ severity: 'error', summary: "Error", life: 4000 });
                }
                setLoading(false);
            })
    }

    return (
        <div className="card h-full">
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="email">Email</label>
                <InputText id="email" value={user.email}/>
                <small>
                    Enter your email to reset your password.
                </small>
            </div>
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="username">Current Password</label>
                <Password toggleMask  id="username" onChange={event => setPasswords({...passwords, current_password: event.target.value})} />
                <small>
                    Enter your current password to reset your password.
                </small>
            </div>
            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="password">New Password</label>
                <Password toggleMask  id="password" onChange={event => setPasswords({...passwords, new_password: event.target.value})}/>
            </div>
            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="password">Confirm New  Password</label>
                <Password toggleMask  id="password" onChange={event => setPasswords({...passwords, new_password_confirmation: event.target.value})}/>
            </div>
            <div className="flex gap-2 mb-3 mt-4">
                <Button icon="pi pi-check" loading={loading} label="Update" onClick={send} />
                <Button loading={loading} label="Cancel" severity="danger" onClick={() => navigate(-1)} />
            </div>
        </div>
    );
};

export default UserForm;
