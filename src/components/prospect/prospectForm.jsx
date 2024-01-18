import React, { useState } from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputText";

const ProspectForm = (props) => {
    const {index, prospect, handleInputChange, handleRemoveProspect} = props;
    return (
        <div key={index} className="mb-4">
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="text">First Name</label>
                <InputText id="first_name"
                           name="first_name"
                           placeholder='First Name'
                           value={prospect.first_name || ""}
                           onChange={event => handleInputChange(index, event)}/>
            </div>
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="text">Last Name</label>
                <InputText id="last_name"
                           name="last_name"
                           placeholder='Last Name'
                           value={prospect.last_name || ""}
                           onChange={event => handleInputChange(index, event)}/>
            </div>
            <div className="flex flex-column gap-2 mb-4">
                <label htmlFor="text">Email</label>
                <InputText id="email"
                           name="email"
                           placeholder='Email'
                           value={prospect.email || ""}
                           onChange={event => handleInputChange(index, event)}/>
            </div>
            <Button icon="pi pi-trash" size="small" severity="danger" label="Remove" onClick={() => handleRemoveProspect(index)}/>
        </div>
    );
};

export default ProspectForm;
