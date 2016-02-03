var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));

var red = getRandomNumber(255);
var green = getRandomNumber(255);
var blue = getRandomNumber(255);

var score = [];
var timer;
var currentLevel = 1;

dots.forEach(function(dot){
  dot.addEventListener('click', function(e, t){
    if(e.srcElement.dataset.red == red &&
       e.srcElement.dataset.green == green &&
       e.srcElement.dataset.blue == blue){
      score.push(e.srcElement.dataset);
      setColors();
      addShades();
    }else{
      wrong();
    }
  });
});

//Last score and high score
//Pop up menu again


setColors();
addShades();

function wrong(){
  dots.forEach(function(dot){
    //revisit this concept
    dot.className = "dot wrong";
  });
  score = [];
  setTimeout(function(){
    setColors();
    addShades();
  }, 400);
}

function setColors(){
  document.querySelector('#score').innerText = score.length;
  clearInterval(timer);
  red = getRandomNumber(200, 100);
  green = getRandomNumber(200, 100);
  blue = getRandomNumber(200, 100);
  border.style.border = '15px solid rgb(' + red + ', ' + green + ', ' + blue + ')';
  var borderWidth = 15;
  timer = setInterval(function(){
    borderWidth -= 3;
    if(borderWidth <= 0){
      wrong();
    }
    border.style.border = borderWidth + 'px solid rgb(' + red + ', ' + green + ', ' + blue + ')';
  }, 1000);
}


//Random the border color
function addShades() {
  dots.forEach(function(dot){
    dot.className = "dot";
  });
  dots.sort(function() { return 0.5 - Math.random(); });
  setShade(0, true, dots[0]);
  setShade(2, true, dots[1]);
  setShade(3, true, dots[2]);
  setShade(4, true, dots[3]);
  setShade(5, true, dots[4]);
  setShade(1, false, dots[5]);
  setShade(2, false, dots[6]);
  setShade(3, false, dots[7]);
  setShade(4, false, dots[8]);
}

function getRandomNumber(max, min){
  return Math.floor(Math.random() * (max - min)) + min;
}

function setShade(amount, increment, e){
  currentLevel = Math.floor(score.length / 5);
  level.innerText = 'Level: ' + currentLevel;
  if(!increment){
    amount = ~amount;
  }

  var tempRed = red + amount * (25 - currentLevel);
  var tempGreen = green + amount * (25 - currentLevel);
  var tempBlue = blue + amount * (25 - currentLevel);

  e.style.backgroundColor = 'rgb(' + tempRed + ', ' + tempGreen + ', ' + tempBlue + ')';
  e.dataset.red = tempRed;
  e.dataset.green = tempGreen;
  e.dataset.blue = tempBlue;
}
