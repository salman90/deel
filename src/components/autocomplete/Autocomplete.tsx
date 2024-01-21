import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import Suggestion from '../suggestion/Suggestion';
import { PostType } from './Autocomplete.types';
import { POST_URL, DEBOUNCE_DELAY, FETCH_LIMIT, USER_ERROR_MESSAGE, USER_ERROR_MESSAGE_INVALID_INPUT } from '../../utils/constants';
import  fetchData from '../../utils/fetchData';
import { validateInput } from '../../utils/stringUtils';

import './Autocomplete.css';

/**
 * Autocomplete function component to render the autocomplete component with search input and suggestions.
 * @returns JSX.Element
 */
const AutoComplete = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const searchQuery = useDebounce(query, DEBOUNCE_DELAY);

    /**
     * Function to fetch the data from the API and set the suggestions.
     * Takes the search query as input and aborts the previous request if any.
     * @param searchQuery - The search query string
     */
    const handleFetchData = async (searchQuery: string) => {
        try {
            let data = await fetchData(POST_URL, searchQuery, FETCH_LIMIT);
            setSuggestions(data);
        } catch(error: any) {
            setSuggestions([]);
            setError(USER_ERROR_MESSAGE);
        } finally {
            setLoading(false);
        }
    }

    /**
     * useEffect hook to fetch the data on search query change.
     * Clears previous AbortController when component unmounts.
     */
    useEffect(() => {
        setLoading(true);
        const trimmedQuery = searchQuery.trim();

        if(searchQuery || query.trim().length < 0) {
            handleFetchData(trimmedQuery)
        } else {
            setQuery(query);
            setSuggestions([]);
            setLoading(false);
            setError(''); 
        }
    },[searchQuery, query]);

    /**
     * handleQuerySearch function to set the search query.
     * @param event - Change event from the search input
     */
    const handleQuerySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(error.length > 0) setError('');

        if (validateInput(event.target.value)) {
            setQuery(event.target.value);
        } else {
            setError(USER_ERROR_MESSAGE_INVALID_INPUT);
        }
    }

    return(
        <div className="autocomplete-container">
            <h1>Autocomplete</h1>
            <input 
                type="text" 
                value={query} 
                placeholder='Search...' 
                onChange={handleQuerySearch}
                className='search-input'
            />
            {loading && (
                <div className="loading-container">
                    <p className="loading-message">Loading...</p>
                </div>
            )}
            {error && (
                <div className="error-container">
                    <p className="error-message">{error}</p>
                </div>
            )}
            {!loading && !error && suggestions.length ? 
                <ul>
                    {suggestions.map(suggestion => {
                        return <Suggestion 
                                    key={suggestion.id}
                                    title={suggestion.title} 
                                    id={suggestion.id}
                                    query={query}
                                />
                    })}
                </ul>
                : 
                null
            }
        </div>
    )
}

export default AutoComplete;