import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courses: {}
}

const courseDataSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
        setAllCourses(state, action) {
            state.courses = action?.payload;
        },
    }
});
export default courseDataSlice;
export const courseDataAction = courseDataSlice.actions;