import React, { useEffect, useState } from 'react';
import Course from '../shared/Course';
import { useDispatch, useSelector } from 'react-redux';
import { courseDataAction } from '../redux/courseDataSlice';

const Home = () => {
    const dispatch = useDispatch();;
    const { courses } = useSelector(state => state.courseData);
    useEffect(() => {
        fetch('courses.json')
            .then(res => res.json())
            .then(data => dispatch(courseDataAction.setAllCourses(data.courses)))
            .catch(err => console.log(err))
    }, [])
    console.log(courses)
    return (
        <section className="container py-5">
            <div className="row">
                {courses?.length > 0 ? <>
                    {courses?.map(singleCourse => (
                        <div className="col-lg-4 col-md-2 pb-1 my-2">
                            <Course key={singleCourse?.courseName} data={singleCourse} />
                        </div>
                    ))}
                </> : <>
                    <h2 className="font-weight-bold">
                        No Course available now!
                    </h2>
                </>}
            </div>
        </section>

    );
};

export default Home;