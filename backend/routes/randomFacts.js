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

        profiles[i]={
            ...profiles[i],
            interest: interest.data,
            skills: skills.data,
            languages: languages.data,
            personalTraits: personalTraits.data,
            // username:null,

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
        let response = await axios.post(`https://search.torre.co/opportunities/_search/?offset=0&size=2&aggregate=false`,{
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
        console.log('dsaf ',job.data);
        jobs[i]={
            ...jobs[i],
            languages: job.data.languages,
            compensation: job.data.compensation,
            strengths: job.data.strengths
        };
    }

    return jobs;
}

// Random Name
router.post('/name',async(req,res)=>{

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
   
    res.json(info);
});


// Random Job
router.post('/job',async (req,res)=>{

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
   
    res.json(info);
});

module.exports = router