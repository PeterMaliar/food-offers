import React, { FC, useContext, useEffect } from 'react'; 
import CartIcon from '../Cart/CartIcon';
import styles from './CartButton.module.scss';
import cn from 'classnames';
import CartContext from '../../store/cart-context';

interface CartButtonProps {
   onClick: () => void
}

const CartButton: FC<CartButtonProps> = ({onClick}) => {
   const [bumped, setBumped] = React.useState<boolean>(false);
   const {cartItems} = useContext(CartContext);

   useEffect(() => {
      if (!cartItems.length) return;
      setBumped(true);
      const timer = setTimeout(
         () => {
            setBumped(false)
         }, 300
      ) 
      return () => { 
         if (timer) {
            clearTimeout(timer);
         }}
   }, [cartItems, setBumped])

   const clickHandler = () => {
      setBumped(prev => !prev);
      onClick();
   }

   const cartCTX = React.useContext(CartContext);
   const numberOfItemInCart = cartCTX.cartItems.reduce((sum, item) =>sum+item.amount, 0);

   return (
      <button className={cn(styles['cart-btn'],{[styles.bump]: bumped})} onClick={clickHandler}>
         <span className={styles.icon}>
            <CartIcon />
         </span>
         <span>Your cart</span>
         <span className={styles.badge}>{numberOfItemInCart}</span>
      </button>
   )
}

export default CartButton
