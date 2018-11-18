function toggleMain() {
    let toggleContent = document.getElementById("mainContent");
    let toggleButton = document.getElementById("startGame");

    if (toggleContent.style.display == "") {
        toggleContent.style.display = "block";
    } else {
        toggleContent.style.display = "";
    }

    if (toggleButton.innerHTML === "Start") {
        toggleButton.innerHTML = "End";
        toggleButton.classList.remove("btn-outline-success");
        toggleButton.classList.add("btn-outline-danger");
    } else {
        toggleButton.innerHTML = "Start";
        toggleButton.classList.remove("btn-outline-danger");
        toggleButton.classList.add("btn-outline-success");
    }

    /* if (toggleContent.style.display == "") {
        endGame();
    } else {
        startGame();
    } */

    (toggleContent.dataset.toggled ^= 1) ? startGame() : endGame();
}

let game = {
    appName: "",
    appLetters: [],
    appHint: "",
    numberOfLetters: 0,
    letterChosen: "",
    numberOfLettersMatched: 0,
    numberOfTotalTries: 0,
    numberOfTriesRemaining: 0,
    numberOfWins: 0,
    numberOfLosses: 0,

    updateAppName: function (val) {
        this.appName = val;
    },
    updateAppHint: function (val) {
        this.appHint = val;
    },
    updateNumberOfLetters: function (val) {
        this.numberOfLetters = val;
    },
    updateLetterChosen: function (val1, val2) {
        if (val2) {
            this.letterChosen = val1;
            let element = document.createElement("p");
            element.appendChild(document.createTextNode(val1));
            element.style.cssText = "display:inline-block;padding-right:5px;";
            document.getElementById("guessedLetters").appendChild(element);
        } else {
            let elementNode = document.getElementById("guessedLetters");
            while (elementNode.firstChild) {
                elementNode.removeChild(elementNode.firstChild);
            }
            this.numberOfLettersMatched = 0;
        }
    },
    updateNumberOfTotalTries: function (val) {
        this.numberOfTotalTries = val;
    },
    updateNumberOfTriesRemaining: function (val) {
        this.numberOfTriesRemaining = val;
        document.getElementById("guessesLeftCount").innerText = val;
    },
    updateNumberOfWins: function (val) {
        this.numberOfWins = val;
        document.getElementById("winCount").innerText = val;
    },
    updateNumberOfLosses: function (val) {
        this.numberOfLosses = val;
        document.getElementById("lossCount").innerText = val;
    },

    updateAppLetters: function (val) {
        if (val) {
            for (let i = 0; i < this.numberOfLetters; i++) {
                this.appLetters.push(this.appName.charAt(i));
            }
        } else {
            this.appLetters.length = 0;
        }
    },

    updateDashes: function (val) {
        if (val) {
            for (let i = 0; i < this.numberOfLetters; i++) {
                let element = document.createElement("p");
                element.appendChild(document.createTextNode("_"));
                element.style.cssText = "display:inline-block;padding-right:5px;";
                setAttributes(element, {
                    "class": this.appName.charAt(i) + "_char"
                });

                document.getElementById("currentApp").appendChild(element);
            }
        } else {
            let elementNode = document.getElementById("currentApp");
            while (elementNode.firstChild) {
                elementNode.removeChild(elementNode.firstChild);
            }
        }
    },

    reset: function (val) {
        this.updateAppName("");
        this.updateAppHint("");
        this.updateNumberOfLetters(0);
        this.updateLetterChosen("", false);
        this.updateNumberOfTotalTries(0);
        this.updateNumberOfTriesRemaining(0);
        this.updateNumberOfWins(0);
        this.updateNumberOfLosses(0);
        this.updateAppLetters(false);
        this.updateDashes(false);
    },
}

let appList = [{
    n: "facebook",
    h: "Was launched by Mark Zuckerberg"
},
{
    n: "instagram",
    h: "Was created by Kevin Systrom and Mike Krieger"
},
{
    n: "linkedin",
    h: "It's a business and employment-oriented service that operates via websites and mobile apps"
},
{
    n: "snapchat",
    h: "Was created by Evan Spiegel, Bobby Murphy, Reggie Brown"
},
{
    n: "twitter",
    h: "Originally, the content was restricted to 140 characters"
},
{
    n: "youtube",
    h: "Used to view videos and owned by the Goog"
}
];

function shuffleAppList(arr) {
    let i = arr.length;
    let temp;
    let arrayIndex;

    while (i > 0) {
        arrayIndex = Math.floor(Math.random() * i);
        i--;
        temp = arr[i];
        arr[i] = arr[arrayIndex];
        arr[arrayIndex] = temp;
    }
    return arr;
}

function startGame() {
    appList = shuffleAppList(appList);

    let appListCount = appList.length;
    let totalWinCount = 0;
    let totalLossCount = 0;

    game.updateNumberOfWins(totalWinCount);
    game.updateNumberOfLosses(totalLossCount);

    for (let i = 0; i < appListCount.length; i++) {
        game.updateDashes(false);
        game.updateLetterChosen("", false);

        let appNameChosen = appList[i].n;
        game.updateAppName(appNameChosen);

        let appNameHintChosen = appList[i].h;
        game.updateAppHint(appNameHintChosen);

        game.updateNumberOfLetters(appNameChosen.length);
        game.updateNumberOfTotalTries(appNameChosen.length);
        game.updateNumberOfTriesRemaining(appNameChosen.length);

        game.updateAppLetters(true);
        game.updateDashes(true);

        for (let i = 0; i < appNameChosen.length; i++) {
            document.onkeyup = function (event) {

                let userInput = event.key.toLowerCase();

                game.updateNumberOfTriesRemaining(game.numberOfTriesRemaining - 1);
                game.updateLetterChosen(userInput, true);

                if (game.appLetters.includes(userInput)) {
                    let inputIndex = appNameChosen.indexOf(userInput);
                    let x = document.getElementsByClassName(userInput + "_char");
                    for (let j = 0; j < x.length; j++) {
                        x[j].innerHTML = userInput;
                        game.numberOfLettersMatched++;
                    }
                }
            }
        }
        scoreUpdate();
    }
}

function endGame() {
    game.reset();
}

function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function resetGame() {
    game.updateDashes(false);
    game.updateLetterChosen("", false);
    startGame();
}

function scoreUpdate() {
    if (game.numberOfTriesRemaining != game.numberOfTotalTries) {
        if (appNameChosen.length === game.numberOfLettersMatched) {
            game.updateNumberOfWins(totalWinCount + 1);
        } else if (game.numberOfTriesRemaining === 0) {
            game.updateNumberOfLosses(totalLossCount + 1);
        } else {
            alert("NO Change!");
        }
    } else { alert("Starting!") };
}
