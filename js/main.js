
var RANDOM_ID_ARRAY = [];
var NUMBER_OF_DIAMONDS;
var ENABLE_HINT = true;
var APP_DATA_STRING = sessionStorage.getItem("APP_DATA");
var APP_DATA = APP_DATA_STRING ? JSON.parse(APP_DATA_STRING) : {};
var RELOAD_SAVED_PROGRESS = false;

function init() {
    var self = this;

    var mainContainer = document.getElementsByClassName("main-container")[0];
    var toggleHintCheckbox = document.getElementById("toggleHintCheckbox");
    var saveProgressButton = document.getElementById("saveProgress");
    var reloadPreviousSavePointButton = document.getElementById("reloadPreviousSavePoint");

    document.getElementById('score').innerHTML = (APP_DATA["Score"] && RELOAD_SAVED_PROGRESS) ? APP_DATA["Score"] : 64;

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    RANDOM_ID_ARRAY = generateRandomIDs();

    // creating all cells
    for (var i = 0; i < 8; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 8; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(" ");
            var imageNode = document.createElement('img');
            imageNode.id = i + "" + j;
            imageNode.classList.add("image");
            if (APP_DATA[imageNode.id] && RELOAD_SAVED_PROGRESS) {
                imageNode.src = APP_DATA[imageNode.id].ImageSource;
                imageNode.clicked = APP_DATA[imageNode.id]["clicked"];
            } else {
                imageNode.src = 'images/question_mark.png';
            }
            cell.appendChild(imageNode);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    mainContainer.appendChild(tbl);
    tbl.setAttribute("border", "1");

    mainContainer.addEventListener('click', onCellClick, false);
    toggleHintCheckbox.addEventListener('click', onCheckBoxClick, false);
    saveProgressButton.addEventListener('click', saveProgressButtonClick, false);
    reloadPreviousSavePointButton.addEventListener('click', reloadPreviousSavePointButtonClick, false);
};

generateRandomIDs = function () {
    //generate random ids
    RANDOM_ID_ARRAY = [];
    for (var m = 0; m < 100; m++) {
        var randomID = Math.floor((Math.random() * 8)) + "" + Math.floor((Math.random() * 8));
        if (RANDOM_ID_ARRAY.indexOf(randomID) == -1) {
            RANDOM_ID_ARRAY.push(randomID);
        }
        if (RANDOM_ID_ARRAY.length == 10) {
            break;
        }
    }
    return RANDOM_ID_ARRAY;
}

init();
