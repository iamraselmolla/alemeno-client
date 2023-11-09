import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import Course from '../../shared/Course';
import { courseDataAction } from '../../redux/courseDataSlice';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { courses, againFetch } = useSelector(state => state.courseData);
    const [allCourses, setAllCourses] = useState([]);
    const dispatch = useDispatch()



    useEffect(() => {
        courseDataAction.setFetchAgain()
    }, [])


    useEffect(() => {
        if (courses?.length > 0) {
            const findAllCourses = courses?.filter(singleCourse => singleCourse?.students?.some(student => student?.studentsInfo?.email === user?.email));
            setAllCourses(findAllCourses);
            dispatch(courseDataAction.setFetchAgain())
        } else {

        }
    }, [againFetch, courses])



    return (
        <section>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-3 pt-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">

                            <img src="https://www.innovationcu.ca/personal/loans/education-loan/jcr:content/root/container_main/container_262016393/heroteaser.coreimg.png/1681762038871/female-student-660x700.png" width={150} height={150} className='img-fluid' alt="" />
                            <h5 style={{ fontWeight: '900' }}>
                                {user?.displayName}
                            </h5>

                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {allCourses?.map(singleCourse => <div className='col-md-6'>
                                <Course key={singleCourse?._id} data={singleCourse} />
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;