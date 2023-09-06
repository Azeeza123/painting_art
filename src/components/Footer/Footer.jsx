import React from 'react';
import './footer.css'
import { Container,Row,Col,ListGroup,ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return <footer className="footer">
    <Container>
      <Row>
          <Col lg='4'>
          <div className="nav__wrapper">
          <div className="logo">
           <h1>ArtVista</h1>
          </div>
         
          </div> 
          <p className="footer__text mt-4">
          Discover captivating artworks at ArtVista. Shop a diverse collection of paintings, sculptures, and prints. Elevate your space with our exclusive creations.
          </p>
          </Col>
          <Col lg='3'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">
              Art Works
              </h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Paintings</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Digital Art</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Sculptures</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Photographs</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Collage</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Drawings</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='2'>
          <div className="footer__quick-links">
              <h4 className="quick__links-title">
                Useful Links
              </h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Privacy-policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='3'>
          <div className="footer__quick-links">
              <h4 className="quick__links-title">
                Contact
              </h4>
              <ListGroup className='footer__contact'>
                <ListGroupItem className='ps-0 border-0 d-flex
                 align-items-center gap-2'>
                 <span><i class="ri-map-pin-line"></i></span>
                 <p>60 Frant Road,Croydon  CR0 7JR</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 ps-0 border-0 d-flex
                 align-items-center gap-2'> 
                <span><i class="ri-phone-line"></i></span>
                 <p>+44 7867123150</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 ps-0 border-0 d-flex
                 align-items-center gap-2'>
                <i class="ri-mail-line"></i>
                 <p>example123@gmail.com</p>
                </ListGroupItem>
               
              </ListGroup>
            </div>
          </Col>


       
      </Row>
    </Container>
  </footer>
  
};

export default Footer;