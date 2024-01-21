import { render, screen } from '@testing-library/react';
import AutoComplete from './Autocomplete';
import user from "@testing-library/user-event";
import fetchData from '../../utils/fetchData';

jest.mock('../../utils/fetchData');

describe('AutoComplete rednder', () => {
    test('renders the AutoComplete component', () => {
        render(<AutoComplete />);
        const titleElement = screen.getByRole('heading', { name: 'Autocomplete' });
        expect(titleElement).toBeInTheDocument();

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();

        const listElement = screen.queryByRole('list');
        expect(listElement).not.toBeInTheDocument();

        const loadingElement = screen.queryByText(/loading.../i);
        expect(loadingElement).not.toBeInTheDocument();
    });

    test("fetch elements", async () => {
        (fetchData as jest.Mock).mockResolvedValue([{title: "title1", body: "body1", id: 1, userId: 1}])    
        user.setup();
        render(<AutoComplete />);
        const inputElement = screen.getByRole('textbox');
        await user.type(inputElement, 's');
        const listItemElement = await screen.findByText('title1');
        expect(listItemElement).toBeInTheDocument();
    });

});
