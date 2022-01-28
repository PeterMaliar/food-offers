import { FC, useContext } from 'react';
import CartContext from '../../../store/cart-context';
import { CartItemI } from '../Cart';
import styles from './CartItem.module.scss';

const CartItem: FC<CartItemI> = ({name, price, amount, id}) => {
   const cartCtx = useContext(CartContext);

   const addAmountHandler = (item: CartItemI) => {  
      if (amount >=5 ) return;
      cartCtx.addItem(item);
   }

   const subtractAmountHandler = () => {
      if (amount < 1 ) return;
      cartCtx.removeItem(id!);
   }

   return (
      <div className={styles['cart-item']}>
         <div className={styles.info}>
            <h3>{name}</h3>
            <span>{`$${price.toFixed(2)}`}</span>
            <span>{`x ${amount}`}</span>
         </div>
         <div className={styles.actions}>
            <button onClick={addAmountHandler.bind(null, {id, name, price, amount: 1})}>+</button>
            <button onClick={subtractAmountHandler}>-</button>
         </div>    
      </div>
   )
}

export default CartItem
