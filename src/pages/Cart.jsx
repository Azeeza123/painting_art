
import React, { useEffect } from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart data from Firestore when the component mounts
    const loadCartFromFirestore = async () => {
      try {
        // Replace 'exampleUserId' with the authenticated user's ID or a unique identifier
        const userId = 'exampleUserId';

        const cartDocRef = doc(db, 'carts', userId);

        const cartSnapshot = await getDoc(cartDocRef);

        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
          const loadedCartItems = cartData.cartItems || [];

          // Update the Redux store with the loaded cart items
          dispatch(cartActions.setCartItems(loadedCartItems));

          console.log('Cart data loaded from Firestore:', loadedCartItems);
        } else {
          console.log('No cart data found in Firestore');
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartFromFirestore();
  }, [dispatch]);

  const saveCartToFirestore = async (cartItems) => {
    try {
      // Replace 'exampleUserId' with the authenticated user's ID or a unique identifier
      const userId = 'exampleUserId';

      const cartDocRef = doc(db, 'carts', userId);

      // Save the cart data to Firestore
      await setDoc(cartDocRef, { cartItems });

      console.log('Cart data saved to Firestore');
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };

  const deleteProduct = (item) => {
    // Dispatch action to remove item from Redux store
    dispatch(cartActions.deleteItem(item.id));

    // Save the updated cart data to Firestore
    saveCartToFirestore(cartItems);
  };

  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {cartItems.length === 0 ? (
                <div>
                  <h2 className='fs-4 text-center'>No item added to the cart</h2>
                  <button className="hero-button w-100 mt-2">
                    <Link to='/shop'>Continue Shopping</Link>
                  </button>
                </div>
              ) : (
                <table className='table aligned'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} deleteProduct={deleteProduct} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg='3'>
              {cartItems.length > 0 && (
                <div>
                  <h6 className='d-flex align-items-center justify-content-between'>
                    Subtotal:
                    <span className='fs-4 fw-bold'>
                      £{typeof totalAmount === 'number' ? totalAmount.toFixed(2) : '0.00'}
                    </span>
                  </h6>
                  <p className='fs-6 mt-2'>Taxes and shipping will calculate in checkout</p>
                  <div>
                    <button className="hero-button w-100">
                      <Link to='/checkout'>Checkout</Link>
                    </button>
                    <button className="hero-button w-100 mt-2">
                      <Link to='/shop'>Continue Shopping</Link>
                    </button>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item, deleteProduct }) => {
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt='' />
      </td>
      <td>{item.title}</td>
      <td>£{item.price}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={() => deleteProduct(item)}
          className='ri-delete-bin-6-line'
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;// import React, { useEffect } from 'react';
// import '../styles/cart.css';
// import Helmet from '../components/Helmet/Helmet';
// import CommonSection from '../components/UI/CommonSection';
// import { Container, Row, Col } from 'reactstrap';
// import { motion } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import { cartActions } from '../redux/slices/cartSlice';
// import { Link } from 'react-router-dom';
// import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
// import { db } from '../firebase.config';

// const Cart = () => {
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Load cart data from Firestore when the component mounts
//     const loadCartFromFirestore = async () => {
//       try {
//         // Replace 'exampleUserId' with the authenticated user's ID or a unique identifier
//         const userId = 'exampleUserId';

//         const cartDocRef = doc(db, 'carts', userId);

//         const cartSnapshot = await getDoc(cartDocRef);

//         if (cartSnapshot.exists()) {
//           const cartData = cartSnapshot.data();
//           const loadedCartItems = cartData.cartItems || [];

//           // Update the Redux store with the loaded cart items
//           dispatch(cartActions.setCartItems(loadedCartItems));

//           console.log('Cart data loaded from Firestore:', loadedCartItems);
//         } else {
//           console.log('No cart data found in Firestore');
//         }
//       } catch (error) {
//         console.error('Error loading cart data:', error);
//       }
//     };

//     loadCartFromFirestore();
//   }, [dispatch]);

//   const saveCartToFirestore = async (cartItems) => {
//     try {
//       // Replace 'exampleUserId' with the authenticated user's ID or a unique identifier
//       const userId = 'exampleUserId';

//       const cartDocRef = doc(db, 'carts', userId);

//       // Save the cart data to Firestore
//       await setDoc(cartDocRef, { cartItems });

//       console.log('Cart data saved to Firestore');
//     } catch (error) {
//       console.error('Error saving cart data:', error);
//     }
//   };

//   const deleteProduct = (item) => {
//     // Dispatch action to remove item from Redux store
//     dispatch(cartActions.deleteItem(item.id));

//     // Save the updated cart data to Firestore
//     saveCartToFirestore(cartItems);
//   };

//   return (
//     <Helmet title='Cart'>
//       <CommonSection title='Shopping Cart' />
//       <section>
//         <Container>
//           <Row>
//             <Col lg='9'>
//               {cartItems.length === 0 ? (
//                 <div>
//                   <h2 className='fs-4 text-center'>No item added to the cart</h2>
//                   <button className='hero-button w-100 mt-2'>
//                     <Link to='/shop'>Continue Shopping</Link>
//                   </button>
//                 </div>
//               ) : (
//                 <table className='table aligned'>
//                   <thead>
//                     <tr>
//                       <th>Image</th>
//                       <th>Title</th>
//                       <th>Price</th>
//                       <th>Delete</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartItems.map((item) => (
//                       <Tr item={item} key={item.id} deleteProduct={deleteProduct} />
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </Col>
//             <Col lg='3'>
//               {cartItems.length > 0 && (
//                 <div>
//                   <h6 className='d-flex align-items-center justify-content-between'>
//                     Subtotal:
//                     <span className='fs-4 fw-bold'>£{(totalAmount || 0).toFixed(2)}</span>
//                   </h6>
//                   <p className='fs-6 mt-2'>Taxes and shipping will calculate in checkout</p>
//                   <div>
//                     <button className='hero-button w-100'>
//                       <Link to='/checkout'>Checkout</Link>
//                     </button>
//                     <button className='hero-button w-100 mt-2'>
//                       <Link to='/shop'>Continue Shopping</Link>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// const Tr = ({ item, deleteProduct }) => {
//   return (
//     <tr>
//       <td>
//         <img src={item.imgUrl} alt='' />
//       </td>
//       <td>{item.title}</td>
//       <td>£{item.price}</td>
//       <td>
//         <motion.i
//           whileTap={{ scale: 1.2 }}
//           onClick={() => deleteProduct(item)}
//           className='ri-delete-bin-6-line'
//         ></motion.i>
//       </td>
//     </tr>
//   );
// };

// export default Cart;// import React, { useEffect } from 'react';
// import '../styles/cart.css';
// import Helmet from '../components/Helmet/Helmet';
// import CommonSection from '../components/UI/CommonSection';
// import { Container, Row, Col } from 'reactstrap';
// import { motion } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import { cartActions } from '../redux/slices/cartSlice';
// import { Link } from 'react-router-dom';
// import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
// import { db} from '../firebase.config';

// const Cart = () => {
//   const cartItems = useSelector(state => state.cart.cartItems);
//   const totalAmount = useSelector(state => state.cart.totalAmount);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Load cart data from Firestore when the component mounts
//     const loadCartFromFirestore = async () => {
//       try {
//         // Replace 'exampleUserId' with the authenticated user's ID or a unique identifier
//         const userId = 'exampleUserId';

//         const cartDocRef = doc(db, 'carts', userId);

//         const cartSnapshot = await getDoc(cartDocRef);

//         if (cartSnapshot.exists()) {
//           const cartData = cartSnapshot.data();
//           const loadedCartItems = cartData.cartItems || [];

//           // Update the Redux store with the loaded cart items
//           dispatch(cartActions.setCartItems(loadedCartItems));

//           console.log('Cart data loaded from Firestore:', loadedCartItems);
//         } else {
//           console.log('No cart data found in Firestore');
//         }
//       } catch (error) {
//         console.error('Error loading cart data:', error);
//       }
//     };

//     loadCartFromFirestore();
//   }, [dispatch]);

//   const saveCartToFirestore = async (cartItems) => {
//     try {
//       // Replace 'exampleUserId' with the authenticated user's ID or a unique identifier
//       const userId = 'exampleUserId';

//       const cartDocRef = doc(db, 'carts', userId);

//       // Save the cart data to Firestore
//       await setDoc(cartDocRef, { cartItems });

//       console.log('Cart data saved to Firestore');
//     } catch (error) {
//       console.error('Error saving cart data:', error);
//     }
//   };

//   const deleteProduct = (item) => {
//     // Dispatch action to remove item from Redux store
//     dispatch(cartActions.deleteItem(item.id));

//     // Save the updated cart data to Firestore
//     saveCartToFirestore(cartItems);
//   };

//   return (
//     <Helmet title='Cart'>
//       <CommonSection title='Shopping Cart' />
//       <section>
//         <Container>
//           <Row>
//             <Col lg='9'>
//               {cartItems.length === 0 ? (
//                 <div>
//                   <h2 className='fs-4 text-center'>No item added to the cart</h2>
//                   <button className="hero-button w-100 mt-2">
//                     <Link to='/shop'>Continue Shopping</Link>
//                   </button>
//                 </div>
//               ) : (
//                 <table className='table aligned'>
//                   <thead>
//                     <tr>
//                       <th>Image</th>
//                       <th>Title</th>
//                       <th>Price</th>
//                       <th>Delete</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartItems.map((item) => (
//                       <Tr item={item} key={item.id} deleteProduct={deleteProduct} />
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </Col>
//             <Col lg='3'>
//               {cartItems.length > 0 && (
//                 <div>
//                   <h6 className='d-flex align-items-center justify-content-between'>
//                     Subtotal:
//                     <span className='fs-4 fw-bold'>£{totalAmount.toFixed(2)}</span>
//                   </h6>
//                   <p className='fs-6 mt-2'>Taxes and shipping will calculate in checkout</p>
//                   <div>
//                     <button className="hero-button w-100">
//                       <Link to='/checkout'>Checkout</Link>
//                     </button>
//                     <button className="hero-button w-100 mt-2">
//                       <Link to='/shop'>Continue Shopping</Link>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// const Tr = ({ item, deleteProduct }) => {
//   return (
//     <tr>
//       <td>
//         <img src={item.imgUrl} alt='' />
//       </td>
//       <td>{item.title}</td>
//       <td>£{item.price}</td>
//       <td>
//         <motion.i
//           whileTap={{ scale: 1.2 }}
//           onClick={() => deleteProduct(item)}
//           className='ri-delete-bin-6-line'
//         ></motion.i>
//       </td>
//     </tr>
//   );
// };

// export default Cart;
// import React from 'react';
// import '../styles/cart.css';
// import Helmet from '../components/Helmet/Helmet';
// import CommonSection from '../components/UI/CommonSection';
// import { Container, Row, Col } from 'reactstrap';
// import { motion } from 'framer-motion';

// import { useDispatch, useSelector } from 'react-redux';
// import { cartActions } from '../redux/slices/cartSlice';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//   const cartItems = useSelector(state => state.cart.cartItems); // Fixed cartItems path
//   const totalAmount= useSelector(state=>state.cart.totalAmount);

//   return (
//     <Helmet title='Cart'>
//       <CommonSection title='Shopping Cart' />
//       <section>
//         <Container>
//           <Row>
//             <Col lg='9'>
//               {cartItems.length === 0 ? (
//                 <h2 className='fs-4 text-center'>No item added to the cart</h2>
//               ) : (
//                 <table className='table aligned'>
//                   <thead>
//                     <tr>
//                       <th>Image</th>
//                       <th>Title</th>
//                       <th>Price</th>
//                       <th>Delete</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                    {cartItems.map((item,index)=>(
//                     <Tr item={item} key={index}/>
                    
//                     ))
                  
//                    }

                    
//                   </tbody>
//                 </table>
//               )}
//             </Col>
//             <Col lg='3'>

//               <div>
//                 <h6 className='d-flex align-items-center justify-content-between'>
//                   Subtotal:
//                   <span className='fs-4 fw-bold'>£{totalAmount}</span>
//                 </h6>
               
//               </div>
//               <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
//               <div>
//               <button className="hero-button w-100 "><Link to='/checkout'>Check out</Link></button>
//                 <button className="hero-button w-100 mt-2 "><Link to='/shop'>Continue Shopping</Link></button>
                
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// const Tr=({item})=>{

//   const dispatch = useDispatch()

//   const deleteProducts= ()=>{
//     dispatch(cartActions.deleteItem(item.id))
//   }
//   return<tr >
//   <td>
//     <img src={item.imgUrl} alt='' />
//   </td>
//   <td>{item.title}</td>
//   <td>£{item.price}</td>
//   <td>
//     <motion.i
//     whileTap={{scale:1.2}}
//     onClick={deleteProducts}
//      className='ri-delete-bin-6-line'></motion.i>
//   </td>
// </tr>
// }
// export default Cart;

