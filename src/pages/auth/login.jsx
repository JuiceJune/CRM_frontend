import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../store/slices/userSlice.js";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();

    const handleAction = () => {
        dispatch(login(credentials));
    }

    const handleInputChange = (field, value) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [field]: value,
        }));
    };

    return (
        <div className="flex align-items-center justify-content-center h-full">
            <div className="surface-card p-4 shadow-2 border-round">
                <div>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3"
                               onChange={event => handleInputChange('email', event.target.value)}
                    />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" type="password" placeholder="Password" className="w-full mb-3"
                               onChange={event => handleInputChange('password', event.target.value)}
                    />

                    <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={handleAction} />
                </div>
            </div>
        </div>
    );
};

export default Login;
