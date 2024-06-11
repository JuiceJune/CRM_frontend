import {Calendar} from "primereact/calendar";
import {Checkbox} from 'primereact/checkbox';
import {Divider} from "primereact/divider";
import BorderlessInput from "../inputs/borderlessInput.jsx";
import {Dropdown} from 'primereact/dropdown';
import {useSelector} from "react-redux";

const CampaignSendTimePicker = (props) => {
    const {steps, handleStepInputChange, index, step} = props;
    const filteredSteps = steps.filter(s => s.step !== step.step);
    const stepsIds = filteredSteps.map(step => step.step);

    const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    const handleInputChange = (day, i, value) => {
        const updatedSendingTimeJson = JSON.parse(JSON.stringify(step.sending_time_json));
        updatedSendingTimeJson[day][i] = value;
        handleStepInputChange(index, 'sending_time_json', updatedSendingTimeJson);
    };

    const handleInputStartAfterChange = (value) => {
        const updatedStartAfter = JSON.parse(JSON.stringify(step.start_after));
        updatedStartAfter.time = value;
        handleStepInputChange(index, 'start_after', updatedStartAfter);
    };

    const handleInputSendToThreadReplyChange = (value) => {
        const updatedSendToThread = JSON.parse(JSON.stringify(step.reply_to_exist_thread));
        updatedSendToThread.reply = value;
        handleStepInputChange(index, 'reply_to_exist_thread', updatedSendToThread);
    };

    const handleInputSendToThreadChange = (value) => {
        const updatedSendToThread = JSON.parse(JSON.stringify(step.reply_to_exist_thread));
        updatedSendToThread.step = value;
        handleStepInputChange(index, 'reply_to_exist_thread', updatedSendToThread);
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
        <div className='w-full mx-2 my-3 flex flex-column justify-content-center'>
            <div className={'flex gap-4 justify-content-between flex-wrap'}>
                <div className={'w-14rem'}>
                    <h3 className='block mb-2 text-center'>Start after</h3>
                    <div className={'text-center'}>
                        <span>Follow up after:</span>
                        <BorderlessInput value={step.start_after.time}
                                         bold={false}
                                         className={'w-1 text-center'}
                                         onChange={(event) => {
                                             handleInputStartAfterChange(event.target.value)
                                         }}
                        />
                        <span> Days</span>
                    </div>
                </div>
                <div className={'w-14rem'}>
                    <h3 className='block mb-2 text-center'>Period</h3>
                    <div className={'text-center'}>
                        <span>Send every:</span>
                        <BorderlessInput value={step.period}
                                         bold={false}
                                         className={'w-3 text-center'}
                                         onChange={(event) => {
                                             handleStepInputChange(index, 'period', event.target.value)
                                         }}
                        />
                        <span> sec.</span>
                    </div>
                </div>
                <div className={'w-14rem'}>
                    <h3 className='block mb-2 text-center'>Send to thread</h3>
                    <div className={'flex gap-3'}>
                        <Checkbox className={'pt-2'}
                                  disabled={step.step === 1}
                                  onChange={event => handleInputSendToThreadReplyChange(event.checked)}
                                  checked={step.reply_to_exist_thread.reply}></Checkbox>
                        <Dropdown value={step.reply_to_exist_thread.step}
                                  disabled={step.step === 1 || !step.reply_to_exist_thread.reply}
                                  onChange={(event) => {
                                      handleInputSendToThreadChange(event.value)
                                  }}
                                  options={stepsIds}
                                  placeholder="Select a step" className="w-full md:w-14rem"/>
                    </div>
                </div>
            </div>
            <Divider/>
            <h3 className='block mb-2 text-center'>Sending Time</h3>
            <Divider/>
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
                        <td className='p-0 mr-4'>
                            <Checkbox onChange={e => handleInputChange(day, 0, e.checked)}
                                      checked={step.sending_time_json[day][0]}>
                            </Checkbox>
                        </td>
                        <td className='p-0 pt-2'>{`${day}: `}</td>
                        <td className='p-0 pt-2'>
                            <Calendar value={formatTimeToDate(step.sending_time_json[day][1])}
                                      className='max-w-5rem'
                                      onChange={(e) => handleInputChange(day, 1, formatTimeFromDate(e.target.value))}
                                      disabled={!step.sending_time_json[day][0]}
                                      timeOnly
                            />
                        </td>
                        <td className='p-0 pt-2'>
                            <Calendar value={formatTimeToDate(step.sending_time_json[day][2])}
                                      className='max-w-5rem'
                                      onChange={(e) => handleInputChange(day, 2, formatTimeFromDate(e.target.value))}
                                      disabled={!step.sending_time_json[day][0]}
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
