/**** DAZZLE WORDS ****/

/*
    Words made of chars made of small shapes with rotating colors
*/

/*
    TODO: Add the ability to switch color schemes
    TODO: Add the ability to change page background color
*/

import { chars, specials } from './chars.js';
// Note: this file and chars.js are both specified as modules in HTML head

// COLOR SCHEMES - For setting title, button, etc.; need to keep consistent with SCSS variables
const schemeA = {
    name: "rotateA",
    color01: "#6da129",
    color02: "#2ba17e",
    color03: "#2c6ba5",
    color04: "#2e2caf",
    color05: "#772ca3",
    color06: "#912ca5",
    color07: "#5b2ba8",
    color08: "#2c7da3",
    color09: "#2b9c80",
    color10: "#6ea02c"
}
const schemeB = {
    name: "rotateB",
    color01: "#cb771e",
    color02: "#d3a719",
    color03: "#cb9218",
    color04: "#af552c",
    color05: "#bb3122",
    color06: "#bb2a6e",
    color07: "#ab1db8",
    color08: "#b81f6e",
    color09: "#ba341c",
    color10: "#bd4816"
}
const schemeC = {
    name: "rotateC",
    color01: "#7fa411",
    color02: "#3a8e10",
    color03: "#2ba17e",
    color04: "#22a0c7",
    color05: "#0f85ce",
    color06: "#15bdc9",
    color07: "#0ebaa0",
    color08: "#1ac73d",
    color09: "#8ec918",
    color10: "#c5c51d"
}

window.addEventListener("load", function() {
    init();
});

function init() {

    // Get some objects from page
    const body = document.getElementsByTagName("body");
    const title = document.querySelector("#title");
    const form = document.querySelector("#form");
    const inputField = document.querySelector("#input");
    const button = document.querySelector("#button");
    const wordArea = document.querySelector("#word-area");
    const dots = document.getElementsByClassName("dot");
    const icons = document.getElementsByClassName("icons");

    // Variable color schemes
    const colorSchemes = [schemeA, schemeB, schemeC];

    // Initial values upon first loading
    let currentSchemeIndex = randomize(3);
    updateColors();

    // Update all objects affected by color scheme change
    function updateColors() {
        title.style.color = colorSchemes[currentSchemeIndex].color05;
        inputField.style.borderColor = colorSchemes[currentSchemeIndex].color05;
        button.style.backgroundColor = colorSchemes[currentSchemeIndex].color01;
        // Update animation for each dot if currently displaying content
        if (wordArea.innerHTML !== "") {
            for (let i=0; i < dots.length; i++) {
                dots[i].style.animation = `${colorSchemes[currentSchemeIndex].name} ${randomize(11, 2)}s infinite`;
            }
        }  
    }

    // Change color scheme when one of the color scheme icons is clicked 
    document.addEventListener("click", function(event) {
        console.log("icon clicked");
        for (let i=0; i < colorSchemes.length; i++) {
            if (event.target.id === colorSchemes[i].name) {
                console.log("match!")
                currentSchemeIndex = i;
                console.log("new index is " + currentSchemeIndex);
                updateColors();
            }
        }
    });

    // Find special character and get key name
    function getKeyByValue(value) {
        return Object.keys(specials).find(key => specials[key] === value);
    }

    // Form word from imported chars object
    function buildWord(word) {
        let result = "";
        for (let i=0; i < word.length; i++) {
            let currentChar = word[i];
            if (/^[-.,:;'"?!@#$%&()+=]+$/.test(currentChar)) {
                currentChar = getKeyByValue(currentChar);
                result += chars[currentChar];
            } else {
                result += chars[currentChar.toUpperCase()];
            }
        }
        return result;
    }

    // Check length of each word
    function hasLongWord(input) {
        // Split multiple words out into array
        let wordArray = input.split(" ");
        // Loop through and check length of each word
        for (let i=0; i < wordArray.length; i++) {
            if (wordArray[i].length > 9 ) {
                return true;
            }
        }
        return false;
    }

    // Build full string and send to page
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

    // Reset input field(s) without reloading page
    function clearForm() {
        inputField.value = "";
    }

    // Click events using event delegation
    form.addEventListener("submit", function(event) {
        // Validate to ensure alphanumeric, space, or certain special characters
        let re = /^[a-zA-Z0-9\-.,:;'"?!@#$%&()+=\s]+$/;
        if (inputField.value === "") {
            alert("\nOops! Your input was blank.");
        } else if (! re.test(inputField.value)) {
            alert("\nOops! One or more of your characters can't be bedazzled. Try again!");
        } else { // Display input graphically and reset form
            let viewWidth = window.innerWidth || document.documentElement.clientWidth || 
            document.body.clientWidth;
            if (viewWidth < 1000 && hasLongWord(inputField.value)) {
                alert("\nFor best results, each word should be no longer than 8-9 characters. Thank you! \n- Your Friendly Local Quality Assurance Specialist");
            }
            displayAllWords(inputField.value);
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
            dots[i].style.animation = `${colorSchemes[currentSchemeIndex].name} ${randomize(11, 2)}s infinite`;
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

