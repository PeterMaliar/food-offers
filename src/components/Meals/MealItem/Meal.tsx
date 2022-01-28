import React, { FC, useContext } from 'react'
import CartContext from '../../../store/cart-context';
import { MealsType } from '../AvailableMeals';
import styles from './Meal.module.scss';
import MealItemForm from './MealItemForm';

const Meal: FC<MealsType> = ({name, description, price, id}): JSX.Element => {
   const ctx = useContext(CartContext);

   return (
      <li className={styles.container}>
         <div>
            <h3>{name}</h3>
            <p className={styles.description}>{description}</p>
            <p className={styles.price}>{`$${price.toFixed(2)}`}</p>
         </div>
         <MealItemForm id={id!} onSubmit={(amount)=>{ctx.addItem!({name, price, id, amount})}}/>
      </li>
   )
}

export default Meal
