import {Collapse, IconButton, TableCell, TableRow} from '@mui/material';
import React, { memo } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export type alignType = "center" | "left" | "right" | "inherit" | "justify" | undefined;

export interface TableCellInterface {
    align: string;
    value: string | React.ReactNode;
}
export interface CollapseComponent {
    CollapseComponentNode?: React.ReactNode
}

export interface RowItem {

    tableCell: TableCellInterface[];


}

interface DATA_TABLE_ROW_PROPS {
    row: RowItem
    CollapseComponent?: CollapseComponent


}

const DataTableRow: React.FC<DATA_TABLE_ROW_PROPS> = (props) => {
    const {row, CollapseComponent} = props;
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                {
                    CollapseComponent && <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell>
                }

                {row.tableCell.map((item, index) => {
                    return (
                        <TableCell align={item.align as alignType} key={index}>{item.value}</TableCell>
                    )

                })}
            </TableRow>
            {
                CollapseComponent && <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {CollapseComponent.CollapseComponentNode}
                        </Collapse>
                    </TableCell>
                </TableRow>
            }
        </>
    );
};

export default memo(DataTableRow);