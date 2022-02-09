import React, { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import GroupAdd from '@material-ui/icons/GroupAdd';
import Cached from '@material-ui/icons/Cached';
import FlashOn from '@material-ui/icons/FlashOn';

const TableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={{ color: '#198754' }} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} style={{ color: '#198754' }} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: 'red' }} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{ color: 'red' }} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} style={{ color: '#198754' }} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ color: 'orange' }} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style={{ color: '#198754' }} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} style={{ color: '#198754' }} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} style={{ color: '#198754' }} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} style={{ color: '#198754' }} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} style={{ color: '#198754' }} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: 'red' }} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} style={{ color: '#198754' }} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} style={{ color: 'red' }} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} style={{ color: '#198754' }} />),
    Deactivate: forwardRef((props, ref) => <FlashOn {...props} ref={ref} style={{ color: 'red' }} />),
    Activate: forwardRef((props, ref) => <GroupAdd {...props} ref={ref} style={{ color: '#198754', paddingRight:'3px' }} />),
    Reset: forwardRef((props, ref) => <Cached {...props} ref={ref} style={{ color: 'orange' }} />),
};

export default TableIcons;