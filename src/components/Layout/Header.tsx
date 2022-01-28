import React, { FC } from 'react';
import styles from './Header.module.scss';
import mealsImage from '../../assets/meals.jpg';
import CartButton from './CartButton';

interface HeaderProps {
   onShowCart: () => void
}

const Header: FC<HeaderProps> = ({onShowCart}) => {
   return (
      <>
         <header className={styles.header}>
            <h1 className={styles.logo}>ReactMeal</h1>
            <CartButton onClick={onShowCart}/>
         </header>
         <div className={styles['main-image']}>
            <img src={mealsImage} alt="Meals" />
         </div>
      </>
   )
}

export default Header
