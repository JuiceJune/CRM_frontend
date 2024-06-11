import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from "../../services/axiosClient.js";
import errorHandler from "../../services/errorHandler.js";
import {NotificationType, showNotification} from "./notificationsSlice.js";

export const fetchMailboxes = createAsyncThunk('mailboxes', async () => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    let url = '/mailboxes';

    try {
        const res = await axiosClient.get(url, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const fetchMailbox = createAsyncThunk('mailbox', async (id) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/mailboxes/${id}`, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const getUrlForConnect = createAsyncThunk('mailbox-connect', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.post(`/mailboxes/connect`, data, config);
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

export const updateMailbox = createAsyncThunk('update-mailbox', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.put(`/mailboxes/${data.id}`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Mailbox updated", message: res.data.name, type: NotificationType.Success }));
        console.log(res.data);
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

export const deleteMailbox = createAsyncThunk('delete-mailbox', async (id, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.delete(`/mailboxes/${id}`, config);
        thunkAPI.dispatch(showNotification({ subject: "Mailbox deleted", message: res.data.name, type: NotificationType.Success }));
        console.log(res.data);
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

const mailboxesSlice = createSlice({
    name: 'mailboxes',
    initialState: {
        loading: true,
        mailboxes: [],
        mailbox: null,
        error: null,
        url: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMailboxes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMailboxes.fulfilled, (state, action) => {
                state.mailboxs = action.payload;
                state.loading = false;
            })
            .addCase(fetchMailboxes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMailbox.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMailbox.fulfilled, (state, action) => {
                state.mailbox = action.payload;
                state.loading = false;
            })
            .addCase(fetchMailbox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUrlForConnect.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUrlForConnect.fulfilled, (state, action) => {
                state.loading = false;
                state.url = action.payload.success;
            })
            .addCase(getUrlForConnect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateMailbox.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMailbox.fulfilled, (state, action) => {
                state.mailbox = action.payload;
                state.loading = false;
            })
            .addCase(updateMailbox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteMailbox.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMailbox.fulfilled, (state, action) => {
                state.mailbox = null;
                state.loading = false;
            })
            .addCase(deleteMailbox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default mailboxesSlice.reducer;
