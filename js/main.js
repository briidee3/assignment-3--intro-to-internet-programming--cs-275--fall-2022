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

        // cover image (including credit + url)
        let cover_image = currSlide.appendChild(document.createElement(`img`));
        cover_image.setAttribute(`class`, `cover_image`);
        cover_image.setAttribute(`src`, json[i].cover_image.path);
        cover_image.setAttribute(`alt`, json[i].cover_image.alt_content);
        let coverCredit = cover_image.appendChild(document.createElement(`h4`));
        let coverCreditUrl = `<a href=${json[i].cover_image.url}>`
            + json[i].cover_image.credit + `</a>`;
        coverCredit.innerHTML = `Credit: ${coverCreditUrl}`;

        // review
        let review = currSlide.appendChild(document.createElement(`p`));
        review.setAttribute(`class`, `review`);
        review.innerHTML = json[i].review.content;
        let reviewSrc = review.appendChild(document.createElement(`h4`));
        let reviewSrcUrl = `<a href=${json[i].review.url}>`
            + json[i].review.source + `</a>`;
        reviewSrc.innerHTML = `—${reviewSrcUrl}`;



        // append currSlide to carouselSlides
        carouselSlides.appendChild(currSlide);

    }

};
