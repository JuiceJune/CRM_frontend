import { Divider } from 'primereact/divider';
import Timezone from "./Timezone.jsx";
import SendLimit from "./SendLimit.jsx";

const TimeLimits = ({campaign, handleInputChange}) => {
    return (
        <div className='flex justify-content-between'>
            <div className='w-10 mx-2 my-3'>
                <Timezone campaign={campaign} handleInputChange={handleInputChange}/>
                <Divider />
                <SendLimit campaign={campaign} handleInputChange={handleInputChange}/>
            </div>
        </div>
    );
};

export default TimeLimits;