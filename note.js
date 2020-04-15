var score1 =score2 =0;

var scoretipe1 = document.getElementById("tablo1");
var scoretipe2 = document.getElementById("tablo2");

scoretipe1.innerHTML=score1;
scoretipe2.innerHTML=score2;

var lightOffClass1 =  document.getElementById('lightOff1').classList;
var lightOnClass1 =  document.getElementById('lightOn1').classList;


var lightOffClass1 =  document.getElementById('lightOff2').classList;
var lightOnClass2 =  document.getElementById('lightOn2').classList;

var ball = document.getElementById("ball");
let currentDroppable1 =currentDroppable2 = null;

ball.onmousedown = function(event) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);
  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    ball.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ball.hidden = false;

    if (!elemBelow) return;

    let droppable1Below = elemBelow.closest('.droppable1');
    if (currentDroppable1 != droppable1Below) {
        if (currentDroppable1) { // null when we were not over a droppable1 before this event
          leaveDroppable1(currentDroppable1);
        }
      currentDroppable1 = droppable1Below;
      if (currentDroppable1) { // null if we're not coming over a droppable now // (maybe just left the droppable)
        enterDroppable1(currentDroppable1);
      }
    }

    let droppable2Below = elemBelow.closest('.droppable2');
    if (currentDroppable2 != droppable2Below) {
      if (currentDroppable2) { // null when we were not over a droppable1 before this event
        leaveDroppable2(currentDroppable2);
      }
      currentDroppable2 = droppable2Below;

      if (currentDroppable2) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        enterDroppable2(currentDroppable2);
        console.log(currentDroppable2+'currentDroppable2')
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  }
}

function enterDroppable1(elem) {
  lightOnClass1.remove("hidden");
  lightOffClass1.add("hidden");
  score1++;
  score1= score1%100;
  scoretipe1.innerHTML=score1;
}
function leaveDroppable1(elem) {
  lightOnClass1.add("hidden");
  lightOffClass1.remove("hidden");
}
function enterDroppable2(elem) {
  lightOnClass2.remove("hidden");
  lightOnClass1.add("hidden");
  score2++;
  score2= score2%100;
  scoretipe2.innerHTML=score2;
}
function leaveDroppable2(elem) {
  lightOnClass2.add("hidden");
  lightOnClass1.remove("hidden");
}
ball.ondragstart = function() {
  return false;
};
