import React from "react";
import { Spinner } from 'react-bootstrap'



const Loading = (props) => {


    return (
        <div className=" row  justfy-content-center">
            <div class="loader">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                <div class="bar5"></div>
                <div class="bar6"></div>
            </div>
        </div>
    )
}

export default Loading;