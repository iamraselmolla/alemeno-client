import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import According from './According';
import axios from 'axios';
import { server } from './const';
import { Spinner } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../stripe/Checkout';
import { AuthContext } from '../AuthContext/AuthProvider';
import toast from 'react-hot-toast';
const stripePromise = loadStripe('pk_test_51M97QKAix5nU0JTZrubRM70QGikR7wSSdmYLQt5sYp96CcokRGKFeOuz6M4c6pt5QTyBiOoc2D2cQFNvw6QTlAv600jrUnsZNc');

const CourseDetails = () => {
    const { user } = useContext(AuthContext)
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [refetch, setRefetch] = useState(false)



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
    }, [id, refetch])

    const handleModalShow = () => {
        if (!user) {
            return toast.error("Please login First")
        }
        setShowModal(!showModal)
    }
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
                        {showModal && <div className='mb-4'>
                            <Elements stripe={stripePromise}>
                                <Checkout
                                    itemPrice={course?.Price}
                                    product_id={course?._id}
                                    setRefetch={setRefetch}
                                    refetch={refetch}
                                />
                            </Elements>
                        </div>}
                        {course?.students?.some(singleStudent => singleStudent?.studentsInfo?.email === user?.email) ? 'You already purchased this course' : <button onClick={handleModalShow} className='btn btn-outline-success  w-100 '>

                            buy Now
                        </button>}

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