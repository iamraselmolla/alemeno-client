import React, { useEffect, useState } from 'react';
import Course from '../../shared/Course';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../shared/const';
import { courseDataAction } from '../../redux/courseDataSlice';
import { Button } from 'react-bootstrap';

const Home = () => {
    const { courses, againFetch, allCourseCount, courseNumber } = useSelector(state => state.courseData);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [perPage, setPerPage] = useState(6);
    const [page, setPage] = useState(0);



    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${server}/all-courses?size=${perPage}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                dispatch(courseDataAction.setAllCourses(data?.allCourses));
                dispatch(courseDataAction.setCourseNumber(data?.documentCount));
            })
            .catch(err => console.log(err));
    }, [perPage, againFetch, page]);

    useEffect(() => {
        // Set the filteredCourses to courses when courses change
        setFilteredCourses(courses);
    }, [courses]);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm) {
            const foundCourses = courses?.filter(singleCourse => (
                singleCourse.Instructors.Name.toLowerCase().includes(searchTerm) ||
                singleCourse.CourseName.toLowerCase().includes(searchTerm)
            ));
            setFilteredCourses(foundCourses);
        } else {
            setFilteredCourses(courses);
        }
    }

    const handleCourseNumber = (e) => {
        if (e.target.value === 'all') {
            setPerPage(parseInt(courseNumber));
        } else {
            setPerPage(parseInt(e.target.value));
        }
    }
    const pages = courseNumber && Math.ceil(courseNumber / perPage)
    console.log(courseNumber)

    return (
        <section className="container py-5">
            <div className="row px-3">
                <div className="col-md-6">
                    <input onChange={handleSearch} className='form-control w-100 mb-2' placeholder="Search Courses" />
                </div>
                <div className="col-md-6 d-flex gap-3">
                    <select onChange={handleCourseNumber} defaultValue={6}>
                        <option disabled>Select Course</option>
                        <option value={3}>3</option>
                        <option value={6}>6</option>
                        <option value={10}>10</option>
                        <option value={courseNumber}>All</option>
                    </select>
                    <div className='d-flex gap-1'>
                        {[...Array(pages).keys()]?.map(single => <button onClick={() => setPage(single)} className='btn border-black  border-1 ' key={single}>{single}</button>)}

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className="row">
                {filteredCourses?.length > 0 ? (
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
