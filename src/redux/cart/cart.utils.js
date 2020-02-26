export const addItemToCart = (cartItems, newCartItem) => {

  const existingCart = cartItems.find(
    cartItem => cartItem.id === newCartItem.id);

    //if true then update quantity
    if(existingCart){
      return cartItems.map(cartItem => 
        cartItem.id === newCartItem.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }

  return [...cartItems, {...newCartItem, quantity: 1}]

  }