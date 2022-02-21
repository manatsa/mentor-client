import {ExportCsv, ExportPdf} from "@material-table/exporters";

const Options = {
    grouping: true,
    resizable: true,
    search: true,
    exportButton: true,
    exportAllData: true,
    sorting: true,
    columnsButton: true,
    actionsColumnIndex: -1,
    pageSize: 5,
    pageSizeOptions: [ 3, 5, 10, 50, 100],

}

export default Options;