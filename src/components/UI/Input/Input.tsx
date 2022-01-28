import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps {
   label: string,
   input: InputHTMLAttributes<HTMLInputElement> 
}

const Input = forwardRef(
   ( 
      props: InputProps,
      ref: ForwardedRef<HTMLInputElement>
   ) => {
   const {input, label} = props;
   return (
      <div className={styles.input}>
         <label htmlFor={input.id}>{label}</label>
         <input {...input} ref={ref}/>
      </div>
   )
})

export default Input
