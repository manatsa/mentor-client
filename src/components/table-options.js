import {ExportCsv, ExportPdf} from "@material-table/exporters";

const Options = {
    grouping: true,
    search: true,
    sorting: true,
    columnsButton: true,
    actionsColumnIndex: -1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50, 100],
    exportMenu: [{
        label: 'Export PDF',
        exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Schools List')
    }, {
        label: 'Export CSV',
        exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Schools List')
    }]
}

export default Options;