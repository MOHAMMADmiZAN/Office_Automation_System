import React, {memo, useState} from 'react';
import {
    DataLayoutTable,
    DataTableLayout,
    DataTableLayoutCard,
    DataTableLayoutCardContent,
    DataTableLayoutCardHeader, DataTablePagination
} from "./styles/DataTable.style";
import {Container, Divider,  TableBody, TableHead} from "@mui/material";
import DataTableRow, {CollapseComponent, RowItem} from "./DataTableRow/DataTableRow";
import CommonCard from "../../molecules/CommonCard/CommonCard";

interface PaginateType {
    rowsPerPage: number[];

}

interface DataTableData {
    label: string;
    headerRow: RowItem;
    bodyRow: RowItem[];
    CollapseComponent?: CollapseComponent;
    DataTablePagination?: PaginateType;
}

interface DATA_TABLE_PROPS {
    DataTableData: DataTableData
    title?: string;


}


const DataTable: React.FC<DATA_TABLE_PROPS> = ({DataTableData,title}) => {
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
        <Container>
            <DataTableLayout>
               <CommonCard cardTitle={title} CardMain={
                   <>
                       <DataLayoutTable aria-label={DataTableData.label}>
                           <TableHead>
                               <DataTableRow row={DataTableData.headerRow}/>
                           </TableHead>
                           <TableBody>
                               {
                                   DataTableData.bodyRow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                       return (
                                           <DataTableRow
                                               key={index}
                                               row={item}
                                               CollapseComponent={DataTableData.CollapseComponent}/>
                                       )
                                   })

                               }
                           </TableBody>
                       </DataLayoutTable>
                       {
                           DataTableData.DataTablePagination &&  <DataTablePagination
                               rowsPerPageOptions={DataTableData.DataTablePagination.rowsPerPage}
                               component="div"
                               count={DataTableData.bodyRow.length}
                               rowsPerPage={rowsPerPage}
                               page={page}
                               onPageChange={handleChangePage}
                               onRowsPerPageChange={handleChangeRowsPerPage}
                           />
                       }
                   </>
               }/>
            </DataTableLayout>
        </Container>
    );
};

export default memo(DataTable);