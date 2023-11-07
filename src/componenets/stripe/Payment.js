// import React, { useEffect, useState } from 'react';
// import { useLoaderData, useParams } from 'react-router-dom';
// import Checkout from './Checkout';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(process.env.REACT_APP_Stripe_Publish_key);

// const PaymentItem = () => {
//     const { id } = useParams();
//     const [course, setCourse] = useState(null);
//     const [loading, setLoading] = useState(false)
//     useEffect(() => {
//         setLoading(true)
//         const fetchData = async () => {
//             try {
//                 const getCourse = await axios.get(`${server}/courses/${id}`);
//                 setCourse(getCourse?.data)
//                 setLoading(false)
//             }
//             catch (err) {
//                 console.log(err)
//                 setLoading(false)
//             }
//         }
//         fetchData()
//     }, [id])
//     const { CourseName, courseThumb, Description } = course;;
//     return (
//         <section>
//             <div className="container py-5">
//                 <div className="row">
//                     <div className="col-md-8">
//                         <img style={{ maxHeight: '300px' }} src={itemImage} className="img-fluid" alt="" />
//                         <h2 className='fw-bolder'>{name}</h2>
//                         <h3 className="fw-bolder theme_color">
//                             Price: {price}$
//                         </h3>
//                         <p className="fw-bold">
//                             {description}
//                         </p>
//                     </div>
//                     <div className="col-md-4">
//                         <img style={{ maxHeight: '200px' }} src={itemImage} clas="img-fluid" alt="" />
//                         <p className="fw-bolder theme_color">
//                             {name}
//                         </p>
//                         <small className='fw-bolder'>Price: {price}$</small>
//                         <h3 className="fw-bolder mb-3">
//                             Pay Now
//                         </h3>
//                         <Elements stripe={stripePromise}>
//                             <Checkout
//                                 prodcut_id={_id}
//                                 booking={price} />
//                         </Elements>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PaymentItem;