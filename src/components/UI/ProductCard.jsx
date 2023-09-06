
 import React from 'react';
 import { motion } from 'framer-motion';
 import '../../styles/product-section.css'
 import { Col } from 'reactstrap';
 import { Link } from 'react-router-dom';
 import {toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';

const ProductCard = ({ item }) => {

  const dispatch= useDispatch()
 const addToCart = () => {
   dispatch(
       cartActions.addItem({
         id: item.id,
         authorName: item.authorName,
         title: item.title,

         price: item.price,
         imgUrl: item.imgUrl,
       })
     );
     toast.success('Product added successfully');
   };
   return (
     <Col lg='3' md='4'>
       <div className="product__item">
         <div className="product__img">
           <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
         </div>

          <div className='p-2 product_info'>
           <h3 className='product__name'><Link to={`/shop/${item.id}`}>by {item.authorName}</Link></h3>
           <span>{item.category}</span>
         </div> 

        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
           <span className="price">£{item.price}</span>
           <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
             <span>
               <i className="ri-add-fill"></i>
             </span>
           </motion.span>
         </div>
       </div>
     </Col>
  );
 };
export default ProductCard;




