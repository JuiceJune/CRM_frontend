import React, {useState} from 'react';
import {Calendar} from "primereact/calendar";
import {InputSwitch} from 'primereact/inputswitch';
import {Checkbox} from 'primereact/checkbox';

const CampaignSendTimePicker = (props) => {
    const {sendingTimeJson, handleStepInputChange, index} = props;

    const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    const handleInputChange = (day, i, value) => {
        const updatedSendingTimeJson = {...sendingTimeJson};
        updatedSendingTimeJson[day][i] = value;
        handleStepInputChange(index, 'sending_time_json', updatedSendingTimeJson)
    };

    const formatTimeToDate = (time) => {
        const [hours, minutes] = time.split(':');
        const currentDate = new Date();

        currentDate.setHours(Number(hours));
        currentDate.setMinutes(Number(minutes));

        return currentDate;
    }

    const formatTimeFromDate = (dateObject) => {
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    return (
        <div>
            <label htmlFor="email" className='block mb-2'>Sending Time</label>
            <table>
                <thead>
                <tr>
                    <th className='text-center'>Check</th>
                    <th className='text-center'>Day</th>
                    <th className='text-center'>From</th>
                    <th className='text-center'>To</th>
                </tr>
                </thead>
                <tbody>
                {daysOfWeek.map(day => (
                    <tr key={day} className='text-center'>
                        <td className='p-0 pt-2'>
                            <Checkbox onChange={e => handleInputChange(day, 0, e.checked)}
                                      checked={sendingTimeJson[day][0]}></Checkbox>
                        </td>
                        <td className='p-0 pt-2'>{`${day}: `}</td>
                        <td className='p-0 pt-2'>
                            <Calendar value={formatTimeToDate(sendingTimeJson[day][1])}
                                      className='max-w-5rem'
                                      onChange={(e) => handleInputChange(day, 1, formatTimeFromDate(e.target.value))}
                                      disabled={!sendingTimeJson[day][0]}
                                      timeOnly
                            />
                        </td>
                        <td className='p-0 pt-2'>
                            <Calendar value={formatTimeToDate(sendingTimeJson[day][2])}
                                      className='max-w-5rem'
                                      onChange={(e) => handleInputChange(day, 2, formatTimeFromDate(e.target.value))}
                                      disabled={!sendingTimeJson[day][0]}
                                      timeOnly
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignSendTimePicker;
