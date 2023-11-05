import { configureStore } from "@reduxjs/toolkit";
import courseDataSlice from "./courseDataSlice";

const store = configureStore({
    reducer: {
        courseData: courseDataSlice.reducer,
    }
})


export default store;