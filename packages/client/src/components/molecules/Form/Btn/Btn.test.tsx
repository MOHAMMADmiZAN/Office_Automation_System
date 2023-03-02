import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Btn, BTN_PROPS} from './Btn';
import React from "react";

const buttonTestID = 'button';
// write a test case  with it  and a description typescript
describe('Btn', () => {
    it('renders a button', () => {
        const btnProps: BTN_PROPS = {
            BtnText: `Button`,
            type: `button`,
            onClick: () => vi.fn(),
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
    it('Should be able to render the button', () => {
        const btnProps: BTN_PROPS = {
            BtnText: `Click Me`,
            type: `button`,
            onClick: () => vi.fn(),
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
        expect(screen.getByRole('button')).toHaveTextContent("Click Me");
    });
    it('Be able to fire the onClick event', () => {
        const btnProps: BTN_PROPS = {
            BtnText: `Click Me`,
            type: `button`,
            onClick: () => vi.fn(),
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
        //const handleClick = vi.fn();
        const {getByTestId} = render(<Btn {...btnProps}></Btn>);     
        fireEvent.click(getByTestId(buttonTestID))
        expect(screen.getByRole('button')).toHaveBeenCalledTimes(1);
    });
    it('Should be able to have default style', () => {
        const btnProps: BTN_PROPS = {
            BtnText: `Click Me`,
            type: `button`,
            onClick: () => vi.fn(),
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
        expect(screen.getByRole('button')).toHaveStyle({
            backgroundColor: "#000",
            height: "40px",
        })
    });
})


// write a test case  with btn props
