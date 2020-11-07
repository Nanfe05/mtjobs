# Curious data with the info retrieved from Torre.co

The idea is to get interesting data from Torre and associate it to a name or keyword in order to analyze it and display some curious data. For example, people with the name "Carlos" what language in general they know, what are their skills, strengths, and personality traits.

The server fist consults their' name' in Torre's API, then with de total ex: 2700 matches. It searches 2 or 5 random Id of opportunities or name within that total and then compiles the relevant info to send to the frontend, the idea is to not use the same data and do not select the first matches always.



## Instructions

Submit a name you want to know: the average of skills, languages, strengths, and interests of people with that name, all values come from real profiles and they are selected in a random way.

Submit a job's keyword that you would like to know an average of language and strengths required.

** Some values may not be displayed due to the randomness and that causes the server to select some profiles that don't have the info required.

** To solve this: just refresh or try again.

### Frontend Libraries and Frameworks:

- ReactJS

- React Hooks

- Axios

- MaterialUI

- Redux

- React Router

- Sass

- axios

- chart.js

### Backend Libraries and Frameworks:

- NodeJS

- ExpressJS

- Nodemon

- axios

### Devops:

- Google Cloud

- Nginx

The frontend is served by an Nginx server and the server to consult Torre's data and handle frontend request runs with NodeJS.
