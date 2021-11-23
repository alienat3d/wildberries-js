const search = function () {
  // Находим в родительском блоке с классом ".search-block" элементы с тегами "input" и "button".
  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

  // Используем стрелочную функцию.
  // "event" - объект самого события. В нём есть полное описание произошедшего события. Из него мы можем доставать разные свойства. Например target - элемент на котором произошло событие и у него ещё есть свойство value - в нём хранится введённое значение, т.е. то, что ввели в поле ввода.
  // input.addEventListener("input", (event) => {
  //   console.log(event.target.value);
  // });

  // searchBtn.addEventListener("click", () => {
  //   console.log(input.value);
  // });

  // Предыдущее решение оказалось проблемным, так как на странице goods.html нету класса ".search-block", поэтому это вызывает ошибку.
  // Чтобы себя обезопасить себя и не получить критическую ошибку мы можем сделать подобную конструкцию:
  try {
    searchBtn.addEventListener('click', () => {
      console.log(input.value);
    });
  } catch (e) {
    console.error(
      'Class ".search-block" is not found, but needed for "click" JS-event.'
    );
  }
  // Чем ещё хороша такая конструкция try-catch, что в этом случае отказывает только 1 кусочек кода, а не весь остальной код, как если бы без неё. Это делает код намного безопаснее.
};

search();
