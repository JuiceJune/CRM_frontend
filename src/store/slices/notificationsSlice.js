import { createSlice } from '@reduxjs/toolkit';

export const NotificationType = {
    Success: "success",
    Info: "info",
    Warning: "warning",
    Error: "error",
    Secondary: "secondary",
    Contrast: "contrast",
};

const initialState = {
    open: false,
    subject: "",
    message: null,
    type: NotificationType.Success,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.open = true;
            state.subject = action.payload.subject;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearNotification: (state) => {
            state.open = false;
            state.message = "";
            state.subject = "";
            state.type = NotificationType.Success;
        },
    },
});

export const { showNotification, clearNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
