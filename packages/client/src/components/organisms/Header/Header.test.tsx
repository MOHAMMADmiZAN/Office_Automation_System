import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Header from './Header';



const data = {
    controlSidebar: () => { },
    accountMenuItems: [
        {
            icon: <div>Dashboard</div>,
            text: 'Dashboard',
            isDivider: true
        },
        {
            icon: <div>Icon</div>,
            text: 'Account',
            isDivider: true
        },
        {
            icon: <div>Password</div>,
            text: 'Change Password',
            isDivider: true
        }
    ]
}


vi.mock('../../../hooks/useAuth', () => {
    return {
        default: vi.fn(() => ({
            user: {
                firstName: 'Mr John'
            }
        }))
    }
})

describe('Header', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })


    it('logo should have in the document', () => {
        render(<Header {...data} />)
        const element = screen.getByAltText(/logo/i);
        expect(element).toBeInTheDocument()
    })


    it('should have in the document', () => {
        render(<Header {...data} />)

        const dropdown = screen.getByTestId('open-dropdown')
        fireEvent.click(dropdown)
        
        data.accountMenuItems.map((row) => {
            const element = screen.getByTestId(row.text);
            expect(element).toBeInTheDocument()
        })
    })

})