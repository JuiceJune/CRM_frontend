import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createUser, fetchUsers, storeUser} from "../../store/slices/userSlice.js";
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';

const AddUser = (props) => {
    // eslint-disable-next-line react/prop-types
    const { visible, setVisible } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role_id: null,
        position_id: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(createUser());
    }, []);

    const roles = useSelector(state => state.user.roles)
    const positions = useSelector(state => state.user.positions)

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            user.role_id = user.role_id.id
            user.position_id = user.position_id.id
            await dispatch(storeUser(user)).unwrap();
            await dispatch(fetchUsers());
            setUser({
                name: '',
                email: '',
                password: '',
                role_id: '',
                position_id: ''
            }); // Clear the form input
            setVisible(false);
        } catch (err) {
            setError('Failed to create user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Add new user</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button
                label="Add user"
                icon="pi pi-check"
                onClick={handleSubmit}
                loading={loading}
                autoFocus
            />
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                className="p-button-text"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: '30rem' }}
                onHide={() => setVisible(false)}
            >
                <div className="card flex flex-column justify-content-center gap-4">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name">User name</label>
                        <InputText
                            id="name"
                            value={user.name}
                            onChange={(event) => handleInputChange('name', event.target.value)}
                            placeholder="Enter user name"
                        />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name">Email</label>
                        <InputText
                            id="name"
                            value={user.email}
                            onChange={(event) => handleInputChange('email', event.target.value)}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name">Password</label>
                        <Password
                            className="w-full"
                            value={user.password}
                            onChange={(event) => handleInputChange('password', event.target.value)}
                        />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name">Role</label>
                        <Dropdown value={user.role_id}
                                  onChange={(e) => handleInputChange('role_id', e.value)}
                                  options={roles}
                                  optionLabel="title"
                                  placeholder="Select a Role"
                                  className="w-full"
                        />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name">Position</label>
                        <Dropdown value={user.position_id}
                                  onChange={(e) => handleInputChange('position_id', e.value)}
                                  options={positions}
                                  optionLabel="title"
                                  placeholder="Select a Position"
                                  className="w-full"
                        />
                    </div>
                </div>
                {error && <small className="p-error">{error}</small>}
            </Dialog>
        </div>
    );
};

export default AddUser;
