import React, { useState } from "react";
import WarningIcon from '../../assets/assets/icons/warning.svg';
import CheckIcon from '../../assets/assets/icons/check.png';
import DeleteIcon from '../../assets/assets/icons/delete.png';
import InfoIcon from '../../assets/assets/icons/info.svg';
import useToastContext from "../../context/toast/use-toast-context";
import { Toast, Col, Row, ToastContainer } from 'react-bootstrap';

const Toasting = () => {

    const { showToast, setShowToast, toastTitle, toastMessage, toastMsgType } = useToastContext();

    return (
        <Row>
            <Col xs={6}>
                <ToastContainer className="p-3" position={'bottom-center'} style={{ marginBottom: '30px' }}>
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={10000} autohide bg={toastMsgType}>
                        <Toast.Header variant='success'>
                            <img
                                src={toastMsgType === 'success' ? CheckIcon : toastMsgType === 'danger' ? DeleteIcon : toastMsgType === 'info' ? InfoIcon : WarningIcon}
                                className="rounded me-2" width={'40px'} height={'40px'}
                                alt={toastMsgType + " icon"}
                            />
                            <strong className="me-auto">{toastTitle}</strong>
                            <small>Please note...</small>
                        </Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
        </Row>
    );
}

export default Toasting;