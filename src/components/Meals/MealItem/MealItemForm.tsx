import React, { FC, SyntheticEvent, useRef, useState } from 'react';
import Input from '../../UI/Input/Input';
import styles from './MealItemForm.module.scss';

interface MealItemFormProps {
   id: string,
   onSubmit: (a: number) => void
}

const MealItemForm: FC<MealItemFormProps> = ({id, onSubmit}) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const [amountIsValid, setAmountIsValid] = useState<boolean>(true);

   const submitHandler = (e: SyntheticEvent) => {
      e.preventDefault();
      setAmountIsValid(true);
      const enteredAmount = inputRef.current?.value;
      const enteredAmountAsNumber = enteredAmount ? +enteredAmount : 0;
      if (!enteredAmount?.trim().length || enteredAmountAsNumber < 1 || enteredAmountAsNumber > 5) {
         setAmountIsValid(false);
         return;
      }
      onSubmit(enteredAmountAsNumber);
   }

   return (
      <form onSubmit={submitHandler} className={styles.form}>
         <Input 
            input={{
               type: 'number', 
               id: `amount_${id}`,
               min: 1,
               max: 9,
               step: 1,
               defaultValue: '1'
            }} 
            label='Amount' 
            ref={inputRef}
         />
         <button type='submit'>+ Add</button>
         {!amountIsValid && (<p>Please enter a valid amount from 1 to 5</p>)}
      </form>
   )
}

export default MealItemForm
