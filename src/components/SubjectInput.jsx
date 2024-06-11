import { InputText } from 'primereact/inputtext';

const SubjectInput = ({value, onChange}) => {
    return (
        <div className="w-full">
            <label htmlFor="subject">Subject</label>
            <InputText
                value={value}
                id="subject"
                onChange={onChange}
                className={'w-full mt-2'}
            />
        </div>
    );
};

export default SubjectInput;