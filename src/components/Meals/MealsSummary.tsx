import React from 'react';
import styles from './MealsSummary.module.scss';

const MealsSummary = () => {
   return (
      <section className={styles['meals-summary']}>
         <h1 className={styles['meals-summary__title']}>Delicious Food, Deliveried To You!</h1>
         <p className={styles['meals-summary__text']}>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
         <p className={styles['meals-summary__text']}>All our meals are cooked with high-quality ingridients, just-in-time and of course by expreinced chefs!</p>
      </section>
   )
}

export default MealsSummary
