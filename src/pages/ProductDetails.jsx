import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import ProductList from '../components/UI/ProductList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState('desc');
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);

  const { id } = useParams();
  const { data: products } = useGetData('products');
  const docRef = doc(db, 'products', id);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('No product found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    getProduct();
  }, [id, docRef]);

  const { imgUrl, category, title, authorName, price, description, shortDesc } = product;

  const relatedProducts = products.filter(item => item.category === product.category);

  const submitHandler = e => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    console.log(reviewObj);
    toast.success('Review Submitted');
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({

        id: id, 
        imgUrl: imgUrl, 
      title: title, 
      authorName: authorName, 
      price: price, 
        // id,
        // image: imgUrl,
        // title: title,
        // authorName,
        // price,
      })
    );
    toast.success('Product added Successfully');
  };

  return (
    <Helmet>
      <CommonSection />
      <section className="prodet">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{title}</h2>
                <p>{category}</p>
                <p>by {authorName}</p>

                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-5 ">
                  <span className="product__price">£{price}</span>
                  <span>Category: {category && category.toUpperCase()}</span>
                </div>

                <div className="mt-3">
                  <ul className="bullet-list">
                    {shortDesc &&
                      shortDesc.split('\n').map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>

                <motion.button whileTap={{ scale: 1.2 }} className="hero-button" onClick={addToCart}>
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>
                  Description
                </h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>
                  {/* Reviews ({reviews.length}) */}
                </h6>
              </div>

              <div className="tab__content mt-5">
                {tab === 'desc' ? <p>{description}</p> : <div className="product__review">
                    <div className="review__wrapper">
                      <div className="review__form">
                        <h4>Leave Your Experience</h4>
                        <form action="" onSubmit={submitHandler}>
                          <div className="form__group">
                            <input type="text" placeholder="Enter name" ref={reviewUser} required />
                          </div>

                          <div className="form__group d-flex align-items-center gap-5">
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
                              1<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>
                              2<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
                              3<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
                              4<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
                              5<i className="ri-star-s-fill"></i>
                            </motion.span>
                          </div>

                          <div className="form__group">
                            <textarea ref={reviewMsg} rows={4} type="text" placeholder="Review Message" required />
                          </div>
                          <button type="submit" className="hero-button">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                    </div>}
              </div>
            </Col>

            <Col lg='12'>
              <h2 className='related__title'>You might also like</h2>
            </Col>
            <ProductList data={relatedProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
