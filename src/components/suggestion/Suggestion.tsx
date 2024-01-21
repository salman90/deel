import { SuggestionInterface } from './Suggestion.types';
import "./Suggestion.css";

/**
 * Highlights a specific query within a given text.
 * @param {string} text - The original text where the query will be highlighted.
 * @param {string} query - The query to be highlighted within the text.
 * @returns {JSX.Element | string} - The text with the query highlighted.
 */
const highlightQuery = (text: string, query: string): JSX.Element | string => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return text;
    
    const index = text.toLowerCase().indexOf(trimmedQuery.toLowerCase());
    if (index >= 0) {
        return (
            <>
                {text.substring(0, index)}
                <strong>{text.substring(index, index + query.length)}</strong>
                {text.substring(index + query.length)}
            </>
        );
    }
    return text;
}

/**
 * Functional component representing a suggestion item.
 * @param {SuggestionInterface} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered suggestion list item.
 */
const Suggestion = ({
    title,
    query
}: SuggestionInterface) => {
  return (
    <li>
        {highlightQuery(title, query)}
    </li>
  )
};

export default Suggestion;
