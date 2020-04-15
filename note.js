var ball = document.getElementById("ball");
ball.ondragstart = function() {
  return false; // отключаем drud'n drop ,браузера
};
ball.onmousedown = function(event) { // (1) отследить нажатие
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
  ball.style.position = 'absolute';  // (2) подготовить к перемещению:
  ball.style.zIndex = 1000;  // разместить поверх остального содержимого и в абсолютных координатах
  document.body.append(ball);  // переместим в body, чтобы мяч был точно не внутри position:relative
  moveAt(event.pageX, event.pageY);   // и установим абсолютно спозиционированный мяч под курсор

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';   // передвинуть мяч под координаты курсора
    ball.style.top = pageY - shiftY + 'px'; // и сдвинуть на половину ширины/высоты для центрирования
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }  // (3) перемещать по экрану
  document.addEventListener('mousemove', onMouseMove); // (4) положить мяч, удалить более ненужные обработчики событий
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
