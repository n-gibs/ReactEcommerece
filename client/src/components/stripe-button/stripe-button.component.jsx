import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton =({price}) => {

  const priceForStripe = price * 100;
  const pubishableKey = 'pk_test_fROgT5Pnbfg82gAZMLJ94J3E00MotuuI3R';
  const onToken = token =>{
    console.log(token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout label='PAY NOW'
    name ='Clothing Ecomm'
    billingAddress
    shippingAddress
    image='https://sendeyo.com/up/d/f3eb2117da'
    description={`Total: $${price}`}
    amount={priceForStripe}
    panelLabel = 'Pay Now'
    token= {onToken}
    stripeKey={pubishableKey}
    />
  );

};
export default StripeCheckoutButton;