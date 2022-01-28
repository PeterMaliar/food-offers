import { createContext } from "react";
import { CartItemI } from "../components/Cart/Cart";

interface CartContextI {
   cartItems: CartItemI[],
   total: number,
   addItem: (item: CartItemI)=>void,
   removeItem: (id: string)=>void,
   clearCart: ()=>void
}

const CartContextInit: CartContextI = {
   cartItems: [],
   total: 0,
   addItem: ()=>{},
   removeItem: ()=>{},
   clearCart: ()=>{}
}

const CartContext = createContext<CartContextI>(CartContextInit);

export default CartContext