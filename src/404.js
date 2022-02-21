import React from 'react';
import {useLocation} from 'react-router-dom';

const NoMatch = () => {

    const location=useLocation();
    let diva = ()=> {
        return (
            <div>
                {!location?.pathname.includes('list') &&
                <div>
                    <h4>No Match</h4>
                </div> }
            </div>);
    }
    return <div>{diva()}</div>
}



export default NoMatch;