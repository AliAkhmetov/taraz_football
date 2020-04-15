var score1 =0;
var score2 =0;

var scoretipe1 = document.getElementById("tablo1");
var scoretipe2 = document.getElementById("tablo2");

scoretipe1.innerHTML=score1;
scoretipe2.innerHTML=score2;

var ball = document.getElementById("ball");
let currentDroppable1 = null;
let currentDroppable2 = null;
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
       if (currentDroppable1) { // null if we're not coming over a droppable now
         // (maybe just left the droppable)
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
     }
   }

}
   document.addEventListener('mousemove', onMouseMove);

   ball.onmouseup = function() {
     document.removeEventListener('mousemove', onMouseMove);
     ball.onmouseup = null;
   };

 };
 var lightOff1 =  document.getElementById('lightOff1');
  var lightOn1 =  document.getElementById('lightOn1');

  var lightOffclass1 =  lightOff1.classList;
  var lightOnclass1 =  lightOn1.classList;

  var lightOff2 =  document.getElementById('lightOff2');
  var lightOn2 =  document.getElementById('lightOn2');

  var lightOffclass2 =  lightOff2.classList;
  var lightOnclass2 =  lightOn2.classList;

function enterDroppable1(elem) {
   lightOnclass1.remove("hidden");
   lightOffclass1.add("hidden");
   score1++;
   score1= score1%100;
    scoretipe1.innerHTML=score1;
 }

 function leaveDroppable1(elem) {
   lightOnclass1.add("hidden");
  lightOffclass1.remove("hidden");
 }

 function enterDroppable2(elem) {
 lightOnclass2.remove("hidden");
 lightOffclass2.add("hidden");
 score2++;
 score2= score2%100;
 scoretipe2.innerHTML=score2;
 }

 function leaveDroppable2(elem) {
   lightOnclass2.add("hidden");
  lightOffclass2.remove("hidden");

 }



 ball.ondragstart = function() {
   return false;
 };
