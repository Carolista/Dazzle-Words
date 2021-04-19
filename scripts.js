/**** DAZZLE WORDS ****/

/*
    Words built from characters made of small shapes with rotating colors
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

// Variable color schemes
const colorSchemes = [schemeA, schemeB, schemeC];

// For dark mode & light mode
let darkColor = "#121212";
let lightColor = "#efefef"


// INITIAL LOADING & DYNAMIC STUFF
window.addEventListener("load", function() {
    init();
});

function init() {

    // Get some objects from page
    const body = document.querySelector("body");
    const title = document.querySelector("#title");
    const form = document.querySelector("#form");
    const inputField = document.querySelector("#input");
    const button = document.querySelector("#button");
    const wordArea = document.querySelector("#word-area");
    const dots = document.getElementsByClassName("dot");
    const optionsH3 = document.querySelector("h3");
    const iconGroups = document.getElementsByClassName("icon-group");
    const icons = document.getElementsByClassName("color-scheme-icon");
    const darkModeButton = document.querySelector("#dark-mode-button");
    const lightModeButton = document.querySelector("#light-mode-button"); 

    // Initial values upon first loading
    let currentMode = randomize(2) === 0 ? "dark" : "light"; // randomize default
    setMode();
    setIcons();
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
                dots[i].style.animation = `${colorSchemes[currentSchemeIndex].name} ${randomize(11, 2)}s infinite, fade-in 2s`;
            }
        }  
    }

    // Assign color schemes and variable rotation speeds to color selection icons
    function setIcons() {
        for (let i=0; i < iconGroups.length; i++) {
            for (let j=0; j < 4; j++) {
                icons[j+4*i].style.animation = `${colorSchemes[i].name} ${randomize(6, 2)}s infinite, fade-in 2s`;
            }  
        }
    }

    // To set dark or light mode - use after currentMode has just been set/switched
    function setMode() {
        if (currentMode === "dark") {
            body.style.backgroundColor = darkColor;
            optionsH3.style.color = lightColor;
        } else if (currentMode === "light") {
            body.style.backgroundColor = lightColor;
            optionsH3.style.color = darkColor;
        }
    }

    // Color scheme or mode changes
    document.addEventListener("click", function(event) {

        // If selecting a different color scheme
        for (let i=0; i < colorSchemes.length; i++) {

            // If clicked directly on icon
            for (let k=0; k < icons.length; k++) {
                // let currentIcon = icons[k];
                // let iconScheme = currentIcon.classList[0];
                // let indexOfScheme = colorSchemes.match(iconScheme.name);
                if (event.target === icons[k] && icons[k].classList[0] === colorSchemes[i].name) {
                    console.log("I clicked the thing");
                    currentSchemeIndex = i;
                    updateColors();
                }
            }
            // If clicked within foursquare but just outside icons
            for (let j=0; j < iconGroups.length; j++) {
                if (event.target === iconGroups[j] && iconGroups[j].classList[0][5] === colorSchemes[i].name[6]) {
                    console.log("I clicked the other thing");
                    currentSchemeIndex = i;
                    updateColors();
                }
            } 
        }   
        
        // If dark mode or light mode is clicked
        if (event.target === lightModeButton) {
            currentMode = "light";
            setMode();
        } else if (event.target === darkModeButton) {
            currentMode = "dark";
            setMode();
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
            dots[i].style.animation = `${colorSchemes[currentSchemeIndex].name} ${randomize(11, 2)}s infinite, fade-in 2s`;
        }
    }

    /** Miscellaneous Helper Functions **/

    function randomize(max = 100, min = 0, dec = 0) {
        let factor = 10 ** dec;
        return Math.floor(factor * Math.random() * (max - min)) / factor + min;
    }

}

