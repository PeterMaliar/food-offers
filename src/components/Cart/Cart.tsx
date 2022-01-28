import React, { FC, useContext } from 'react';
import CartContext from '../../store/cart-context';
import ModalWindow from '../UI/ModalWindow/ModalWindow';
import styles from './Cart.module.scss';
import CartItem from './CartItem/CartItem';
import CheckoutForm from './Checkout/Chechout';

export interface CartItemI {
   id?: string,
   amount: number,
   name: string,
   price: number
}

interface CardProps {
   onClose: () => void,
   show: boolean
}

const Cart: FC<CardProps> = ({onClose, show}) => {
   const {cartItems, total, clearCart} = useContext(CartContext);
   const [showCheckoutForm, setShowCheckoutForm] = React.useState<boolean>(false);

   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const [error, setError] = React.useState<string>('');
   const [sendSuccess, setSendSuccess] = React.useState<boolean>(false);

   const formRef = React.useRef<HTMLFormElement>(null);

   React.useEffect(
      () => {
         let timer: NodeJS.Timeout;
         if (sendSuccess) {
            timer = setTimeout(
               () => {
                  setSendSuccess(false)
               }, 3000
            )
         }
         return () => {
            if (timer) {
               clearTimeout(timer);
               clearCart();
               setShowCheckoutForm(false);
            }
         }
      }, [sendSuccess]
   )

   const clickHandler = () => {
      setShowCheckoutForm(prev=>!prev);
   }

   const submitOrderHandler = async (userData: any) => {
      const options: RequestInit = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            orderDate: new Date(),
            userInfo: userData,
            cartItems,
            total 
         })
      };
      try {
         setIsLoading(true);
         setError('');
         const response = await fetch('https://meal-orders-8870a-default-rtdb.firebaseio.com/orders.json', options);  
         if (!response.ok) throw new Error('POST request error...');
         setSendSuccess(true);
      } catch(error) {
         setError((error as Error).message)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <ModalWindow show={show} onClose={onClose}>
         <div className={styles.container}>
            {cartItems && !!cartItems.length && <>
               <ul className={styles['cart-items']}>
                  {cartItems.map(
                     (cartItem: CartItemI) => <CartItem key={cartItem.id} {...cartItem} />
                  )}
               </ul>
               <div className={styles.total}>
                  <h3>Total amount:</h3>
                  <h3>{` $${total.toFixed(2)}`}</h3>
               </div>
            </>}
            {cartItems && !cartItems.length && <h2>Your cart is empty!</h2>}
            {showCheckoutForm && <CheckoutForm ref={formRef} onSubmitOrder={submitOrderHandler} isLoading={isLoading} error={error} sendSuccess={sendSuccess}/>}
            <div className={styles.actions}>
               <button className={styles['button--alt']} onClick={onClose}>Close</button>
               {cartItems && !!cartItems.length && 
                  <>
                     {!showCheckoutForm && 
                        <button 
                           className={styles.button} 
                           disabled={!cartItems.length} 
                           onClick={clickHandler}
                        >Order</button>
                     }
                     {showCheckoutForm && 
                        <button 
                           className={styles.button}
                           disabled={!cartItems.length}
                           onClick={()=>{ 
                              if (formRef.current) {
                                 formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                           }}}
                        >Confirm Order</button>
                     }
                  </>                  
               }
            </div>
         </div>
      </ModalWindow>
   )
}

export default Cart
