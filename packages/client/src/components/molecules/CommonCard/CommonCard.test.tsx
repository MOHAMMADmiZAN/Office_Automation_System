import React from 'react';
import { render, screen } from '@testing-library/react';
import CommonCard from './CommonCard';
import { describe, it } from 'vitest';


describe('CustomSkeleton', () => {
    it('should have in the document', () => {
        const cardTitle = 'Card Title';
        const cardMain = 'Card Main';
        const children = <h2>Test Children</h2>
        render(<CommonCard cardTitle={cardTitle} CardMain={cardMain} children={children} />)

        const titleElement = screen.queryByText(cardTitle)
        expect(titleElement).toBeInTheDocument()
        const mainElement = screen.queryByText(cardMain)
        expect(mainElement).toBeInTheDocument()
        const childrenElement = screen.queryByText('Test Children')
        expect(childrenElement).toBeInTheDocument()
    })
})