import React from 'react';
import {render, screen} from '@testing-library/react';
import ChangePasswordModal from './ChangePasswordModal';
import {describe, it} from 'vitest';


const ModalComponent = () => <div>Test modal children</div>

describe('Change password modal', () => {
    const propObj = {
        modalId: 'Test#01',
        modalTitle: 'Test Modal Title',
        open: false,
        handleClose: () => {
        }
    }
    it('should not render any element', () => {
        render(<ChangePasswordModal {...propObj} modalContent={<ModalComponent/>}/>)
        expect(screen.queryByText(/Test/i)).toBeNull()
    })
    it('should have in the document', () => {
        propObj.open = true;
        render(<ChangePasswordModal {...propObj} modalContent={<ModalComponent/>}/>)

        const titleElement = screen.queryByText(propObj.modalTitle)
        expect(titleElement).toBeInTheDocument()
    })
})