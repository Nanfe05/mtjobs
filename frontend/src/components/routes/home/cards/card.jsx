import React from 'react';



const Card = (props) =>{
    return(
        
            <div className='cardMain'>
                {props.children}
            </div>
      
    );
}

export default Card;