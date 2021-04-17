/**** DAZZLE WORDS ****/

/*
    Words made of letters made of small shapes with rotating colors
*/

/*
    TODO: Refactor HTML to use JS to display any word or phrase by pulling from module
    TODO: Create form to get user input for desired word or phrase
*/

import { letters } from './letters.js'; // FIXME: Import from module

window.addEventListener("load", function() {
    init();
});

function init() {

    // Get some objects from page
    let dots = document.getElementsByClassName("dot");

    // Assign shape and animation
    function setDots() {
        let choice;
        for (let i=0; i < dots.length; i++) {
            // Set shape
            choice = randomize(3);
            if (choice === 0) {
                dots[i].style.borderRadius = "50%";
            } else if (choice === 1) {
                dots[i].style.borderRadius = "50% 0";
            } else if (choice === 2) {
                dots[i].style.borderRadius = "0 50%";
            }
            // Set animation
            dots[i].style.animation = "rotate " + randomize(11, 2) + "s infinite";
        }
    }

    // Initialize board
    setDots();


    /** Miscellaneous Helper Functions **/

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(rgb) {
        // parse rgb as string of code to get individual numbers
        let paren1 = rgb.indexOf("(");
        let comma1 = rgb.indexOf(",");
        let r = Number(rgb.slice(paren1+1,comma1));
        rgb = rgb.slice(comma1+1);
        let comma2 = rgb.indexOf(",");
        let paren2 = rgb.indexOf(")");
        let g = Number(rgb.slice(0,comma2));
        let b = Number(rgb.slice(comma2+1,paren2));
        // convert and concatenate to hex code string
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function randomize(max = 100, min = 0, dec = 0) {
        let factor = 10 ** dec;
        return Math.floor(factor * Math.random() * (max - min)) / factor + min;
    }

}

