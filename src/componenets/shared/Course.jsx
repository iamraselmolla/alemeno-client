import React, { useContext } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';

const Course = ({ data }) => {
    const {user} = useContext(AuthContext)
    const { courseThumb, CourseName, Schedule, CourseDuration,students, Instructors, Price, _id } = data;
    const currentPath = window.location.pathname;
    const findStudents = students?.find(singleStudent => singleStudent?.studentsInfo?.email === user?.email);


    const handleCompleted = (id) => {
        
    }
 

    return (
        <div className='shadow-lg rounded-bottom py-2 pb-4 px-1'>
            <img className='course-image' height="150" src={courseThumb} alt="" srcSet="" />
            <div className="px-2 mt-3">
                <div className="d-flex justify-content-between">
                    <h5 style={{ fontWeight: '900' }} className='mt-2 bg-dark bg-info d-inline-block font-weight-bold mt-2 px-2 py-1 rounded text-white'>
                        {Price}
                    </h5>
                </div>
                <Link className='text-decoration-none' to={`/courses/${_id}`}><h5 style={{ fontWeight: '900' }} className='mt-2 '>
                    {CourseName}
                </h5></Link>
            </div>
            <div className="d-flex">
                <div className='d-flex gap-2 mt-3 align-content-center'>
                    <img width={40} height={40} className='rounded-circle' src="https://img-c.udemycdn.com/user/200_H/7799204_2091_5.jpg" alt="" />
                    <div className="author_info">
                        <div className="d-flex flex-column">
                            <h6 style={{ fontWeight: '900' }} className="mb-0">
                                {Instructors?.Name && Instructors?.Name}
                            </h6>
                            <p className="mb-0">
                                {Instructors?.Title}
                            </p>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            {currentPath == '/dashboard' && <div className='mt-4'>
                <div><ProgressBar variant="success" now={findStudents?.progress + 10} /></div>
                <div className='d-flex justify-content-between mt-2 align-content-center'>
                    <div style={{ fontWeight: '900' }} className="text-danger d-flex align-content-center">
                       <p className="mb-0">
                       Due At: {Schedule?.End}
                       </p>
                    </div>
                    <button onClick={() => handleCompleted(_id)} className='bg-success text-white px-3 py-2 rounded-1 border-0'>
                        marked as complete
                    </button>
                </div>
            </div>}

        </div>
    );
};

export default Course;