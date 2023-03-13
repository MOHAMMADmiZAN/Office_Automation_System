import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it} from 'vitest';
import DataTableRow from './DataTableRow';


const data = {
    tableCell: [
        {
            align: 'center',
            value: 'Test value 1'
        },
        {
            align: 'left',
            value: 'Test value 2'
        },
    ]
}

describe('DataTableRow', () => {
    it('should have in the document', () => {
        render(<DataTableRow row={data}/>)

        data.tableCell.map(row => {
            const children = screen.queryByText(row.value)
            expect(children).toBeInTheDocument()
        })
    })
})