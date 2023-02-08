
import { render, screen } from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import { Btn } from './Btn';
import React from "react";
import {fireEvent, getByText} from "@testing-library/dom";


// write a test case  with it  and a description typescript
describe('Btn', () => {
    it('renders a button', () => {
        render(<Btn/>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
})


// write a test case  with btn props
