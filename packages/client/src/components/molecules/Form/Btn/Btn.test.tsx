import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Btn, BTN_PROPS} from './Btn';
import React from "react";


// write a test case  with it  and a description typescript
describe('Btn', () => {
    it('renders a button', () => {
        const btnProps: BTN_PROPS = {
            BtnText: `Click Me`,
            type: `button`,
            onClick: () => jest.fn(),
            disabled: false,
            className: `btn`,
            variant: `contained`,
            size: `medium`,
            isRounded: false,
            btnRef: React.createRef(),
            BtnStartIcon: <div>Start Icon</div>,
            BtnEndIcon: <div>End Icon</div>


        }
        render(<Btn {...btnProps}/>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
})


// write a test case  with btn props
