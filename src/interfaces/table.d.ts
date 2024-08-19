interface GetPageNumbersProps {
    page: number;
    pages: number;
    pageNumbersToShow?: number;
}

interface CustomTableCellProps {
    [key: symbol | string]: any;
}

interface CustomTableCellData extends CustomTableCellProps {
    rowIndex: number;
    data: any;
}

interface CustomTableCell {
    render: (props: CustomTableCellData) => any;
    props?: CustomTableCellProps;
}

interface TableColumn {
    key?: string | number;
    name: string;
    value: string | CustomTableCell;
    props?: React.DetailedHTMLProps<
        React.TdHTMLAttributes<HTMLTableDataCellElement>,
        HTMLTableDataCellElement
    >;
}

interface TableData {
    [x: symbol | string]: any;
}

interface PaginationProps {
    enable: boolean;
    limit?: number;
    page?: number;
    pages?: number;
}

interface TableProps {
    loading?: boolean;
    name?: string;
    columns: TableColumn[];
    data: TableData[];
    pagination?: PaginationProps;
    onRowClick?: (rowData: any, rowIndex: number) => void;
}
