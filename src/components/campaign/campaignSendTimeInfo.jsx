import React from 'react';
import 'primeicons/primeicons.css';
import { Checkbox } from 'primereact/checkbox';

const CampaignSendTimeInfo = (props) => {
    const {sendTime} = props;
    const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    return (
        <div className='surface-0 shadow-1 p-3 border-1 border-50 border-round h-full mb-3'>
            <label htmlFor="email" className='block mb-2'>Sending Time</label>
            {
                daysOfWeek.map((day) => (
                    <div key={day} className='col-12 flex w-100 justify-content-around align-content-center'>
                        <div className='flex align-items-center justify-content-center'>
                            <Checkbox checked={sendTime[day][0]} disabled></Checkbox>
                        </div>
                        <div className='flex align-items-center justify-content-center'>{day}</div>
                        <div className='flex align-items-center justify-content-center gap-3'>
                            {sendTime[day][1]} - {(sendTime[day][2])}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CampaignSendTimeInfo;
