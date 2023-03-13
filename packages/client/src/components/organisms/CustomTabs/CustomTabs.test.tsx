import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it} from 'vitest';
import CustomTabs from './CustomTabs';


interface TestComponentProps {
    name: string;
}

const TestComponent = ({ name }: TestComponentProps) => (
    <div>This is {name} component</div>
);


const tabs = [
    {
        label: 'Tab 1',
        component: <TestComponent name={'One'}/>
    },
    {
        label: 'Tab 2',
        component: <TestComponent name={'Two'}/>
    },
]
describe('Custom modal', () => {
    it('should not render any element', () => {
        render(<CustomTabs tabs={tabs}/>)
        tabs.map(row => {
            const children = screen.queryByText(row.label)
            expect(children).toBeInTheDocument()
        })
    })
})