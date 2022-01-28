import React, { ReactNode } from 'react';
import useHttp from '../../Hooks/useHttp';
import Card from '../UI/Card/Card';
import styles from './AvailableMeals.module.scss';
import Meal from './MealItem/Meal';

export interface MealsType {
   id?: string,
   name: string,
   description: string,
   price: number
}

// const DUMMY_MEALS: MealsType[] = [
//    {
//      id: 'm1',
//      name: 'Sushi',
//      description: 'Finest fish and veggies',
//      price: 22.99,
//    },
//    {
//      id: 'm2',
//      name: 'Schnitzel',
//      description: 'A german specialty!',
//      price: 16.5,
//    },
//    {
//      id: 'm3',
//      name: 'Barbecue Burger',
//      description: 'American, raw, meaty',
//      price: 12.99,
//    },
//    {
//      id: 'm4',
//      name: 'Green Bowl',
//      description: 'Healthy...and green...',
//      price: 18.99,
//    },
// ];

const AvailableMeals = () => {
   // const [isLoading, error, fetchResponse] = useHttp();
   // const [arrayInx, setArrayInx] = React.useState<number>(0);
   // const [firebaseResponse, setFirebaseResponse] = React.useState<string>('');
   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const [error, setError] = React.useState<string>('');
   const [meals, setMeals] = React.useState<MealsType[]>([]);
 
   // const transformDataFn = (id: {name: string}) => {
   //    setFirebaseResponse(id.name);
   // }  
   
   const transformFetchedDataFn = (data: {[key: string]: { 
         name: string,
         description: string,
         price: number
      }}) => {

      let tempArray: MealsType[] = [];
      for (const key in data) {
         tempArray = [...tempArray, {...data[key], id: key}]
      }
      setMeals(tempArray);
   }
   
   // React.useEffect(
   //    ()=>{
   //       if (arrayInx === DUMMY_MEALS.length) return;
   //       const {id, ...body} = DUMMY_MEALS[arrayInx];
   //       fetchResponse( {
   //          url: 'https://meal-orders-8870a-default-rtdb.firebaseio.com/meals.json',
   //          method: 'POST',
   //          body: {...body}
   //       }, transformDataFn)
   //       setArrayInx(prev=>prev+1);
   //    }, [firebaseResponse]
   // )

   React.useEffect(
      () => {
         // fetchResponse(
         //    {url: 'https://meal-orders-8870a-default-rtdb.firebaseio.com/meals.json'}, 
         //    transformFetchedDataFn)

         (async () => {
            try {
            setIsLoading(true);
               const response = await fetch('https://meal-orders-8870a-default-rtdb.firebaseio.com/meals.json');
               if (!response.ok) throw new Error('Something goes wrong...');
               const data = await response.json();
               transformFetchedDataFn(data);
            } catch(error) { 
               setError((error as Error).message);     
            } finally { 
               setIsLoading(false) 
            }
         })();
      }, []
   )

   let content: ReactNode = <p>The list of meal is empty</p>;
   if (meals && !!meals.length) content = <ul>
      {meals.map(meal => <Meal key={meal.id} {...meal}/>)}
   </ul>;
   if (error) content = <p>{error}</p>;
   if (isLoading) content=<p>Loading ...</p>;

   return (
      <section className={styles['available-meals']}>
         <Card>
            {content}
         </Card>
      </section>
   )
}

export default AvailableMeals
