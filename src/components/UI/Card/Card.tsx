import React, { FC, ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
   children: ReactNode
}

const Card: FC<CardProps> = ({children}): JSX.Element => {
   return (
      <div className={styles.container}>
         {children}
      </div>
   )
}

export default Card
