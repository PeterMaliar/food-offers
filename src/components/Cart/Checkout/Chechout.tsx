import React, { ForwardedRef } from 'react';
import styles from './checkout.module.scss';

const isEmpty = (value: string | undefined): boolean => !(!!value && !!value.trim());
const isLenghtEqualsFive = (value: string | undefined): boolean => !!value && value.trim().length === 5

interface CheckoutFormProps {
   onSubmitOrder: (userData: any) => void,
   isLoading: boolean,
   error: string,
   sendSuccess: boolean
}

const CheckoutForm = React.forwardRef<HTMLFormElement, CheckoutFormProps>(
   (
      {onSubmitOrder, isLoading, error, sendSuccess}: CheckoutFormProps, 
      ref: ForwardedRef<HTMLFormElement>
   ) => {

   const [formInputsValidity, setFormInputsValidity] = React.useState({
      name: true,
      street: true,
      postalCode: true,
      city: true
   })

   const inputName = React.useRef<HTMLInputElement>(null);
   const inputStreet = React.useRef<HTMLInputElement>(null);
   const inputCity = React.useRef<HTMLInputElement>(null);
   const inputPostalCode = React.useRef<HTMLInputElement>(null);

   const submitFormHandler = (e: React.FormEvent) => {
      e.preventDefault();

      const enteredName = inputName.current?.value;    
      const enteredStreet = inputStreet.current?.value;
      const enteredPostalCode = inputPostalCode.current?.value;
      const enteredCity = inputCity.current?.value;

      
      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredStreetIsValid = !isEmpty(enteredStreet);
      const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && isLenghtEqualsFive(enteredPostalCode);
      const enteredCityIsValid = !isEmpty(enteredCity);

      setFormInputsValidity({
         name: enteredNameIsValid,
         street: enteredStreetIsValid,
         postalCode: enteredPostalCodeIsValid,
         city: enteredCityIsValid
      });
      
      const isFormValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
 
      if (isFormValid) {
         onSubmitOrder({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
         });
         (e.target as HTMLFormElement).reset();
      }     
   }

   return (
      <form 
         onSubmit={submitFormHandler} 
         ref={ref}
         className={styles.form}
      >
         {isLoading && <p className={styles.info}>POSTing DATA to Backend...</p>}
         {error && <p className={`${styles.info} ${styles.error}`}>Transmission error...</p>}
         {sendSuccess && <p className={styles.info}>Order has been sent successfully...</p>}
         <div className={styles.control}>
            <label htmlFor="name">Your name: </label>
            <input type="text" id='name' ref={inputName} className={formInputsValidity.name ? '' : styles.invalid}/>
            {!formInputsValidity.name && <p className={styles['error-message']}>Name is required...</p>}
         </div>
         <div className={styles.control}>
            <label htmlFor="street">Street: </label>
            <input type="text" id='street' ref={inputStreet} className={formInputsValidity.street  ? '' : styles.invalid}/>
            {!formInputsValidity.street && <p className={styles['error-message']}>Street is required...</p>}
         </div>
         <div className={styles.control}>
            <label htmlFor="postal">Postal Code: </label>
            <input type="text" id='postal' ref={inputPostalCode} className={formInputsValidity.postalCode ? '' : styles.invalid}/>
            {!formInputsValidity.postalCode && <p className={styles['error-message']}>Postal Code is wrong...</p>}
         </div>
         <div className={styles.control}>
            <label htmlFor="city">City: </label>
            <input type="text" id='city' ref={inputCity} className={formInputsValidity.city ? '' : styles.invalid}/>
            {!formInputsValidity.city && <p className={styles['error-message']}>City name is required...</p>}
         </div>
      </form>
   )
})

export default CheckoutForm
