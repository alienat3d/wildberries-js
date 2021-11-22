const search = function () {
  // Находим в родительском блоке с классом ".search-block" элементы с тегами "input" и "button".
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");

  // Используем стрелочную функцию.
  // "event" - объект самого события. В нём есть полное описание произошедшего события. Из него мы можем доставать разные свойства. Например target - элемент на котором произошло событие и у него ещё есть свойство value - в нём хранится введённое значение, т.е. то, что ввели в поле ввода.
  // input.addEventListener("input", (event) => {
  //   console.log(event.target.value);
  // });

  searchBtn.addEventListener("click", (event) => {
    console.log(event.target.value);
  });
};

search();
