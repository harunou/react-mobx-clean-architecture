import { render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { Controller, OrderItem, Presenter } from './OrderItem';

describe(`${OrderItem.name}`, () => {
    it('renders component', () => {
        Presenter.make = jest.fn().mockImplementation(() => ({
            itemId: '5',
            productId: '3',
            productQuantity: 7,
        }));

        render(
            <StrictMode>
                <OrderItem orderId='5' itemId='3' />
            </StrictMode>,
        );

        const idElement = screen.getByText(/id: 5/i);
        const productIdElement = screen.getByText(/productId: 3/i);
        const quantityElement = screen.getByText(/quantity: 7/i);

        expect(idElement).toBeInTheDocument();
        expect(productIdElement).toBeInTheDocument();
        expect(quantityElement).toBeInTheDocument();
    });

    it('handles delete button click', () => {
        const deleteButtonClicked = jest.fn();
        Presenter.make = jest.fn().mockImplementation(() => ({
            itemId: '5',
            productId: '3',
            productQuantity: 7,
        }));
        Controller.make = jest.fn().mockImplementation(() => ({
            deleteButtonClicked,
        }));

        render(
            <StrictMode>
                <OrderItem orderId='5' itemId='3' />
            </StrictMode>,
        );

        const deleteButton = screen.getByRole('button');
        deleteButton.click();

        expect(deleteButtonClicked).toHaveBeenCalledTimes(1);
    });
});
