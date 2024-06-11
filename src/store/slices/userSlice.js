import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from "../../services/axiosClient.js";
import {NotificationType, showNotification} from "./notificationsSlice.js";
import errorHandler from "../../services/errorHandler.js";

export const login = createAsyncThunk('login', async ({ email, password }) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axiosClient.post(`/login`, body, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err; // перекиньте помилку, щоб вона могла бути оброблена далі
    }
});

export const logout = createAsyncThunk('logout', async () => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/logout`, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err; // перекиньте помилку, щоб вона могла бути оброблена далі
    }
});

export const fetchUsers = createAsyncThunk('users', async () => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/users`, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err; // перекиньте помилку, щоб вона могла бути оброблена далі
    }
});

export const createUser = createAsyncThunk('create-users', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/users/create`, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        errorHandler(thunkAPI.dispatch, err);
        throw err; // перекиньте помилку, щоб вона могла бути оброблена далі
    }
});

export const storeUser = createAsyncThunk('store-users', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.post(`/users`, data, config);
        console.log(res);
        thunkAPI.dispatch(showNotification({ subject: "User created", message: res.data.name, type: NotificationType.Success }));

        return res.data;
    } catch (err) {
        console.log(err.response.data);
        errorHandler(thunkAPI.dispatch, err);
        throw err; // перекиньте помилку, щоб вона могла бути оброблена далі
    }
});

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        loading: false,
        user: localStorage.getItem('USER'),
        users: null,
        positions: null,
        roles: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user.name;
                localStorage.setItem('ACCESS_TOKEN', action.payload.token);
                localStorage.setItem('USER', action.payload.user.name);
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('USER');
                state.loading = false;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.roles = action.payload.roles;
                state.positions = action.payload.positions;
                state.loading = false;
            })
            .addCase(createUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(storeUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(storeUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
