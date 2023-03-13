import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it} from 'vitest';
import DataTable from './DataTable';


const TableCellInterface = {
    align: "center",
    value: 'Test label'
}
const TableHeaderCellInterface = {
    align: "center",
    value: 'Test Value'
}

const RowItem = {
    tableCell: [{...TableCellInterface}]
}

const RowItemBody = {
    tableCell: [{...TableHeaderCellInterface}]
}

const data = {
    label: 'Test label',
    headerRow: RowItem,
    bodyRow: [RowItemBody],
    DataTablePagination: {rowsPerPage: [5]}
}

describe('DataTable', () => {
    it('should have in the document', () => {
        render(<DataTable DataTableData={data}/>)

        data.bodyRow[0].tableCell.map(row => {
            const children = screen.queryByText(row.value)
            expect(children).toBeInTheDocument()
        })
    })
})