import React, {useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import {InputNumber} from "primereact/inputNumber";

const CampaignStepStartAfterForm = (props) => {
    const {startAfter, setCampaign, stepIndex, handleStepInputChange} = props;
    const [startAfterType, setStartAfterType] = useState(startAfter.time_type);
    const [startAfterTime, setStartAfterTime] = useState(startAfter.time);
    const time_types = [
        { label: 'Days', value: 'days'},
        { label: 'Hours', value: 'hours' },
    ];

    const handleTypeChange = (value) => {
        setStartAfterType(value);
        handleStepInputChange(stepIndex, 'start_after', {time_type: value, time: startAfterTime})
    };

    const handleTimeChange = (value) => {
        setStartAfterTime(value);
        handleStepInputChange(stepIndex, 'start_after', {time_type: startAfterType, time: value})
    };

    return (
        <div>
            <label className='block mb-2'>Start step after</label>
            <div className="card">
                <Dropdown value={startAfterType} onChange={(e) => handleTypeChange(e.value)} options={time_types}
                          placeholder="Select type" className="max-w-12rem align-items-center" />
                <InputNumber inputId="integeronly" className="max-w-10rem align-items-center"
                             value={startAfterTime} onValueChange={(e) => handleTimeChange(e.value)} />
            </div>
        </div>
    );
}

export default CampaignStepStartAfterForm;
