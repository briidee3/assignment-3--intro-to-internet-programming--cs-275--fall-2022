// Assignment 3: Intro to Internet Programming (CS275)
// Bri D'Urso
// November 2022

window.onload = () => {

    // load data.json (JSONP file) into the webpage
    let body = document.querySelector(`body`);
    let jsonpScript = document.createElement(`script`);
    jsonpScript.setAttribute(`src`, `json/data.json`);
    jsonpScript.setAttribute(`id`, `jsonpSrc`);
    body.appendChild(jsonpScript);

};

// utilize the jsonp (data.json) file and organize the slides
// for the carousel for each element in the jsonp file
let albums = (json) => {

    console.log(json);
};
