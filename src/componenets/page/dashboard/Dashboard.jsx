import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 pt-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div>
                                <img src="https://www.innovationcu.ca/personal/loans/education-loan/jcr:content/root/container_main/container_262016393/heroteaser.coreimg.png/1681762038871/female-student-660x700.png" width={150} height={150} className='img-fluid' alt="" />
                                <h3 style={{ fontWeight: '900' }}>
                                    {user?.displayName}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;