import {Outlet, Navigate} from 'react-router-dom'
import {useSelector} from "react-redux";

const GuestLayout = () => {
    const user = useSelector(state => state.user.user);

    if(user) {
        return <Navigate to="/" />
    }

    return (
        <div className='h-full'>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
