import React,{useState,useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import {connect} from 'react-redux';

import {ChangeName, ChangeJob ,ChangeJobData,ChangeNameData} from '../../../../store/actions/appActions';

const axios = require('axios');

const Card = (props) =>{

    const [cardflipped,setCardFlipped] = useState(false);

    useEffect(async()=>{
        if(props.loading){
                if(props.nameData){
                    let curiousName = await axios.post('randomfacts/name',{});
                    props.ChangeNameData(curiousName);
                }
                if(!props.jobData){
                    let curiousJob = await axios.post('randomfacts/name',{});
                    props.ChangeJobData(curiousJob);
                }
        }
    },[props.loading]);


    return(
            <div className='cardMain'>
                <div className="flip-card">
                    <div className={`flip-card-inner ${cardflipped ? 'flip-card-flipped':''}`}>
                        
                    {
                            props.state.loading ? 
                            <div className='loading'>
                                <CircularProgress/>
                            </div>
                            :
                            <>                           
                            <div className="flip-card-front">
                                fadsfs
                                <Button className='MtJBoton' onClick={()=>{
                                    setCardFlipped(!cardflipped);
                                }}>Intentalo!</Button>
                            </div>
                            <div className="flip-card-back">
                                <TextField 
                                className='inputText'
                                label='Ingresa un nombre:' 
                                placeholder='Adrian' 
                                value={props.state.name} 
                                onChange={(e)=>{
                                    props.ChangeName(e.target.value);
                                }}
                                />
                                <TextField 
                                className='inputText'
                                label='Ingresa un skill del trabajo:' 
                                placeholder='ReactJS' 
                                value={props.state.job} 
                                onChange={(e)=>{
                                    props.ChangeJob(e.target.value);
                                }}
                                />
                                <Button className='MtJBoton' onClick={()=>{
                                    setCardFlipped(!cardflipped)}}
                                    >Consultar</Button>
                            </div>
                            </>
                        }

                    </div>
                </div>
            </div>
    );
}

const mapStateToProps = state =>({
    state: state
})

export default connect(mapStateToProps,{
    ChangeName,
    ChangeJob,
    ChangeJobData,
    ChangeNameData
})(Card);