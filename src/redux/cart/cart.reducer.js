
import CartActionTypes from './cart.types';
import {addItemToCart, removeItem } from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){

    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        //add items already in cart then new item to the end of the array from the payload
        cartItems: addItemToCart(state.cartItems, action.payload)
      };

    case CartActionTypes.REMOVE_ITEM:
      return{
        ...state,
        cartItems: removeItem(state.cartItems, action.payload)
      };

    case CartActionTypes.REMOVE_ITEM_FROM_CART:

      return {
        ...state, //filter returns true or false
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id 
        )
      };
    case CartActionTypes.CLEAR_CART:
      return{
        ...state,
        cartItems: []
      };
    
    default:
      return state;
  }
};

export default cartReducer;