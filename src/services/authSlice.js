import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
    token: localStorage.getItem('token') || null
}

// create auth state and setToken methods
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload
            localStorage.setItem('token', payload)
        },
        logout: (state) => {
            state.token = null
            localStorage.removeItem('token')
        }
    }
})

// ADD ENDPOINT METHODS TO API
export const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        }),
    })
})

export const { setToken, logout } = authSlice.actions
export const getToken = state => state.auth.token

export const {
    useLoginMutation,
    useSignupMutation
} = extendedApiSlice

export default authSlice.reducer