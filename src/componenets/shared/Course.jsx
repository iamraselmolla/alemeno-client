import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ data }) => {
    const { courseThumb, CourseName, CourseDuration, Instructors, Price } = data
    return (
        <div className='shadow-lg py-2 pb-4 px-1'>
            <img className='course-image' height="150" src={courseThumb} alt="" srcSet="" />
            <div className="px-2 mt-3">
                <div className="d-flex justify-content-between">
                    <h5 style={{ fontWeight: '900' }} className='mt-2 bg-dark bg-info d-inline-block font-weight-bold mt-2 px-2 py-1 rounded text-white'>
                        {Price}
                    </h5>
                </div>
                <Link className='text-decoration-none' to={`courses/${CourseName}`}><h5 style={{ fontWeight: '900' }} className='mt-2 '>
                    {CourseName}
                </h5></Link>
            </div>
            <div className="d-flex">
                <div className='d-flex gap-2 mt-3 align-content-center'>
                    <img width={40} height={40} className='rounded-circle' src="https://img-c.udemycdn.com/user/200_H/7799204_2091_5.jpg" alt="" />
                    <div className="author_info">
                        <div className="d-flex flex-column">
                            <h6 style={{ fontWeight: '900' }} className="mb-0">
                                {Instructors?.Name}
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
        </div>
    );
};

export default Course;