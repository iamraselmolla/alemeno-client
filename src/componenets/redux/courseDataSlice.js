import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courses: {},
    // againFetch: 0
}

const courseDataSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
        setAllCourses(state, action) {
            state.courses = action?.payload;
        },
        // setFetchAgain(state, action) {
        //     state.againFetch++
        // }
    }
});
export default courseDataSlice;
export const courseDataAction = courseDataSlice.actions;