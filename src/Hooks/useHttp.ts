import React from "react";

type transformData = (dataObj: any) => void;
type useHttpResultType = [ 
   boolean, string, 
   (httpConfig: {
      url: string, method?: 'GET' | 'POST', body?: any 
   }, 
   transformDataFn: transformData)=>void ];

const useHttp = (): useHttpResultType => {
   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const [error, setError] = React.useState<string>('');

   const fetchResponse = async ( httpConfig: {
      url: string, method?: 'GET' | 'POST', body?: any }, transformDataFn: transformData) => {
      const {url, method = 'GET', body} = httpConfig;   
      setIsLoading(true);
      setError('');

      const options: RequestInit = {
         method,
         headers: method === 'POST' ? {'Content-Type': 'application/json'}:{},
         body: method === 'POST' ? JSON.stringify(body) : null
      }
      try {
         const response = await fetch(url, options);
         if (!response.ok) throw new Error('Something goes wrong...');
         const data = await response.json();
         transformDataFn(data);
      } catch(error) {
         setError((error as Error).message);
      } finally {
         setIsLoading(false)
      }
   }

   return [isLoading, error, fetchResponse]
}

export default useHttp;