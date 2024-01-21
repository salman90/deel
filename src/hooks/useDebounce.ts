import { useState, useEffect } from 'react';

/**
 * useDebounce custom hook to debounce the search query.
 * @param {string} query - The search query to be debounced.
 * @param {number} milliSeconds - The time to wait before updating the debounced value.
 * @returns {string} - The debounced search query.
 */
export const useDebounce = (query: string , milliSeconds: number): string => {
 const [debouncedValue, setDebouncedValue] = useState(query);

 useEffect(() => {
   const handler = setTimeout(() => {
     setDebouncedValue(query);
   }, milliSeconds);

   return () => {
     clearTimeout(handler);
   };
 }, [query, milliSeconds]);

 return debouncedValue;
};