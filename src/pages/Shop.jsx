import React, { useState, useEffect } from 'react';


import Helmet from '../components/Helmet/Helmet';
import '../styles/shop.css';
import { Container, Row, Col } from 'reactstrap';
import ProductList from '../components/UI/ProductList';
import useGetData from '../custom-hooks/useGetData';

const Shop = () => {
  const { data: products, loading } = useGetData('products');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [searchInput, setSearchInput] = useState(''); // State for search input

  // Function to filter products based on both category and search input
  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (filterCriteria) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === filterCriteria.toLowerCase()
      );
    }

    // Filter by search input
    if (searchInput) {
      filtered = filtered.filter(
        (product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.authorName.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const selectedCriteria = e.target.value;
    setFilterCriteria(selectedCriteria);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
  };

  useEffect(() => {
    filterProducts();
  }, [products, filterCriteria, searchInput]);

  return (
    <>
      <Helmet title='Shop' />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='3'>
              <div className='filter__widget'>
                <select onChange={handleFilterChange}>
                  <option value=''>Filter By Categories</option>
                  <option value='Oil painting'>Paintings</option>
                  <option value='DigitalArt'>Digital Art</option>
                  <option value='Sculptures'>Sculptures</option>
                  <option value='Photograph'>Photograph</option>
                  <option value='Drawings'>Drawings</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='search__box'>
                <input
                  type='text'
                  placeholder='Search...'
                  onChange={handleSearchInputChange} // Handle search input change
                />
                <span>
                  <i className='ri-search-line'></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {loading ? (
              <h1 className='text-center fs-4'>Loading...</h1>
            ) : (
              <ProductList data={filteredProducts} />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Shop;

// const Shop = () => {
//   const { data: products, loading } = useGetData('products');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState('');
//   const [searchInput, setSearchInput] = useState(''); // State for search input

//   // Function to filter products based on both category and search input
//   const filterProducts = () => {
//     let filtered = [...products];

//     // Filter by category
//     if (filterCriteria) {
//       filtered = filtered.filter(
//         (product) => product.category.toLowerCase() === filterCriteria.toLowerCase()
//       );
//     }

//     // Filter by search input
//     if (searchInput) {
//       filtered = filtered.filter(
//         (product) =>
//           product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
//           product.description.toLowerCase().includes(searchInput.toLowerCase())
//       );
//     }

//     setFilteredProducts(filtered);
//   };

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const selectedCriteria = e.target.value;
//     setFilterCriteria(selectedCriteria);
//   };

//   // Handle search input change
//   const handleSearchInputChange = (e) => {
//     const input = e.target.value;
//     setSearchInput(input);
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [products, filterCriteria, searchInput]);

//   return (
//     <>
//       <Helmet title='Shop' />
//       <section>
//         <Container>
//           <Row>
//             <Col lg='3' md='3'>
//               <div className='filter__widget'>
//                 <select onChange={handleFilterChange}>
//                   <option value=''>Filter By Categories</option>
//                   <option value='Oil painting'>Paintings</option>
//                   <option value='DigitalArt'>Digital Art</option>
//                   <option value='Sculptures'>Sculptures</option>
//                   <option value='Photograph'>Photograph</option>
//                   <option value='Drawings'>Drawings</option>
//                 </select>
//               </div>
//             </Col>
//             <Col lg='6' md='6'>
//               <div className='search__box'>
//                 <input
//                   type='text'
//                   placeholder='Search...'
//                   onChange={handleSearchInputChange} // Handle search input change
//                 />
//                 <span>
//                   <i className='ri-search-line'></i>
//                 </span>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       <section className='pt-0'>
//         <Container>
//           <Row>
//             {loading ? (
//               <h1 className='text-center fs-4'>Loading...</h1>
//             ) : (
//               <ProductList data={filteredProducts} />
//             )}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Shop;// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Helmet from '../components/Helmet/Helmet';
// import '../styles/shop.css';
// import { Container, Row, Col } from 'reactstrap';
// import ProductList from '../components/UI/ProductList';
// import useGetData from '../custom-hooks/useGetData';

// const Shop = () => {
//   const { data: products, loading } = useGetData('products');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState(''); // Initialize with an empty filter

//   // Filter products based on the selected category
//   const filterProducts = () => {
//     if (!filterCriteria) {
//       // If no category selected, show all products
//       setFilteredProducts(products);
//     } else {
//       // Filter products by category
//       const filtered = products.filter(
//         (product) => product.category.toLowerCase() === filterCriteria.toLowerCase()
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const selectedCriteria = e.target.value;
//     setFilterCriteria(selectedCriteria);
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [products, filterCriteria]);

//   return (
//     <>
//       <Helmet title='Shop' />
//       <section>
//         <Container>
//           <Row>
//             <Col lg='3' md='3'>
//               <div className='filter__widget'>
//                 <select onChange={handleFilterChange}>
//                   <option value=''>Filter By Categories</option>
//                   <option value='Oil painting'>Paintings</option>
//                   <option value='DigitalArt'>Digital Art</option>
//                   <option value='sculptures'>Sculptures</option>
//                   <option value='Photograph'>Photograph</option>
//                   <option value='drawings'>Drawings</option>
//                 </select>
//               </div>
//             </Col>
//             <Col lg='6' md='6'>
//               <div className='search__box'>
//                 <input
//                   type='text'
//                   placeholder='Search...'
//                 />
//                 <span>
//                   <i className='ri-search-line'></i>
//                 </span>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       <section className='pt-0'>
//         <Container>
//           <Row>
//             {loading ? (
//               <h1 className='text-center fs-4'>Loading...</h1>
//             ) : (
//               <ProductList data={filteredProducts} />
//             )}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Shop;// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Helmet from '../components/Helmet/Helmet';
// import '../styles/shop.css';
// import { Container, Row, Col } from 'reactstrap';
// import ProductList from '../components/UI/ProductList';
// import useGetData from '../custom-hooks/useGetData';

// const Shop = () => {
//   const { data: products, loading } = useGetData('products');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState(''); // Initialize with an empty filter

//   // Filter products based on the selected category
//   const filterProducts = () => {
//     if (!filterCriteria) {
//       // If no category selected, show all products
//       setFilteredProducts(products);
//     } else {
//       // Filter products by category
//       const filtered = products.filter(
//         (product) => product.category.toLowerCase() === filterCriteria.toLowerCase()
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const selectedCriteria = e.target.value;
//     setFilterCriteria(selectedCriteria);
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [products, filterCriteria]);

//   return (
//     <>
//       <Helmet title='Shop' />
//       <section>
//         <Container>
//           <Row>
//             <Col lg='3' md='3'>
//               <div className='filter__widget'>
//                 <select onChange={handleFilterChange}>
//                   <option value=''>Filter By Categories</option>
//                   <option value='paintings'>Paintings</option>
//                   <option value='digital-art'>Digital Art</option>
//                   <option value='sculptures'>Sculptures</option>
//                   <option value='photographs'>Photograph</option>
//                   <option value='drawings'>Drawings</option>
//                 </select>
//               </div>
//             </Col>
//             <Col lg='6' md='6'>
//               <div className='search__box'>
//                 <input
//                   type='text'
//                   placeholder='Search...'
//                   onChange={handleSearchInput}
//                 />
//                 <span>
//                   <i className='ri-search-line'></i>
//                 </span>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       <section className='pt-0'>
//         <Container>
//           <Row>
//             {loading ? (
//               <h1 className='text-center fs-4'>Loading...</h1>
//             ) : (
//               <ProductList data={filteredProducts} />
//             )}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Shop;
// import React,{useState} from 'react';
// import CommonSection from '../components/UI/CommonSection';
// import Helmet   from '../components/Helmet/Helmet';
// import { Container,Row,Col } from 'reactstrap';
// import '../styles/shop.css'
// import  products from '../assets/Data/products'

// import ProductList from '../components/UI/ProductList';
// import useGetData from '../custom-hooks/useGetData';
// const Shop = () => {

//   const[productsData,setProductsData]=useState(products)

//   const handleFilter= e=>{
//     const filterValue = e.target.value;
//     if(filterValue==='paintings'){
//       const  filteredProducts = products.filter(item=> item.category==='Oil painting');

//       setProductsData(filteredProducts);
//     }

//     if(filterValue==='digital-art'){
//       const  filteredProducts = products.filter(item=> item.category==='DigitalArt');

//       setProductsData(filteredProducts);
//     }

//     if(filterValue==='sculptures'){
//       const  filteredProducts = products.filter(item=> item.category==='Sculptures');

//       setProductsData(filteredProducts);
//     }

//     if(filterValue==='photographs'){
//       const  filteredProducts = products.filter(item=> item.category==='Photograph');

//       setProductsData(filteredProducts);
//     }
//     if(filterValue==='drawings'){
//       const  filteredProducts = products.filter(item=> item.category==='Drawings');

//       setProductsData(filteredProducts);
//     }



    

//   };

//   const handleSearch=e=>{
//     const searchTerm= e.target.value;

//     const searchedProducts= products.filter(item=>item.category
//       .toLowerCase().includes(searchTerm.toLowerCase()));
      
//       setProductsData(searchedProducts);
//   }

  
  
  
  
  
//   return<Helmet title='Shop'>

    
//     <CommonSection title='Arts'/>

    
// <section>
//       <Container>
//         <Row>
//           <Col lg='3' md='3'>
//             <div className="filter__widget">
//               <select onChange={handleFilter}>
//                 <option>Filter By Categories</option>
//                 <option value="paintings">Paintings</option>
//                 <option value="digital-art">Digital Art</option>
//                 <option value="sculptures">Sculptures</option>
//                 <option value="photographs">Photograph</option>
//                 <option value="drawings">Drawings</option>
//               </select>
//             </div>
//           </Col>
//           {/* <Col lg='3' md='3'></Col> */}
//           <Col lg='6' md='6'>
//             <div className="search__box">
//               <input type="text" placeholder='Search...' onChange={handleSearch}/>
//               <span><i class="ri-search-line"></i></span>
//             </div>
//           </Col>
          
//         </Row>
//       </Container>

//     </section>

//     <section className='pt-0'>
//       <Container>
//         <Row>
//           {
//             productsData.length=== 0? <h1 className='text-center fs-4'>No products are found</h1>
//             :<ProductList data={productsData}/>

//           }
//         </Row>
//       </Container>
//     </section>

//   </Helmet>
  
// };

// export default Shop;