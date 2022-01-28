import { FC, ReactNode, useReducer } from "react";
import { CartItemI } from "../components/Cart/Cart";
import CartContext from "./cart-context";

type CartActionsTypes = 
| {type: 'ADD_ITEM', payload: CartItemI}
| {type: 'REMOVE_ITEM', payload: string}
| {type: 'CLEAR_CART'};

interface CartStateType {
   cartItems: CartItemI[],
   total: number
}

const cartReducer = (state: CartStateType, action: CartActionsTypes) => {
   let inx, newTotal: number;
   let newCartItems: CartItemI[] = [...state.cartItems];
   
   switch (action.type) {

      case 'ADD_ITEM': 
         inx = state.cartItems.findIndex(item => item.id === action.payload.id);
         if (inx !== -1) {
               // newCartItems[inx].amount = state.cartItems[inx].amount + action.payload.amount; // Works incorrect!!!
               newCartItems[inx] = {...state.cartItems[inx], amount: state.cartItems[inx].amount + action.payload.amount};
         } else { newCartItems = [action.payload, ...state.cartItems]; }
         newTotal = newCartItems.reduce((sum, item) => sum + item.amount*item.price, 0);
         return {...state, cartItems: newCartItems, total: newTotal}; 

      case 'REMOVE_ITEM': 
         inx = state.cartItems.findIndex(item => item.id === action.payload);
         if (inx === -1) return state;      
         if (state.cartItems[inx].amount > 1) {
            newCartItems[inx] = {...state.cartItems[inx], amount: state.cartItems[inx].amount - 1};
         } else {
            newCartItems = state.cartItems.filter(item => item.id !== action.payload);
         } 
         newTotal = state.total - state.cartItems[inx].price;
         return {...state, cartItems: newCartItems, total: newTotal}; 
      case 'CLEAR_CART': 
         return defaultCartState;
      default: return state
   }
} 

const defaultCartState: CartStateType = {cartItems: [], total: 0};

interface CartContextProviderProps {
   children: ReactNode
}

const CartContextProvider: FC<CartContextProviderProps> = ({children}): JSX.Element => {
   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
   
   const addItemHandler = (item: CartItemI) => {dispatchCartAction({type: 'ADD_ITEM', payload: item})};
   const removeItemHandler = (id: string) => {dispatchCartAction({type: 'REMOVE_ITEM', payload: id})};
   const clearCartHandler = () => {dispatchCartAction({type: 'CLEAR_CART'})};

   return (
      <CartContext.Provider value={{
         cartItems: cartState.cartItems, 
         total: cartState.total,
         addItem: addItemHandler,
         removeItem: removeItemHandler,
         clearCart: clearCartHandler
      }}>
         {children}
      </CartContext.Provider>
   )
}

export default CartContextProvider;