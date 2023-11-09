import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courses: {},
    againFetch: 1,
    courseNumber: 6,
    allCourseCount: 0
}

const courseDataSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
        setAllCourses(state, action) {
            state.courses = action?.payload;
        },
        setFetchAgain(state, action) {
            state.againFetch++
        },
        setCourseNumber(state, action) {
            state.courseNumber = action?.payload
        },
        setAllCourseCount(state, action) {
            state.allCourseCount = action?.payload
        }
    }
});
export default courseDataSlice;
export const courseDataAction = courseDataSlice.actions;