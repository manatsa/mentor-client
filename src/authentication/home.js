import React from 'react';
import useAuth from '../auth/useAuth';



const Home = () => {
    const { onLogin } = useAuth();

    return (
        <h2>Home (Public)</h2>
    )
};

export default Home;