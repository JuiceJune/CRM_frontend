import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "../navbars/Navbar.jsx";
import ToastNotification from "../notifications/ToastNotification.jsx";

const DefaultLayout = () => {
    const user = useSelector(state => state.user.user);

    if (!user) {
        return <Navigate to="/login"/>
    }

    return (
        <div id="defaultLayout">
            <ToastNotification/>
            <Navbar user={user}/>
            <main className='m-8 pb-8'>
                <Outlet/>
            </main>
        </div>
    );
};

export default DefaultLayout;
