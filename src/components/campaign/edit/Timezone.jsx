import {Dropdown} from 'primereact/dropdown';
import {useSelector} from "react-redux";
import { Checkbox } from "primereact/checkbox";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const Timezone = ({campaign, handleInputChange}) => {
    const timezones= useSelector(state => state.campaigns.timezones);

    const [check, setCheck] = useState(false);

    return (
        <div className="w-full flex flex-column gap-6">
            <div className='flex flex-column gap-2'>
                <label htmlFor="timezone">Timezone</label>
                <Dropdown value={campaign.timezone}
                          filter
                          inputId="timezone"
                          name="timezone"
                          onChange={(event) => {
                              handleInputChange( 'timezone', event.target.value)
                          }}
                          options={timezones}
                          placeholder="Select a timezone" className="w-full"/>
            </div>

            <div className="flex align-items-center">
                <Checkbox value='false'
                          inputId='chekbox'
                          onChange={() => setCheck(!check)} checked={check} />
                <label htmlFor="chekbox" className="ml-2">Use prospect’s timezone if available</label>
            </div>
        </div>
    );
};

export default Timezone;