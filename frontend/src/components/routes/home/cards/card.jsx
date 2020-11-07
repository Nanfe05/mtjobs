import React,{useState,useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//Charts
import { Doughnut } from 'react-chartjs-2';

import {connect} from 'react-redux';

import {ChangeName, ChangeJob ,ChangeJobData,ChangeNameData,SwitchLoading} from '../../../../store/actions/appActions';

const axios = require('axios');

async function RequestData(ChangeNameData,ChangeJobData,SwitchLoading){
    let curiousName = await axios.post('randomfacts/name');
    ChangeNameData(curiousName.data);
    let curiousJob = await axios.post('randomfacts/job');
    ChangeJobData(curiousJob.data);
    SwitchLoading();
}

function PrepareInterestData(nameData){
    let interest = {};
        for(let i=0;i< Object.keys(nameData).length-2 ; i++){
            console.log('numero muestreo:', Object.keys(nameData).length);
            for (let ii=0; ii < nameData[i].interest.length; ii++){
                if(interest[nameData[i].interest[ii].name]){
                    console.log('ljdfls');
                    interest[nameData[i].interest[ii].name] += 1;
                }else{
                    console.log('ljdfls');
                    interest[nameData[i].interest[ii].name] = 1;
                }
            }
        }
    console.log(nameData);
//    return interest;
}

const Card = (props) =>{

    const [cardflipped,setCardFlipped] = useState(false);

    useEffect(()=>{
        if(props.state.loading){
            RequestData(props.ChangeNameData,props.ChangeJobData,props.SwitchLoading);
        }
    // eslint-disable-next-line
    },[]);
    useEffect(()=>{
        if(!props.state.loading){
            PrepareInterestData(props.state.nameData, props.state.loading);
        }
    // eslint-disable-next-line
    },[props.state.nameData, props.state.loading]);
    // Preparar intereses
    

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
                                <p>Nombre: {props.state.nameData.name.toUpperCase()}</p>
                                <p>Tamaño del muestreo: {props.state.nameData.size}</p>
                                <div className='graph_holder'>    
                                    <Doughnut 
                                    
                                    data={{
                                        labels: [],
                                        datasets: [{
                                            label: '# of Votes',
                                            data: [12, 19, 3, 5, 2, 3],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)'
                                            ]
                                        }]}}
                                    />
                                </div>
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
    ChangeNameData,
    SwitchLoading
})(Card);