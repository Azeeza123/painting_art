
import React, { useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { motion } from 'framer-motion';
import userIcon from '../../assets/images/user.jpg';
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav__links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout Successfully');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const navigateToCart = () => {
    navigate('/Cart');
  };

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle('show__ProfileActions');
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <h1>ArtVista</h1>
            </div>

            <div className="navigation">
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'nav__active' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>

              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div>
                      <span>{currentUser.displayName}</span>
                      <span onClick={logout}>Logout</span>
                    </div>
                  ) : (
                    <div>
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile_menu">
               <span> <i className="ri-menu-line"></i></span>
             </div>
             </div>
         </div>
       </Row>
     </Container>
   </header>
 );
};

export default Header;