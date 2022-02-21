import React, {useState, useEffect, useCallback} from "react";
import MaterialTable from "@material-table/core";
import {getFetchWithPropsPlain, getFetchWithPropsPlainForUser} from "../../../services/fetcher";
import TableIcons from "../../tableIcons";
import AttachementListItem from "./attachments-list-item";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Options from "../../table-options";
import {FileDownload} from "@mui/icons-material";
import {toast, Zoom} from "react-toastify";
import ToastPending from "../../../utils/notification/toasty-pending";
import {Spinner} from "react-bootstrap";
import {ExportCsv, ExportPdf} from "@material-table/exporters";
import { triggerBase64Download } from 'react-base64-downloader';


const AttachmentsList = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showModalDialog, setShowModalDialog] = useState(false);
    const [attachmentString, setAttachmentString] = useState(null);
    const [showAttachment, setShowAttachment] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [showLoadingDialog, setShowLoadingDialog] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const login = localStorage.getItem('user');
    const user = JSON.parse(login);

    Options.exportMenu= [{
        label: 'Export PDF',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/attachments',user,'Please wait... Fetching Data.')
            ExportPdf(cols, res.data, 'Attachments List')
        }
    }, {
        label: 'Export CSV',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/attachments',user,'Please wait... Fetching Data.')
            ExportCsv(cols,res.data , 'Attachments List')
        }
    }]


    //String name;String address;String phone;String email;
    const columns = [

        {title: "Attachment UID", field: "id"},//, render:(data)=><Button onClick={()=>handleLectureClick(data)}>{data}</Button> },
        {title: "Attachment Name", field: "name"},
        {
            title: "Document Attachment", field: "content", render:
                data => data ?
                    <a href={'#'} onClick={() => triggerBase64Download(`data:${data.contentType};base64,${data.content}`, data.name)}  target={'_blank'}>
                        <FileDownload/> {data.name}
                    </a> : null
        },
        {title: "Document Type", field: "contentType"},
        {title: "Lesson Name", field: "lesson",
            render: useCallback(data1 => data1?.lesson?.name)
        },
        {title: "Subject Name", field: "lesson",
            render: useCallback(data1 => data1?.lesson?.subject?.name)
        }


    ];



    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const downloadFile = async (data) => {
        const linkSource = `data:${data.contentType};base64,${data.content}`;
        console.log(linkSource)
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = data.name;
        await sleep(500)
        downloadLink.click();
    }


    const handleEditModal = (rowData) => {
        setAttachment(rowData);
        setShowModalDialog(true)
    }

    const handleModalClose = () => {
        setShowModalDialog(false)
    }

    const addAttachmentHandler = () => {
        setAttachment(null)
        setShowModalDialog(true)
    }


    const handleAttachModalClose = () => {
        setShowAttachment(false);
    }

    const dataQuery=(query) =>(

        new Promise((resolve, reject) => {
            //console.log('Query :'+JSON.stringify(query))
            let url = "/attachments?";
            url += "size=" + pageSize;
            url += "&page=" + page;
            url += "&search="+searchText;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user?.token
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    resolve({
                        data: result.data.filter(d=>(d.name.toLowerCase().includes(query.search.toLowerCase())
                            || d.contentType.toLowerCase().includes(query.search.toLowerCase())
                        || d.lesson?.name.toLowerCase().includes(query.search.toLowerCase())
                        || d.lesson?.subject?.name.toLowerCase().includes(query.search.toLowerCase()))),
                        rowsPerPage:pageSize,
                        page: page,
                        totalCount: result.total,
                    });
                });
        }))

    const actions =
        [
            {
                icon: TableIcons.Edit,
                tooltip: "Edit",
                onClick: (event, rowData) => {
                    return handleEditModal(rowData);
                },
            },
            {
                icon: TableIcons.Delete,
                tooltip: "Delete",
                onClick: (event, rowData) => alert("You want to delete " + JSON.stringify(rowData)),
            },
            {
                icon: TableIcons.Add,
                tooltip: "Add",
                isFreeAction: true,
                onClick: addAttachmentHandler,
            },
        ];

    return (
        <div style={{display: 'flex', height: '100%'}}>
            {
                showLoadingDialog && <div><Spinner animation={'border'} variant={'secondary'}/></div>
            }
            <Modal size="lg" variant="primary" show={showAttachment} onHide={handleAttachModalClose} backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">Attached Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        {/*<img src={{uri:documentString}} width={'200px'} height={'200px'} style={{margin:'10px'}} />
                        <span>{attachment?.contentType}</span>*/}
                    </div>

                </Modal.Body>
            </Modal>
            <Modal size="lg" className={'big-modal'} variant="primary" show={showModalDialog} onHide={handleModalClose}
                   backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">{attachment?.name ? attachment.name : 'New Attachment'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AttachementListItem attachments={JSON.stringify(data)}
                                         attachment={JSON.stringify(attachment) || {}}
                                         addAttachmentHandler={addAttachmentHandler}
                                         setShowModalDialog={setShowModalDialog}
                                         user={JSON.stringify(user)}
                    />
                </Modal.Body>

            </Modal>

            <div style={{flexGrow: 1}}>
                <MaterialTable
                    actions={actions}
                    icons={TableIcons}
                    options={Options}
                    isLoading={loading}
                    options={Options}
                    onSearchChange={text=>setSearchText(text)}
                    onPageChange={((page, pageSize) =>{
                        setPage(page);
                        setPageSize(pageSize)
                    } )}
                    onRowsPerPageChange={(pageSize1 => setPageSize(pageSize1))}
                    data={dataQuery}
                    columns={columns}
                    isLoading={loading}
                    title={"List of Attachment for: " + user?.login}
                />
            </div>
        </div>

    )
}

export default AttachmentsList;