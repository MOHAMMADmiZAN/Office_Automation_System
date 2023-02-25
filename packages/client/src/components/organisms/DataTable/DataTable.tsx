import React, {memo, useState} from 'react';
import {DataLayoutTable, DataTableLayout, DataTablePagination} from "./styles/DataTable.style";
import {Container, TableBody, TableHead, Typography} from "@mui/material";
import DataTableRow, {RowItem} from "./DataTableRow/DataTableRow";

interface PaginateType {
    rowsPerPage: number[];

}


export interface DataTableData {
    label: string;
    headerRow: RowItem;
    bodyRow: RowItem[];
    DataTablePagination?: PaginateType;
}

interface DATA_TABLE_PROPS {
    DataTableData: DataTableData
    title?: string;


}


const DataTable: React.FC<DATA_TABLE_PROPS> = ({DataTableData, title}) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(DataTableData.DataTablePagination?.rowsPerPage[0] || 5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            {DataTableData.bodyRow.length > 0 ?
                <DataTableLayout>
                    <DataLayoutTable aria-label={DataTableData.label}>
                        <TableHead>
                            <DataTableRow row={DataTableData.headerRow}/>
                        </TableHead>
                        <TableBody>
                            {
                                DataTableData.bodyRow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                    return (
                                        <DataTableRow key={index} row={item}/>
                                    )
                                })
                            }
                        </TableBody>


                    </DataLayoutTable>

                    {
                        DataTableData.DataTablePagination && <DataTablePagination
                            rowsPerPageOptions={DataTableData.DataTablePagination.rowsPerPage}
                            component="div"
                            count={DataTableData.bodyRow.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    }
                </DataTableLayout>
                : <Container sx={{textAlign: 'center'}}>
                    <Typography variant={`h1`}>No Data </Typography>
                </Container>

            }
        </>

    );
};

export default memo(DataTable)
