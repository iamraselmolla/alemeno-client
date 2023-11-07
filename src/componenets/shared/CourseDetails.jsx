import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import According from './According';
import axios from 'axios';
import { server } from './const';
import { Spinner } from 'react-bootstrap';

const CourseDetails = () => {

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false)


    const { id } = useParams();
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const getCourse = await axios.get(`${server}/courses/${id}`);
                setCourse(getCourse?.data)
                setLoading(false)
            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        fetchData()
    }, [id])



    return (



        <div className="container py-5 mt-4">
            {!loading ? <>
                <div className="row">
                    <div className="col-md-6">
                        <h1 style={{ fontWeight: '900' }}>{course?.CourseName}</h1>
                        <img src={course?.courseThumb} alt="Course Thumbnail" className="img-fluid" />
                        <p>{course?.Description}</p>
                        <p><strong>Instructor:</strong> {course?.Instructors.Name} ({course?.Instructors.Title})</p>
                        <p><strong>Price:</strong> {course?.Price}</p>
                        <p><strong>Enrollment Status:</strong> {course?.EnrollmentStatus}</p>
                        <p><strong>Course Duration:</strong> {course?.CourseDuration}</p>
                        <p><strong>Location:</strong> {course?.Location.Building}, {course?.Location.Room}, {course?.Location.City}, {course?.Location.State}</p>
                        <p><strong>Prerequisites:</strong> {course?.Prerequisites[0]}</p>
                        <p><strong>Schedule:</strong> {course?.Schedule.Start} - {course?.Schedule.End}<br />
                            <strong>Days:</strong> {course?.Schedule.Days.join(", ")}<br />
                            <strong>Time:</strong> {course?.Schedule.Time}</p>

                        <button className='btn btn-outline-success  w-100 '>Buy Now</button>
                    </div>
                    <div className="col-md-6">
                        <h2>Syllabus</h2>
                        <div id="syllabusAccordion">
                            {course?.Syllabus.map((week, index) => (
                                <According week={week} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </> :
                <div className='d-flex justify-content-center  align-content-center '>
                    <div>
                        <Spinner />
                    </div>
                </div>}
        </div>

    );
};

export default CourseDetails;