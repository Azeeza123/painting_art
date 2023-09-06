import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Helmet from '../components/Helmet/Helmet';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import homeHero from '../assets/images/hero4.jpg';
import Services from '../services/Services';
import ProductList from '../components/UI/ProductList';
import useGetData from '../custom-hooks/useGetData';


const Home = () => {

  const {data:products,loading}=useGetData('products')
  
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [photographArts, setPhotographArts] = useState([]);
  const [sculpturesArts, setSculpturesArts] = useState([]);
  const[collageArts,setCollageArts]=useState([]);
  const[drawingArts,setDrawingArts]=useState([]);

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === 'Oil painting'
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === 'DigitalArt'
    );
    const filteredPhotographArts = products.filter(
      (item) => item.category === 'Photograph'
    );
    const filteredSculpturesArts = products.filter(
      (item) => item.category === 'Sculptures'
    );
    const filteredCollageArts = products.filter(
      (item) => item.category === 'Collage'

    )
    const filteredDrawingArts = products.filter(
      (item) => item.category === 'Drawings'

    )
    

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setPhotographArts(filteredPhotographArts);
    setSculpturesArts(filteredSculpturesArts);
    setCollageArts(filteredCollageArts);
    setDrawingArts(filteredDrawingArts);
  }, [products]);
 
  return (
    <>
      <Helmet title={'Home'} />
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending arts in</p>
                <h2>Make Your Home Walls More Minimalistic & Attractive</h2>
                <p>
                Welcome to ArtVista - Your Gateway to Artistic Marvels. Explore a world of exquisite masterpieces, handcrafted with passion and finesse. Unleash your creativity and adorn your life with art.
                </p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="hero-button"
                >
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trendpro">
        <Container>
          <Row>
            <Col lg="12" className="text">
              <h2 className="sectitle">Trending Products</h2>
            </Col>
            {
              loading?<h5 className='fw-bold'>Loading...</h5>:
              <ProductList data={trendingProducts} />
            }
           
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text">
              <h2 className="sectitle">Best Sales</h2>
            </Col>
            {
              loading?<h5 className='fw-bold'>Loading...</h5>:
              <ProductList data={bestSalesProducts} />
            }
            
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
             <Col lg="6" md="6">

              <div className="banner__topcontent">
                <h1 className='text-white fs-8 mb-2'>Limited-Time Offer</h1>
                <h3 className='text-white fs-5 mb-3' > Elevate Your Space with Stunning Digital Art</h3>
              </div>
             

             <motion.button whileTap={{scale:1.2}} className="buy__btn store__btn">
              <Link to='/shop'>Visit More</Link>
              </motion.button>
                
            </Col> 
            <Col lg="6" md="6"  className='text-end'>
              <img src={homeHero} alt="" />
            </Col>
          </Row>
        </Container>
      </section> 

      <section className="new__arrivals">
        <Container>
          <Row>
          <Col lg="12" className="text" mb-5>
              <h2 className="sectitle">New Arrival</h2>

            </Col>
            {
              loading?<h5 className='fw-bold'>Loading...</h5>:
              <ProductList data={photographArts} />
            }
            {
              loading?<h5 className='fw-bold'>Loading...</h5>:
              <ProductList data={sculpturesArts} />
            }
            {
              loading?<h5 className='fw-bold'>Loading...</h5>:
              <ProductList data={drawingArts} />
            }
            {
              loading?<h5 className='fw-bold'>Loading...</h5>:
              <ProductList data={collageArts} />
            }
            
            

          </Row>
        </Container>
      </section>

      
    </>
  );
};

export default Home;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import products from '../assets/Data/products';
// import Helmet from '../components/Helmet/Helmet';
// import '../styles/home.css';
// import { Container, Row, Col } from 'reactstrap';
// import homeHero from '../assets/images/hero4.jpg';
// import Services from '../services/Services';
// import ProductList from '../components/UI/ProductList';
// import useGetData from '../custom-hooks/useGetData';


