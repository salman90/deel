import { PostType } from '../components/autocomplete/Autocomplete.types';
/**
 * Fetch data from the specified URL with optional query parameters and limit.
 * @param {string} url - The base URL for the API.
 * @param {string} query - The search query to filter data.
 * @param {number} limit - The limit to restrict the number of results.
 * @param {AbortSignal} signal - An optional AbortSignal to allow cancelling the request.
 * @returns {Promise<PostType>} - A promise that resolves to the fetched data.
 */
const fetchData = async (url: string, query: string, limit: number): Promise<PostType[]> => {
    try {
        const fetchUrl = `${url}?title_like=${query}&_limit=${limit}`;
        const response = await fetch(fetchUrl);

        if (!response.ok || response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch(error: any) {
        console.log(error)
        if (error instanceof Error) {
            console.log('Error message:', error.message);
        } else {
            console.log('Unexpected error structure:', error);
        }
        throw error;

    }
} 

export default fetchData;