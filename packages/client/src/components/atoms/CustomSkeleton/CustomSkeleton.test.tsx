import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import CustomSkeleton from './CustomSkeleton';


describe('CustomSkeleton', () => {
    it('should have in the document', () => {
        render(<CustomSkeleton />);
        const wrapper = screen.getByTestId('wrapper')
        expect(wrapper).toBeInTheDocument()
        const skeletonElement = screen.getByTestId('skeleton-wrapper')
        expect(skeletonElement).toBeInTheDocument()

        const arr = new Array(10).fill(1)
        arr.map((_, index) => {
            const typography = screen.getByTestId(index)
            expect(typography).toBeInTheDocument()
        })
    })
    it('avatar should have in the document', () => {
        const isAvatar = true;
        render(<CustomSkeleton withAvatar={isAvatar} />)
        const avatar = screen.getByTestId('avatar')
        expect(avatar).toBeInTheDocument()
    })
})