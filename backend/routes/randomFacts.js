var express = require('express')
var router = express.Router()

const axios = require('axios');
const { response, json } = require('express');


const names=[
    ['laura','maria','angie','karen','natalia','daniela','diana','andrea','paola','valentina','paula','katherine','angela','luisa','alejandra'],
    ['andres','juan','sebastian','diego','david','alejandro','julian','cristian','carlos','camilo','jose','ivan','sergio','daniel','santiago']
];

const jobs = ['react','vue','angular','python','django','firebase','java','c#','c++','rust'];

async function AddProfiles(sizeOfProfiles,name,size){
    let profiles = {};

    // i debe ser el numero de perfiles que se quieren analizar
    let profilesQuantity = size;
    for(i=0;i<profilesQuantity;i++){
        // Generar un numero general entre todos los candidatos
        let number = Math.round(Math.random() * sizeOfProfiles - 1); //Math.random() * (max - min) + min;
        // Checkear los profiles random para sacar nickname
        let response = await axios.post(`https://search.torre.co/people/_search/?offset=${number}&size=1&aggregate=false`,{"name":{term:name}});
        profiles[i] = {
            ...profiles[i],
            username: response.data.results[0].username,
            randomNumber:number
        };
    }

    // Buscar Fortalezas , Personalidad , Intereses e idiomas
    // Fortalezas https://bio.torre.co/api/bios/${user_nickname}/strengths-skills?locale=es
    // Intereses https://bio.torre.co/api/bios/${user_nickname}/interests
    // Lenguajes https://bio.torre.co/api/bios/${user_nickname}/languages?locale=es
    // Personalidad https://bio.torre.co/api/bios/${user_nickname}/tests/personality-traits/analysis

    for(i=0; i<profilesQuantity; i++){
        let user_nickname = profiles[i].username;
        let interest = await axios.get(`https://bio.torre.co/api/bios/${user_nickname}/interests`);
        let skills = await axios.get(`https://bio.torre.co/api/bios/${user_nickname}/strengths-skills?locale=es`);
        let languages = await axios.get(`https://bio.torre.co/api/bios/${user_nickname}/languages?locale=es`);
        let personalTraits = await axios.get(`https://bio.torre.co/api/bios/${user_nickname}/tests/personality-traits/analysis`);

        let inter = [];
        let sklls =[];
        let lng = [];
        let prt = [];

        if(interest.data.length > 0){
            for(ii=0; ii<interest.data.length;ii++ ){
                inter.push({
                    name: interest.data[ii].name
                });
            }
        }
        if(skills.data.length > 0){
            for(ii=0; ii<skills.data.length;ii++ ){
                sklls.push({
                    name: skills.data[ii].name
                });
            }
        }
        if(languages.data.length > 0){
            for(ii=0; ii<languages.data.length;ii++ ){
                lng.push({
                    name: languages.data[ii].language,
                    xp: languages.data[ii].fluency
                });
            }
        }
        if(personalTraits.data){
            prt = personalTraits.data.analyses;
        }


        profiles[i]={
            // ...profiles[i], // Commented to keep privacy of users
            interest: inter,
            skills: sklls,
            languages: lng,
            personalTraits:prt,

        };
    }

    return profiles;
}

async function AddJobs(sizeOfJobs,job,size){
    let jobs = {};

    // i debe ser el numero de perfiles que se quieren analizar
    let jobsQuantity = size;
    for(i=0;i<jobsQuantity;i++){
        // Generar un numero general entre todos los candidatos
        let number = Math.round(Math.random() * sizeOfJobs - 1); //Math.random() * (max - min) + min;
        
        // Checkear los jobs random para sacar nickjob
        let response = await axios.post(`https://search.torre.co/opportunities/_search/?offset=${number}&size=2&aggregate=false`,{
            "skill/role":{"text":job,"experience":"potential-to-develop"}
        });
        
        jobs[i] = {
            ...jobs[i],
            jobId: response.data.results[0].id,
            randomNumber:number
        };
    }

    // Buscar Fortalezas , Personalidad , Intereses e idiomas

    for(i=0; i<jobsQuantity; i++){
        let jobId = jobs[i].jobId;
        let job = await axios.get(`https://torre.co/api/opportunities/${jobId}`);
        let lng = [];
        let str = [];
        

        for(ii=0;ii<job.data.languages.length;ii++){
            lng.push({
                lng: job.data.languages[ii].language.name,
                xp: job.data.languages[ii].fluency
            });
        }
        let compensation = job.data.compensation.visible ? {
            min: job.data.compensation.minAmount,
            max: job.data.compensation.maxAmount,
            periodicity: job.data.compensation.periodicity
        }: 0; 


        for(ii=0;ii<job.data.strengths.length;ii++){
            str.push({
                str: job.data.strengths[ii].name,
                xp: job.data.strengths[ii].experience
            });
        }

        jobs[i]={
            // ...jobs[i], // Commented to keep privacy of users
            lng,
            compensation,
            str
        };
    }

    return jobs;
}

// Random Name
router.post('/name',async(req,res)=>{
    try{
        let name = '';
        let size = 2;
    
        if(req.body.name){
            name = req.body.name;
        }else{
            const randomGender = Math.round(Math.random() * (names.length - 1) + 0 ); //Math.random() * (max - min) + min;
            const randomName = Math.round(Math.random() * (names[randomGender].length - 1)+ 0);
            name = names[randomGender][randomName];
        }
        if(req.body.size){
            size = req.body.size;
        }
    
        const response = await axios.post(`https://search.torre.co/people/_search/?offset=0&size=1&aggregate=false`,{"name":{term:name}});
    
        // Search for ${size} random names 
    
        const info = await AddProfiles(response.data.total,name,size);
       
        info.name=name;
        info.size=size;
    
        res.json(info);
    }catch(err){
        res.sendStatus(404).json({
            error:{
                msg:'Error en el servidor'
            }
        });
        console.log(err);
    }
});


// Random Job
router.post('/job',async (req,res)=>{
    try{
        let job = '';
        let size = 2;
    
        if(req.body.job){
            job = req.body.job;
        }else{
            const randomJob = Math.round(Math.random() * (jobs.length - 1) + 0 ); //Math.random() * (max - min) + min
            job = jobs[randomJob];
        }
        if(req.body.size){
            size = req.body.size;
        }
    
        const response = await axios.post(`https://search.torre.co/opportunities/_search/?offset=0&size=2&aggregate=false`,{
            "skill/role":{"text":job,"experience":"potential-to-develop"}
        });
        const info = await AddJobs(response.data.total,job,size);
    
        info.job=job;
        info.size = size;
    
        res.json(info);
    }catch(err){
        res.sendStatus(404).json({
            error:{
                msg:'Error en el servidor'
            }
        });
        console.log(err);
    }
});

module.exports = router