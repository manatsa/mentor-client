import React, { useEffect } from "react";
import GreyScaleGirl from './assets/home/grey_scale_girl.svg';
import BackToSchoolKids from './assets/home/back_to_school_kids.svg';
import Redcap from './assets/home/redcap.svg';
import StudentStudying from './assets/home/student_studying.svg';
import { Carousel } from "react-bootstrap";
import Toasting from "./utils/notification/toasting";
import { toast, Zoom } from "react-toastify";
import useAuth from "./auth/useAuth";
import useGeneralContext from "./context/general/use-general-context";
import { getFetchWithProps, getFetch } from "./services/fetcher";
import AudioPlayer from "./components/audio/audio-player";
import GetAuthorities from "./utils/static-data/static-api-calls";

const Home = () => {


    const login=localStorage.getItem('user');
    //console.log("User String :",login)
    let  user=null;
    try{
        user=(login)?JSON.parse(login):null;
    }catch(e){
        console.log('USER ERROR :',e);
    }
    //localStorage.removeItem('user')

    useEffect(() => {
        if (user && user?.token &&user?.authorities && user?.authorities.includes('ROLE_ADMIN')) {
            const url = "/authorities";
            const callApi = async () => {
                let res = await getFetch(url, user);
                console.log(JSON.stringify(res))
                let roleString=await JSON.stringify(res)
                //alert(roleString)
                localStorage.setItem('roles',roleString);
            };

            //callApi();
        }else{
            //console.log('this user is not admin')
        }

    }, []);

    //alert('ROLES : ',GetAuthorities(user))


    return (

        <div className="jumbotron">
            <Carousel variant="dark" style={{ padding: '30px' }}>
                <Carousel.Item style={{ border: '5px solid lightgray', borderRadius: '20px' }}>
                    <img
                        className="d-block w-100" width={'100%'} height={'600px'}
                        src={BackToSchoolKids}
                        alt="First slide"
                    />

                    <Carousel.Caption>
                        <h3>ABOUT US</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ border: '5px solid lightgray', borderRadius: '20px' }}>
                    <img
                        className="d-block w-100" width={'100%'} height={'600px'}
                        src={GreyScaleGirl}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>ABOUT US</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ border: '5px solid lightgray', borderRadius: '20px' }}>
                    <img
                        className="d-block w-100" width={'100%'} height={'600px'}
                        src={Redcap}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>E-LEARNING</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ border: '5px solid lightgray', borderRadius: '20px' }}>
                    <img
                        className="d-block w-100" width={'100%'} height={'600px'}
                        src={StudentStudying}
                        alt="Fourth slide"
                    />

                    <Carousel.Caption>
                        <h3>INTERNET AND THE FUTURE</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Toasting />
            {/*<AudioPlayer />*/}
        </div>
    )
}


export default Home;


