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

    console.log(json.length);

    // initialize references to DOM elements for ease of use
    //let carousel = document.getElementsByClassName(`carousel`)[0];
    //let carouselNav = document.getElementsByClassName(`carousel-navigation`)[0];
    let carouselSlides = document.getElementsByClassName(`carousel-slides`)[0];

    // loop through data.json elements and implement each into the DOM tree
    for (let i = 0; i < json.length; i++) {

        // create and append new slide to carouselSlides as a child
        let currSlide = document.createElement(`div`);
        currSlide.setAttribute(`class`, `slides`);


        // gather each bit of data from current element of data.json
        // and append to currSlide with proper class names for CSS

        // album
        let album = currSlide.appendChild(document.createElement(`h2`));
        album.setAttribute(`class`, `album`);
        album.innerHTML = json[i].album;

        // artist
        let artist = currSlide.appendChild(document.createElement(`a`));
        artist.setAttribute(`class`, `artist`);
        artist.setAttribute(`href`, json[i].url);
        artist.innerHTML = json[i].artist;





        // append currSlide to carouselSlides
        carouselSlides.appendChild(currSlide);

    }

};
