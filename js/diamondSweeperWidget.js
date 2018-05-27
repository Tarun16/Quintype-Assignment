onCellClick = function (event) {
    var imageID = event.target.id;
    var imageElement = document.getElementById(imageID);
    if (imageElement) {
        if (RANDOM_ID_ARRAY.indexOf(imageID) !== -1) {
            imageElement.src = 'images/diamond.png';
            NUMBER_OF_DIAMONDS ? NUMBER_OF_DIAMONDS++ : NUMBER_OF_DIAMONDS = 1;
        }
        else {
            imageElement.src = 'images/blank.jpg';
            if (ENABLE_HINT) {
                generateHint(imageID);
            }
        }

        if (!imageElement.clicked) {
            var oldScore = document.getElementById('score').innerHTML;
            var newScore = Number(oldScore) - 1;
            document.getElementById('score').innerHTML = newScore;
            imageElement.clicked = true;

        }
    }

    if (NUMBER_OF_DIAMONDS == 10) {
        var mainContainer = document.getElementsByClassName("main-container")[0];
        mainContainer.removeEventListener('click', onCellClick, false);
        setTimeout(function () {
            alert("Congratulations! Your score is: " + newScore);
        }, 500);
    }
};

onCheckBoxClick = function (checkbox) {
    if (document.getElementById("toggleHintCheckbox").checked) {
        ENABLE_HINT = true;
    } else {
        ENABLE_HINT = false;
    }
};

generateHint = function (imageID) {
    var imageX = imageID[0];
    var imageY = imageID[1];
    var shortestDistance = 0;
    var shortestDistanceDiamondID = "";
    for (var i = 0; i < RANDOM_ID_ARRAY.length; i++) {
        var diamondX = RANDOM_ID_ARRAY[i][0];
        var diamondY = RANDOM_ID_ARRAY[i][1];

        var distance = Math.sqrt(((Number(diamondY) - Number(imageY)) * (Number(diamondY) - Number(imageY))) + ((Number(diamondX) - Number(imageX)) * (Number(diamondX) - Number(imageX))));
        if (!shortestDistance && !document.getElementById(RANDOM_ID_ARRAY[i]).clicked) {
            shortestDistance = distance;
            shortestDistanceDiamondID = RANDOM_ID_ARRAY[i];
        } else if (shortestDistance > distance && !document.getElementById(RANDOM_ID_ARRAY[i]).clicked) {
            shortestDistance = distance;
            shortestDistanceDiamondID = RANDOM_ID_ARRAY[i];
        }
    }

    if (this.ArrowImageID) {
        document.getElementById(this.ArrowImageID).src = this.ArrowImageSource;
    }

    if (Number(shortestDistanceDiamondID[1]) > 0) {
        this.ArrowImageID = Number(shortestDistanceDiamondID[0]) + "" + (Number(shortestDistanceDiamondID[1]) - 1);
        this.ArrowImageSource = document.getElementById(this.ArrowImageID).src;
        document.getElementById(this.ArrowImageID).src = 'images/right-arrow.jpg'
    } else {
        this.ArrowImageID = Number(shortestDistanceDiamondID[0]) + "" + (Number(shortestDistanceDiamondID[1]) + 1);
        this.ArrowImageSource = document.getElementById(this.ArrowImageID).src;
        document.getElementById(this.ArrowImageID).src = 'images/left-arrow.jpg'
    }
}