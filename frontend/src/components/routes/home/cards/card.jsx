import React,{useState,useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//Charts
import { Doughnut,Bar } from 'react-chartjs-2';

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

function PrepareInterestData(nameData,ChangeUInterest){
    let interest = {};
        for(let i=0;i< Object.keys(nameData).length-2 ; i++){
            
            for (let ii=0; ii < nameData[i].interest.length; ii++){
                if(interest[nameData[i].interest[ii].name]){
                    
                    interest[nameData[i].interest[ii].name] += 1;
                }else{
                    
                    interest[nameData[i].interest[ii].name] = 1;
                }
            }
        }
    ChangeUInterest(interest);
}

function PrepareSkillsData(nameData,ChangeUSkills){
    let skills = {};
        for(let i=0;i< Object.keys(nameData).length-2 ; i++){
            
            for (let ii=0; ii < nameData[i].skills.length; ii++){
                if(skills[nameData[i].skills[ii].name]){
                    
                    skills[nameData[i].skills[ii].name] += 1;
                }else{
                    
                    skills[nameData[i].skills[ii].name] = 1;
                }
            }
        }
    let frase = '';
    Object.keys(skills).map((e)=>{
        frase += ` * ${e}`;
        return '';
    });
    ChangeUSkills(frase);
}

function PrepareLngData(nameData,ChangeULng){
    let lng = {};
        for(let i=0;i< Object.keys(nameData).length-2 ; i++){
            
            for (let ii=0; ii < nameData[i].languages.length; ii++){
                if(lng[nameData[i].languages[ii].name]){
                    
                    lng[nameData[i].languages[ii].name] += 1;
                }else{
                    
                    lng[nameData[i].languages[ii].name] = 1;
                }
            }
        }
    let frase = '';
    Object.keys(lng).map((e)=>{
        frase += ` * ${e}`;
        return '';
    });
    ChangeULng(frase);
}
function PrepareUPTData(nameData,ChangeUPT){
    let upt = {};
        for(let i=0;i< Object.keys(nameData).length-2 ; i++){
            
            for (let ii=0; ii < nameData[i].personalTraits.length; ii++){
                console.log(nameData[i].personalTraits[ii].groupId);
                if(upt[nameData[i].personalTraits[ii].groupId]){
                    
                    
                    upt[nameData[i].personalTraits[ii].groupId] = (nameData[i].personalTraits[ii].analysis+upt[nameData[i].personalTraits[ii].groupId]) /2;
                }else{
                    
                    upt[nameData[i].personalTraits[ii].groupId]= nameData[i].personalTraits[ii].analysis;
                }
            }
        }
    console.log(upt);
    ChangeUPT(upt);
}

// Preparar datos de empresas 

function PrepareJLngData(jobData,ChangeULng){
    let lng = {};
        for(let i=0;i< Object.keys(jobData).length-2 ; i++){
            
            for (let ii=0; ii < jobData[i].lng.length; ii++){
                if(lng[jobData[i].lng[ii].lng]){
                    
                    lng[jobData[i].lng[ii].lng] += 1;
                }else{
                    
                    lng[jobData[i].lng[ii].lng] = 1;
                }
            }
        }
    let frase = '';
    Object.keys(lng).map((e)=>{
        frase += ` * ${e}`;
        return '';
    });
    ChangeULng(frase);
}

function PrepareJStrData(jobData,ChangeJStr){
    let str = {};
        for(let i=0;i< Object.keys(jobData).length-2 ; i++){
            
            for (let ii=0; ii < jobData[i].str.length; ii++){
                if(str[jobData[i].str[ii].str]){
                    
                    str[jobData[i].str[ii].str] += 1;
                }else{
                    
                    str[jobData[i].str[ii].str] = 1;
                }
            }
        }
    let frase = '';
    Object.keys(str).map((e)=>{
        frase += ` * ${e}`;
        return '';
    });
    ChangeJStr(frase);
}

const Card = (props) =>{

    const [cardflipped,setCardFlipped] = useState(false);
    const [uInter,setUInter] = useState(null);
    const [uSkills,setUSkills] = useState(null);
    const [uLng,setLng] = useState(null);
    const [uPT, setUPT] = useState(null);
    const [jLng, setJLng] = useState(null);
    const [str, setStr] = useState(null);

    useEffect(()=>{
        if(props.state.loading){
            RequestData(props.ChangeNameData,props.ChangeJobData,props.SwitchLoading);
        }
    // eslint-disable-next-line
    },[]);
    useEffect(()=>{
        if(!props.state.loading){
            PrepareInterestData(props.state.nameData, setUInter);
            PrepareSkillsData(props.state.nameData, setUSkills);
            PrepareLngData(props.state.nameData, setLng);
            PrepareUPTData(props.state.nameData, setUPT);
            PrepareJLngData(props.state.jobData, setJLng);
            PrepareJStrData(props.state.jobData, setStr)
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
                                <div className='card-display-row'>
                                    <div className='card-display-column'>
                                    <p>Nombre: {props.state.nameData.name.toUpperCase()}</p>
                                <p>Tamaño del muestreo: {props.state.nameData.size}</p>
                                {uInter && 
                                    <div className='graph_holder'>    
                                        <Doughnut 
                                        
                                        data={{
                                            labels: Object.keys(uInter),
                                            datasets: [{
                                                
                                                data: Object.values(uInter),
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
                                }
                                {uPT && 
                                    <div className='graph_holder'>    
                                        <Bar 
                                        options={{ maintainAspectRatio: false }}
                                        data={{
                                            labels: Object.keys(uPT),
                                            datasets: [{
                                                label: 'Personality Traits',
                                                data: Object.values(uPT),
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
                                }
                                {uSkills && 
                                    <div className='graph_holder'>    
                                        <p>Las personas con este nombre se enfocan en:</p>
                                        {uSkills}
                                    </div>
                                }
                                {uLng && 
                                    <div className='graph_holder'>    
                                        <p>y saben los siguientes idiomas:</p>
                                        {uLng}
                                    </div>
                                }

                                    </div>
                                    <div className='card-display-column'>
                                        <p>Palabra Clave: {props.state.jobData.job.toUpperCase()}</p>
                                        <p>Tamaño del muestreo: {props.state.jobData.size}</p>
                                        {
                                            jLng &&
                                            <>
                                                <p>Lenguajes requeridos:</p>
                                                <p>{jLng}</p>
                                            </>
                                        }
                                        {
                                            str &&
                                            <>
                                                <p>fortalezas mas requeridas:</p>
                                                <p>{str}</p>
                                            </>
                                        }
                                    </div>
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
    SwitchLoading,
})(Card);