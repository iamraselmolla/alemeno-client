import React, { useEffect, useState } from 'react';
import Course from '../../shared/Course';
import { useDispatch, useSelector } from 'react-redux';
import { courseDataAction } from '../../redux/courseDataSlice';

const Home = () => {
    const dispatch = useDispatch();;
    const { courses } = useSelector(state => state.courseData);
    const [filteredCourses, setFilteredCourses] = useState(courses);
    useEffect(() => {
        fetch('courses.json')
            .then(res => res.json())
            .then(data => dispatch(courseDataAction.setAllCourses(data.courses)))
            .catch(err => console.log(err))
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const foundCourses = courses.filter(singleCourse => (
            singleCourse.Instructors.Name.toLowerCase().includes(searchTerm) ||
            singleCourse.CourseName.toLowerCase().includes(searchTerm)
        ));
        setFilteredCourses(foundCourses);
    }
    return (
        <section className="container py-5">
            <div className="row px-3">
                <input onChange={handleSearch} className='form-control w-100 mb-2' placeholder="Search Courses" />
            </div>
            <div className="row">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(singleCourse => (
                        <div className="col-lg-4 col-md-2 pb-1 my-2" key={singleCourse.courseName}>
                            <Course data={singleCourse} />
                        </div>
                    ))
                ) : (
                    <h2 className="font-weight-bold">No Course!</h2>
                )}
            </div>
        </section>

    );
};

export default Home;