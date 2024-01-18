import React from 'react';
import 'primeicons/primeicons.css';
import { Divider } from 'primereact/divider';

const CampaignStepDeliveryTime = (props) => {
    const { step } = props;

    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    return (
        <div className='pt-3'>
            <h3>Delivery Time</h3>
            <Divider />
            <div>Period: {step.period} sec.</div>
            <Divider />
            <table>
                <thead>
                <tr>
                    <th>Day</th>
                    <th>From</th>
                    <th>To</th>
                </tr>
                </thead>
                <tbody>
                {daysOfWeek.map(day => (
                    step.sending_time_json[day][0] && (
                        <tr key={day}>
                            <td>{`${day}: `}</td>
                            <td>{step.sending_time_json[day][1]}</td>
                            <td>{step.sending_time_json[day][2]}</td>
                        </tr>
                    )
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignStepDeliveryTime;
