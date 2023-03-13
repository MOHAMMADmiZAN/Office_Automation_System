import React from 'react';
import {render, screen} from '@testing-library/react';
import CustomModalTitle from './CustomModalTitle';
import {describe, it} from 'vitest';


const TestComponent = () => <div>Test Children</div>


describe('CustomSkeleton', () => {
    it('should have in the document', () => {
        const id = 'Test#023';
        const onClose = () => {
        };
        render(<CustomModalTitle id={id} onClose={onClose} children={<TestComponent/>}/>)

        const closeBtnElement = screen.getByTestId('close-button')
        expect(closeBtnElement).toBeInTheDocument()

        const childrenElement = screen.queryByText('Test Children')
        expect(childrenElement).toBeInTheDocument()
    })
})