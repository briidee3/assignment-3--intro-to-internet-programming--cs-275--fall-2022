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


    // set up click functionality for arrows
    let arrows = document.getElementsByClassName(`carousel-navigation`)[0].children;
    let leftArrow = arrows[0];
    let rightArrow = arrows[1];
    // offset is for continuity and simplicity/efficiency (no need to rewrite functions)
    let offset = 0; // default offset is 0
    // slides is needed here for the left arrow conditional
    let slides = document.getElementsByClassName(`slides`);

    // function to hide arrows when necessary
    let hideArrows = () => {
        // left arrow
        if (offset === 1 - slides.length)
            leftArrow.id = `hidden`;
        else
            leftArrow.id = ``;
        // right arrow
        if (offset === 0)
            rightArrow.id = `hidden`;
        else
            rightArrow.id = ``;
    };
    // initialization call
    hideArrows();


    // left arrow functionality
    // click
    leftArrow.addEventListener(`click`, () => {
        if (!(offset === 1 - slides.length))
            offset = shiftSlides(`left`, offset);
        hideArrows();
    });
    // arrow key
    document.addEventListener(`keydown`, (key) => {
        if (key.key === `ArrowLeft` && !(offset === 1 - slides.length))
            offset = shiftSlides(`left`, offset);
        hideArrows();
    });

    // right arrow functionality
    // click
    rightArrow.addEventListener(`click`, () => {
        if (!(offset === 0))
            offset = shiftSlides(`right`, offset);
        hideArrows();
    });
    // arrow key
    document.addEventListener(`keydown`, (key) => {
        if (key.key === `ArrowRight` && !(offset === 0))
            offset = shiftSlides(`right`, offset);
        hideArrows();
    });

};


// function to move slides left or right, for use with arrows
let shiftSlides = (dir, offset) => {
    if (dir === `left`) {
        offset--;
        positionSlides(offset);
    }
    else if (dir === `right`) {
        offset++;
        positionSlides(offset);
    }

    return offset; // return offset for further use
};


// place each slide in a horizontal line
let positionSlides = (offset) => {
    let slides = document.getElementsByClassName(`slides`);
    let slideWidth = 640 + 40;
    console.log(slides.length);
    for (let i = 0; i < slides.length; i++) {
        console.log(slides[i].style.left = `${(i + offset) * slideWidth}px`);
    }
};


// utilize the jsonp (data.json) file and organize the slides
// for the carousel for each element in the jsonp file
let albums = (json) => {

    // initialize reference to DOM element for ease of use
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
        album.innerHTML = json[i].album;

        // artist
        let artist = currSlide.appendChild(document.createElement(`a`));
        artist.setAttribute(`href`, json[i].url);
        artist.innerHTML = json[i].artist;

        // cover image
        let cover_image = currSlide.appendChild(document.createElement(`img`));
        cover_image.setAttribute(`src`, json[i].cover_image.path);
        cover_image.setAttribute(`alt`, json[i].cover_image.alt_content);
        // cover image credit
        let coverCredit = currSlide.appendChild(document.createElement(`h4`));
        let coverCreditUrl = `<a href=${json[i].cover_image.url}>`
            + json[i].cover_image.credit + `</a>`;
        coverCredit.innerHTML = `Credit: ${coverCreditUrl}`;

        // review
        let review = currSlide.appendChild(document.createElement(`p`));
        review.innerHTML = json[i].review.content;
        // review source
        let reviewSrc = currSlide.appendChild(document.createElement(`h3`));
        let reviewSrcUrl = `<a href=${json[i].review.url}>`
            + json[i].review.source + `</a>`;
        reviewSrc.innerHTML = `—${reviewSrcUrl}`;


        // append currSlide to carouselSlides
        carouselSlides.appendChild(currSlide);

    }

    positionSlides(0);

};
