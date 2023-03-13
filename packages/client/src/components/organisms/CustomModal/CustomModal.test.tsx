import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import CustomModal from './CustomModal';
import {describe, it} from 'vitest';


const ModalComponent = () => <div>Test modal children</div>

describe('Custom modal', () => {
    const propObj = {
        modalId: 'Test#01',
        modalTitle: 'Test Modal Title',
        modalBtnText: 'Change Password',
        modalBtnColor: 'red',
    }
    it('should not render any element', () => {
        render(<CustomModal {...propObj} modalContent={<ModalComponent/>}/>)
        expect(screen.queryByText(/Test/i)).toBeNull()
    })
    it('should have in the document when click change password button', () => {
        render(<CustomModal {...propObj} modalContent={<ModalComponent/>}/>)

        const buttonElement = screen.queryByText(/change password/i)
        fireEvent.click(buttonElement)
        const titleElement = screen.queryByText(propObj.modalTitle)
        expect(titleElement).toBeInTheDocument()
    })
})