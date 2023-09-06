import React, { useState } from 'react';
import { Container, Col, Row, Form, FormGroup } from 'reactstrap';
import { db, storage } from '../firebase.config';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterAuthorName, setAuthorName] = useState('');
  const [enterShortDes, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      // Create a Firestore collection reference
      const docRef = collection(db, 'products');

      // Create a Storage reference for the image
      const storageRef = ref(storage,`productImages/${Date.now() + enterProductImg.name}`);

      // Upload the image to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      // Listen for state changes, errors, and completion of the upload
      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Error uploading image:', error);
          toast.error('Error uploading image');
        },
        () => {
          // Image upload is complete, get its download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              // Add product data to Firestore
              await addDoc(docRef, {
                title: enterTitle,
                authorName: enterAuthorName,
                ShortDes: enterShortDes,
                description: enterDescription,
                category: enterCategory,
                price: enterPrice,
                imgUrl: downloadURL,
              });

              toast.success('Product added successfully');
              navigate('/dashboard/all-products');
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
              toast.error('Error getting download URL');
            });
        }
      );
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    }
  };

  return (
    <section className='admincart'>
      <Container>
        <Row>
          <Col lg='12'>
            <h4 className='mb-5'>Add Products</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className='form__group'>
                <span>Product Title</span>
                <input
                  type="text"
                  placeholder=''
                  value={enterTitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>Author Name</span>
                <input
                  type="text"
                  placeholder=''
                  value={enterAuthorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className='form__group'>
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder='lorem...'
                  value={enterShortDes}
                  onChange={(e) => setEnterShortDesc(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className='form__group'>
                <span>Description</span>
                <input
                  type="text"
                  placeholder='Description...'
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                  required
                />
              </FormGroup>

              <div className='d-flex align-items-center justify-content-between gap-5'>
                <FormGroup className='form__group w-50'>
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder='£100'
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className='form__group w-50'>
                  <span>Category</span>
                  <select
                    className='w-100 p-2'
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    required
                  >
                    <option>Select Category</option>
                    <option value="Oil painting">Oil painting</option>
                    <option value="DigitalArt">Digital Art</option>
                    <option value="Sculptures">Sculptures</option>
                    <option value="Collage">collages</option>
                    <option value="Photograph">Photograph</option>
                    <option value="Drawings">Drawing</option>
                  </select>
                </FormGroup>
              </div>

              <FormGroup className='form__group'>
                <span>Product Image</span>
                <input
                  type="file"
                  onChange={(e) => setEnterProductImg(e.target.files[0])}
                />
              </FormGroup>

              <button className="hero-button" type='submit'>
                Add Product
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
// import React, { useState } from 'react';
// import { Container, Col, Row, Form, FormGroup } from 'reactstrap';
// import { db, storage } from '../firebase.config';
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import { collection, addDoc } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const AddProducts = () => {
//   const [enterTitle, setEnterTitle] = useState('');
//   const [enterAuthorName, setAuthorName] = useState('');
  
//   const [enterShortDes, setEnterShortDesc] = useState('');
//   const [enterDescription, setEnterDescription] = useState('');
//   const [enterCategory, setEnterCategory] = useState('');
//   const [enterPrice, setEnterPrice] = useState('');
//   const [enterProductImg, setEnterProductImg] = useState(null);
//   const[loading,setLoading]=useState(false)

 
//   const addProduct = async e => {
//     e.preventDefault();

    
//     try{
//       const docRef = await collection(db, 'products')

//       const storageRef = ref(storage,`productImages/${Date.now() + enterProductImg.name}`);
//       const uploadTask=uploadBytesResumable(storageRef,enterProductImg)

//       uploadTask.on(()=>{
//         toast.error('images not uploaded')
//       },()=>{
//         getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
//           await addDoc(docRef,{
//             title: enterTitle,
//             authorName:enterAuthorName,
            
//             ShortDes: enterShortDes,
//             description: enterDescription,
//             category: enterCategory,
//             price: enterPrice,
//             imgUrl:downloadURL,
//         })

//       })
//       toast.success('product added successfully')
//     })

         
//       }catch(error){

//       }
    
   
//    };

// return (
//     <section className='admincart'>
//       <Container>
//         <Row>
//           <Col lg='12'>
//             <h4 className='mb-5'>Add Products</h4>
//             <Form onSubmit={addProduct}>
//             <FormGroup className='form__group'>
//               <span>product title</span>
//               <input
//                 type="text"
//                 placeholder=''
//                 value={enterTitle}
//                 onChange={e => setEnterTitle(e.target.value)}
//                 required
//               />
//             </FormGroup>
//             <FormGroup className='form__group'>
//               <span>Author Name</span>
//               <input
//                 type="text"
//                 placeholder=''
//                 value={enterAuthorName}
//                 onChange={e => setAuthorName(e.target.value)}
//                 required
//               />
//             </FormGroup>

            

//             <FormGroup className='form__group'>
//               <span>Short Description</span>
//               <input
//                 type="text"
//                 placeholder='lorem...'
//                 value={enterShortDes}
//                 onChange={e => setEnterShortDesc(e.target.value)}
//                 required
//               />
//             </FormGroup>

//             <FormGroup className='form__group'>
//               <span> Description</span>
//               <input
//                 type="text"
//                 placeholder='Description...'
//                 value={enterDescription}
//                 onChange={e => setEnterDescription(e.target.value)}
//                 required
//               />
//             </FormGroup>

//             <div className='d-flex align-items-center justify-content-between gap-5'>
//               <FormGroup className='form__group w-50'>
//                 <span> Price</span>
//                 <input
//                   type="number"
//                   placeholder='£100'
//                   value={enterPrice}
//                   onChange={e => setEnterPrice(e.target.value)}
//                   required
//                 />
//               </FormGroup>

//               <FormGroup className='form__group w-50'>
//                 <span> Category</span>
//                 <select
//                   className='w-100 p-2'
//                   value={enterCategory}
//                   onChange={e => setEnterCategory(e.target.value)}
//                   required
//                 >
//                   <option value="Oil painting">oil painting</option>
//                   <option value="DigitalArt">Digital Art</option>
//                   <option value="sculptures">Sculptures</option>
//                   <option value="photograph">Photograph</option>
//                   <option value="drawing">Drawing</option>
//                 </select>
//               </FormGroup>
//               </div>
//               <FormGroup className='form__group'>
//                 <span>Product Image</span>
//                 <input
//                   type="file"
//                   onChange={e => setEnterProductImg(e.target.files[0])}
//                 />
//               </FormGroup>
           
//             <button className="hero-button" type='submit'>
//               Add product
//             </button>
//           </Form>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default AddProducts;
