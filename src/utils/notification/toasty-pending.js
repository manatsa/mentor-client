import React from "react";
import { Spinner } from 'react-bootstrap';

const ToastPending = (props) => {
    return (
        <div className="row d-flex justify-content-center">
            <div className='justify-self-start'>
                <Spinner size="lg" animation="grow" variant="success" />
                <Spinner size="lg" animation="grow" variant="success" />
                <Spinner size="lg" animation="grow" variant="success" />
            </div>
            <div className="me-auto">
                <p>{props?.msg?props.msg:'Loading.. Please wait.'}</p>
            </div>
        </div>
    )
}


export default ToastPending;