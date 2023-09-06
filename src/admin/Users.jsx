import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { deleteDoc,doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Users = () => {
const{data:usersData,loading}=useGetData('users');

    const deleteUser= async(id)=>{
      await deleteDoc(doc(db,'users',id))
      toast.success('user deleted!')
    }
  return <section>
    <Container>
        <Row>
            <Col lg='12'>
                <h4 className='fw-4'>Users</h4>
            </Col>
            <Col lg='12' className='pt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                           
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading?<h5>Loading</h5>:usersData?.map(users=>(
                                <tr key={users.uid}>
                                    <td>{users.displayName}</td>
                                    <td>{users.email}</td>
                                    <td><button className='btn btn-danger' onClick={()=>{
                                      deleteUser(users.uid)
                                    }}>Delete</button></td>
                                   
                                </tr>
                            ))

                        }

                    </tbody>

                </table>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Users 




// import React from 'react';
// import  { useEffect, useState } from 'react'
// import { db } from '../firebase.config'
// import { Container, Row, Col } from 'reactstrap';
// import useGetData from '../custom-hooks/useGetData';
// import { collection ,onSnapshot} from 'firebase/firestore';


// const Users = () => {
//   const { data: usersData } = useGetData('users');
//   const [data,setData]=useState([])
//     const collectionRef=collection(db,'users')

//     useEffect(()=>{


            // firebase firestore realtime data update
  //             const unsubscribe = onSnapshot(collectionRef,(snapshot)=>{

  //               setData(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
  //               console.log(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))

  //              } )
           
       
  //      return  unsubscribe    },[])


  // return (

  //   <section>
  //     <Container>
  //       <Row>
  //         <Col lg='12'>
  //           <h4 className='fw-4'>Users</h4>
  //         </Col>
  //         <Col lg='12' className='pt-5'>
  //           <table className='table'>
  //             <thead>
  //               <tr>
  //                 <th>Image</th>
  //                 <th>Username</th>
  //                 <th>Email</th>
  //                 <th>Action</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {usersData?.map((user) => (
  //                 <tr key={user.uid}>
  //                   <td>image</td>
                    {/* <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className='btn btn-danger'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;// import React from 'react' */}
// import { Container,Row,Col } from 'reactstrap'
// import useGetData from '../custom-hooks/useGetData'

// const Users = () => {

//     const{data:usersData,loading}=useGetData('users')
//   return <section>
//     <Container>
//         <Row>
//             <Col lg='12'>
//                 <h4 className='fw-4'>Users</h4>
//             </Col>
//             <Col lg='12' className='pt-5'>
//                 <table className='table'>
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Username</th>
//                             <th>Email</th>
//                             <th>Action</th>
                            
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             loading?<h5>Loading</h5>:usersData?.map(users=>(
//                                 <tr key={users.uid}>
//                                     <td>{users.displayName}</td>
//                                     <td>{users.email}</td>
//                                     <td><button className='btn btn-danger'>Delete</button></td>
                                   
//                                 </tr>
//                             ))

//                         }

//                     </tbody>

//                 </table>
//             </Col>
//         </Row>
//     </Container>
//   </section>
// }

// export default Users