

import React, { useState } from 'react';

import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

import { auth } from '../firebase.config';
import { db } from '../firebase.config';

import { toast } from 'react-toastify';
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: username,
      });

      // Store userdata in a Firestore database
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: username,
        email,
      });

      setLoading(false)
      toast.success ('Account Created')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong');
    }
  };

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>

            {
              loading?<Col lg='12' className='text-center'><h5
              className='fw-bold'>Loading....</h5></Col>:<Col lg='6' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Signup</h3>
              <Form className='auth__form' onSubmit={signup}>
                <FormGroup className='form__group'>
                  <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <button type='submit' className='hero-button auth__btn'>
                  Create an Account
                </button>
                <p>
                  Already have an account?<Link to='/login'>Login</Link>
                </p>
              </Form>
            </Col>
            }
            
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Helmet from '../components/Helmet/Helmet';
// import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
// import { setDoc,doc, Firestore } from 'firebase/firestore';


// import { auth } from '../firebase.config';
// import { storage } from '../firebase.config';
// import { db } from '../firebase.config';

// import { toast } from 'react-toastify';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
  



//   const signup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//        const userCredential = await createUserWithEmailAndPassword(
//         auth,
//          email, 
//          password
//          );
//          const user = userCredential.user;

//          const StorageRef=ref(storage,'images/${Data.now()+username}')
//          const uploadTask=uploadBytesResumable(StorageRef,file)

//          uploadTask.on((error)=>{
//           toast.error(error.message)
//          },
//          ()=>{
//           getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{

//             // update user profile
//             await updateProfile(user,{
//               displayName:username,
//               photoURL:downloadURL,
//             });

//             // store userdata in a Firestore database

//             await setDoc(doc(db,'users',user.uid),{
//               uid:user.uid,
//               displayName:username,
//               email,
//               photoURL:downloadURL,
//             })



//           });
//          }
//          );

     
//       console.log(user);

//        }catch(error){

//         toast.error('something went wrong')

//        }
      
//      };

//   return (
//     <Helmet title='Signup'>
//       <section>
//         <Container>
//           <Row>
//             <Col lg='6' className='m-auto text-center'>
//               <h3 className='fw-bold mb-4'>Signup</h3>
//               <Form className='auth__form' onSubmit={signup}>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='text'
//                     placeholder='Username'
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </FormGroup>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='email'
//                     placeholder='Enter your email'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </FormGroup>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='password'
//                     placeholder='Enter your password'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </FormGroup>
//                 <button type='submit' className='hero-button auth__btn'>
//                   Create an Account
//                 </button>
//                 <p>
//                   Already have an account?<Link to='/login'>Login</Link>
//                 </p>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Signup;// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import Helmet from '../components/Helmet/Helmet';
// import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import '../styles/login.css';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from '../firebase.config';
// import { toast } from 'react-toastify';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const navigate = useNavigate(); // Initialize useNavigate

//   const signup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//       const user = userCredential.user;
//       console.log(user);

//       // Update user's profile with the provided usernamen
//       await updateProfile(user, {
//         displayName: username,
//       });

//       setLoading(false);
//       toast.success('Account created successfully');

//       // Navigate to the login page
//       navigate('/login');
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <Helmet title='Signup'>

//       {/* ... rest of your component */}

//       <section>
//        <Container>
//          <Row>
//            <Col lg='6' className='m-auto text-center'>
//              <h3 className='fw-bold mb-4'>Signup</h3>
//             <Form className='auth__form' onSubmit={signup}>
//               <FormGroup className='form__group'>
//                  <input
//                     type='text'
//                     placeholder='Username'
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </FormGroup>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='email'
//                     placeholder='Enter your email'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </FormGroup>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='password'
//                     placeholder='Enter your password'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </FormGroup>
//                 <button type='submit' className='hero-button auth__btn'>
//                   Create an Account
//                 </button>
//                 <p>
//                   Already have an account?<Link to='/login'>Login</Link>
//                 </p>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Signup;// import React, { useState } from 'react';
// import Helmet from '../components/Helmet/Helmet';
// import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import '../styles/login.css';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from '../firebase.config';
// import { toast } from 'react-toastify';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const signup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//       const user = userCredential.user;
//       console.log(user);

//       // Update user's profile with the provided username
//       await updateProfile(user, {
//         displayName: username,
//       });

//       setLoading(false);
//       toast.success('Account created successfully');
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <Helmet title='Signup'>
//       <section>
//         <Container>
//           <Row>
//             <Col lg='6' className='m-auto text-center'>
//               <h3 className='fw-bold mb-4'>Signup</h3>
//               <Form className='auth__form' onSubmit={signup}>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='text'
//                     placeholder='Username'
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </FormGroup>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='email'
//                     placeholder='Enter your email'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </FormGroup>
//                 <FormGroup className='form__group'>
//                   <input
//                     type='password'
//                     placeholder='Enter your password'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </FormGroup>
//                 <button type='submit' className='hero-button auth__btn'>
//                   Create an Account
//                 </button>
//                 <p>
//                   Already have an account?<Link to='/login'>Login</Link>
//                 </p>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Signup;// import React,{useState} from 'react';
// import Helmet from '../components/Helmet/Helmet';
// import { Container,Row,Col,Form,FormGroup } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import '../styles/login.css'
// import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
// import { setDoc,doc } from 'firebase/firestore';
// import { auth } from '../firebase.config';
// import { ref} from 'firebase/storage';
// import { storage } from '../firebase.config';
// import { db } from '../firebase.config';

// import {toast} from 'react-toastify';

// const Signup = () => {

//   const [username,setUsername] = useState('');
//   const [email,setEmail] = useState('');
//   const [password,setPassword] = useState('');
//   const [loading,setLoading]= useState(false)

//   const signup = async(e)=>{
//     e.preventDefault()
//     setLoading(true)

//     try{
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//         );

       



//       const user = userCredential.user;
//       console.log(user);
//      }catch(error){
      
//      }
//   };
//   return <Helmet title='Signup'>
//     <section>
//       <Container>
//         <Row>
//           <Col lg='6' className='m-auto text-center'>
//             <h3 className='fw-bold mb-4'>Signup</h3>
//             <Form className='auth__form' onSubmit={signup}>

//             <FormGroup className='form__group'>
//             <input type="text" placeholder='Username'  value={username} onChange={e=>setUsername(e.target.value)}/>
//             </FormGroup>
//               <FormGroup className='form__group'>
//                 <input type="email" placeholder='Enter your email'  value={email} onChange={e=>setEmail(e.target.value)}/>

//               </FormGroup>
//               <FormGroup className='form__group'>
//                 <input type="password" placeholder='Enter your password'value={password} onChange={e=>setPassword(e.target.value)} />
//               </FormGroup>
        
//             <button  type='submit'className="hero-button auth__btn">Create an Account</button>
//             <p>Already have  an account?<Link to='/login'>Login</Link> </p>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </section>

//   </Helmet>
  
// };

// export default Signup;