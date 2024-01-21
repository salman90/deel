import { render, screen } from '@testing-library/react';
import Suggestion from './Suggestion';

import "./Suggestion.css";

describe('Suggestion', () => {
    test("renders the Suggestion component", () => {
        render(<Suggestion title='title 1' id={1} query='title' />);

        const listItemElement = screen.getByRole('listitem');
        expect(listItemElement).toBeInTheDocument();

        const spanElement = screen.getByText('title');
        expect(spanElement).toBeInTheDocument();
    });

    test("renders the Suggestion component with highlighted query", () => {
        render(<Suggestion title='title 1' id={1} query='title' />);

        const listItemElement = screen.getByRole('listitem');
        expect(listItemElement).toBeInTheDocument();

        const spanElement = screen.getByText('title');
        expect(spanElement).toHaveTextContent('title')
    });
});

