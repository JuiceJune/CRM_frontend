import {NotificationType, showNotification} from "../store/slices/notificationsSlice.js";

const errorHandler = (dispatch, error) => {

    if(error.response?.data?.errors) {
        let array = []
        Object.keys(error.response.data.errors).forEach(errorKey => {
           array.push(error.response.data.errors[errorKey])
        })

        dispatch(showNotification({
            subject: error.response.data.message,
            message: array,
            type: NotificationType.Error
        }));
    } else {
        const message = error.response?.data?.message ?? error.response?.data?.error;

        dispatch(showNotification({
            subject: 'Error',
            message: message,
            type: NotificationType.Error
        }));
    }
};

export default errorHandler;