// const Home = () => {
  
  
//   const [trendingProducts, setTrendingProducts] = useState([]);
//   const [bestSalesProducts, setBestSalesProducts] = useState([]);
//   const [photographArts, setPhotographArts] = useState([]);
//   const [sculpturesArts, setSculpturesArts] = useState([]);
//   const[collageArts,setCollageArts]=useState([]);
//   const[drawingArts,setDrawingArts]=useState([]);

//   useEffect(() => {
//     const filteredTrendingProducts = products.filter(
//       (item) => item.category === 'Oil painting'
//     );

//     const filteredBestSalesProducts = products.filter(
//       (item) => item.category === 'DigitalArt'
//     );
//     const filteredPhotographArts = products.filter(
//       (item) => item.category === 'Photograph'
//     );
//     const filteredSculpturesArts = products.filter(
//       (item) => item.category === 'Sculptures'
//     );
//     const filteredCollageArts = products.filter(
//       (item) => item.category === 'Collage'

//     )
//     const filteredDrawingArts = products.filter(
//       (item) => item.category === 'Drawings'

//     )
    

//     setTrendingProducts(filteredTrendingProducts);
//     setBestSalesProducts(filteredBestSalesProducts);
//     setPhotographArts(filteredPhotographArts);
//     setSculpturesArts(filteredSculpturesArts);
//     setCollageArts(filteredCollageArts);
//     setDrawingArts(filteredDrawingArts);
//   }, []);
 
//   return (
//     <>
//       <Helmet title={'Home'} />
//       <section className="hero__section">
//         <Container>
//           <Row>
//             <Col lg="6" md="6">
//               <div className="hero__content">
//                 <p className="hero__subtitle">Trending arts in</p>
//                 <h2>Make Your Home Walls More Minimalistic & Attractive</h2>
//                 <p>
//                 Welcome to ArtVista - Your Gateway to Artistic Marvels. Explore a world of exquisite masterpieces, handcrafted with passion and finesse. Unleash your creativity and adorn your life with art.
//                 </p>
//                 <motion.button
//                   whileTap={{ scale: 1.2 }}
//                   className="hero-button"
//                 >
//                   <Link to="/shop">SHOP NOW</Link>
//                 </motion.button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       <Services />

//       <section className="trendpro">
//         <Container>
//           <Row>
//             <Col lg="12" className="text">
//               <h2 className="sectitle">Trending Products</h2>
//             </Col>
//             <ProductList data={trendingProducts} />
//           </Row>
//         </Container>
//       </section>

//       <section className="best__sales">
//         <Container>
//           <Row>
//             <Col lg="12" className="text">
//               <h2 className="sectitle">Best Sales</h2>
//             </Col>
//             <ProductList data={bestSalesProducts} />
//           </Row>
//         </Container>
//       </section>

//       <section className="timer__count">
//         <Container>
//           <Row>
//              <Col lg="6" md="6">

//               <div className="banner__topcontent">
//                 <h1 className='text-white fs-8 mb-2'>Limited-Time Offer</h1>
//                 <h3 className='text-white fs-5 mb-3' > Elevate Your Space with Stunning Digital Art</h3>
//               </div>
             

//              <motion.button whileTap={{scale:1.2}} className="buy__btn store__btn">
//               <Link to='/shop'>Visit More</Link>
//               </motion.button>
                
//             </Col> 
//             <Col lg="6" md="6"  className='text-end'>
//               <img src={homeHero} alt="" />
//             </Col>
//           </Row>
//         </Container>
//       </section> 

//       <section className="new__arrivals">
//         <Container>
//           <Row>
//           <Col lg="12" className="text" mb-5>
//               <h2 className="sectitle">New Arrival</h2>

//             </Col>
//             <ProductList data={photographArts}/>
//             <ProductList data={sculpturesArts}/>
//             <ProductList data={drawingArts}/>
//             <ProductList data={collageArts}/>


//           </Row>
//         </Container>
//       </section>

      
//     </>
//   );
// };

// export default Home;
