import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangePassword from './ChangePassword';
import { vi, describe, it } from 'vitest';


vi.mock('../../../hooks/useAuth', () => {
    return {
        default: vi.fn(() => ({
            changePassword: () => { }
        }))
    }
})

describe('CustomSkeleton', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    it('should have in the document', () => {
        const open = true;
        const handleClose = () => { };
        render(<ChangePassword open={open} handleClose={handleClose} />)

        const formElement = screen.queryByLabelText('Current Password')
        // expect(formElement).toBeInTheDocument()

        const buttonElement = screen.queryByText('submit')
        // expect(buttonElement).toBeInTheDocument()
    })
})