import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useSelector, useDispatch } from 'react-redux';
import {clearNotification} from "../../store/slices/notificationsSlice.js";
import {isArray} from "chart.js/helpers";

export default function ToastNotification() {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications);

    useEffect(() => {
        if (notifications.open && !isArray(notifications.message)) {
            toast.current.show({
                severity: notifications.type,
                summary: notifications.subject,
                detail: notifications.message,
                life: 3000,
            });
            dispatch(clearNotification());
        }

        if (notifications.open && isArray(notifications.message)) {
            toast.current.show({
                severity: notifications.type,
                life: 3000,
                content: () => (
                    <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
                        <h3>{notifications.subject}</h3>
                        <div className={'flex flex-column gap-1 mt-2'}>
                            {notifications.message.map(message => (
                                <div key={message}>
                                    {message}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            });
            dispatch(clearNotification());
        }
    }, [notifications, dispatch]);

    return (
        <div className="card flex justify-content-center z-5">
            <Toast ref={toast} />
        </div>
    );
}

