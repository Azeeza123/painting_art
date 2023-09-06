import React from 'react';
import { Container,Row,Col,Form,FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/checkout.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';

const Checkout = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const handleToken = (token) => {
    // Handle the token received from Stripe here
    console.log(token);

    // Optional: Display a payment success message using toast
    toast.success('Payment successful!', {
      position: toast.POSITION.TOP_CENTER,
    });

    // You can perform further processing, like making an API request to complete the payment.
  };

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout'/>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form'>
              <Form  className='billing__form'>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Enter your name'/>

              </FormGroup>

              <FormGroup className='form__group'>
                <input type="email" placeholder='Enter your Email'/>

              </FormGroup>

              <FormGroup className='form__group'>
                <input type="number" placeholder='Phone-number'/>

              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Street Address'/>

              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='City'/>

              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Postal Code'/>

              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Country'/>

              </FormGroup>
            </Form>
              </Form>
            </Col>
            <Col lg='4'>
              <div className="checkout__cart">
                <h6>Total Qty:<span>{totalQty}</span></h6>
                <h6>Subtotal:<span>£{totalAmount}</span></h6>
                <h6>Shipping:<span>£0</span></h6>
                <h4>Estimated Total:<span>£{totalAmount}</span></h4>
              
                <StripeCheckout
                  token={handleToken}
                  stripeKey="pk_test_51NlUDQH07ohyD1oNBKOwncK6O9jf2h3YMBPXNHEz0KYzC8KV8s5MmfYfHvuuWPBQBL69Qb9RlFUpQtvfMP4knpeW00lM1fvWxY"
                  name="ArtVista"
                  description="Payment for your order"
                  amount={totalAmount * 100} // Amount in cents
                >
                  
                  <button className="hero-button">Pay with Card</button>
                </StripeCheckout>
                <button className="hero-button w-100 mt-2 "><Link to='/shop'>Continue Shopping</Link></button> 
                
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;

