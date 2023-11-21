import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../services/authSlice'
import postReducer from '../services/postsSlice'
import { api } from "../services/api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        posts: postReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
