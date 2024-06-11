import { InputNumber } from 'primereact/inputnumber';

// eslint-disable-next-line react/prop-types
const SendLimit = ({campaign, handleInputChange}) => {

    return (
        <div className='flex flex-column gap-4'>
            <div className="flex-auto">
                <label htmlFor="sendLimit" className="font-bold block mb-2">Send per day (max)</label>
                <InputNumber inputId="sendLimit"
                             value={campaign.send_limit}
                             suffix=" emails"
                             onValueChange={(e) => {
                                 handleInputChange('send_limit', e.value)
                             }}
                />
            </div>
        </div>
    );
};

export default SendLimit;