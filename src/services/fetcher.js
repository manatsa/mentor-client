import { toast, Zoom } from "react-toastify"
import ToastPending from "../utils/notification/toasty-pending";


// export default Fetcher extends 

const getFetch = async (url, user) => {
    try {
        const response = await toast.promise(
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user?.token
                }
            }), {
            pending: {
                render({ data }) {
                    return <ToastPending />
                }
            },
            type: 'warning',
            icon: '',
            position: 'top-center',
            transition: Zoom,
            error: 'Error loading data.'
        }
        );
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log("error", error);
    }
    return null;
};


const getFetchWithProps = async (url, user,message) => {
    try {
        const response = await toast.promise(
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user?.token
                }
            }).catch(e=>{console.error(e)}), {
                pending: {
                    render({ data }) {
                        return <ToastPending msg={message} />
                    }
                },
                error: 'Error loading data.'
            }
        );
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log("error", error);
    }
    return null;
};

const getFetchWithPropsPlain = async (url, user) => {
    try {

          return  fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user?.token
                }
            }).then(response=>response.json())

    } catch (error) {
        console.log("error", error);
    }
    return null;
};

const getFetchWithPropsPlainForUser = async (url, user) => {
    try {

        return  fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user?.token
            }
        }).then(response=>response.json())

    } catch (error) {
        console.log("error", error);
    }
    return null;
};






const postFetch = async (url, user, data, msg) => {
    try {
        const response = await toast.promise(
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user?.token
                },
                body: data
            }), {
            pending: {
                render({ data }) {
                    return <ToastPending msg={msg}/>
                }
            },
            type: 'warning',
            position: 'top-center',
            transition: Zoom,
            error: 'Error loading data.'
        }
        );
        const jsonData = JSON.stringify(await response);
        console.log('JSON DATA',response)
        return jsonData;
    } catch (error) {
        console.log("error", error);
    }
    return null;
};

const putFetch = async (url, user, data,msg) => {
    try {
        //console.log(user)
        const response = await toast.promise(
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user?.token
                },
                body: data
            }), {
                pending: {
                    render({ data }) {
                        return <ToastPending msg={msg} />
                    }
                },
                type: 'warning',
                position: 'top-center',
                transition: Zoom,
                error: 'Error loading data.'
            }
        );
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log("error", error);
    }
    return null;
};




export { getFetch, getFetchWithProps,getFetchWithPropsPlain, getFetchWithPropsPlainForUser, postFetch, putFetch };