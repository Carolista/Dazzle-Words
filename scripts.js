/**** DAZZLE WORDS ****/

/*
    Words made of letters made of small shapes with rotating colors
*/

/*
    TODO: Refactor to accept multiple words - split on spaces
    TODO: Create form to get user input for desired word or phrase
    TODO: Implement form validation to ensure letters and spaces only
    TODO: Make somewhat responsive - max and min with vw scaling
    TODO: Add the ability to switch color schemes?
    TODO: Add the ability to change page background color?
*/

import { letters } from './letters.js'; // FIXME: Import from module

window.addEventListener("load", function() {
    init();
});

function init() {

    // Get some objects from page
    let userInput = document.querySelector("#input");
    let form = document.getElementById("form");
    let wordArea = document.querySelector("#word-area");
    let dots = document.getElementsByClassName("dot");

    // Form word from imported letters object
    function buildWord(word) {
        let result = "";
        for (let i=0; i < word.length; i++) {
            result += letters[word[i].toUpperCase()];
        }
        return result;
    }

    function displayAllWords(input) {
        // Reset display
        wordArea.innerHTML = "";
        // Split multiple words out into array
        let wordArray = input.split(" ");
        // Loop through and build each word one at a time
        for (let i=0; i < wordArray.length; i++) {
            let word = buildWord(wordArray[i]);
            wordArea.innerHTML += `<div class="word">${word}</div>`;
        }
        // Now that all divs with dot class exist on page
        setDots();
    }

    function clearForm() {
        userInput.value = "";
    }

    // Click events using event delegation
    form.addEventListener("submit", function(event) {
        // Validate to ensure alpha only with single spaces separating words
        let re = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
        if (! re.test(userInput.value)) {
            alert("\nOops! Please enter alphabetical characters and spaces only.")
        } else { // Display input graphically and reset form
            displayAllWords(userInput.value);
            clearForm();
        }
        event.preventDefault(); // prevent browser from reloading page
    });

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

