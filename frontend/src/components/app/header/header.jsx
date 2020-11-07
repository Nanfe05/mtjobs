import React from 'react';



const Header = () =>{
    return(
        <>
            <div className='fondo'
            style={{
                position:'absolute',
                width:"100vw",
                height:'100vh',
                top:'0',
                left:'0',
                backgroundImage:`url(/assets/pattern-01.png)`,
                zIndex:-1,
                opacity:0.3
            }}
            ></div>
        <div className='header'>
            <img style={{
                width:'100px',
            }}
            src='/assets/logo-01.png' alt='did you know jobs'/>
        </div>
        </>
    );
};


export default Header;