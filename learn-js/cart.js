// "querySelector" & "querySelectorAll" пробегаются по всей вёрстке и собирают все элементы с определённым селектором. "querySelector" возвращает первый селектор в переменную, а "querySelectorAll" возвращает весь найденный массив.
const cartBtn = document.querySelector(".button-cart");

// "getElementById" скорее всего отработает быстрее, чем "querySelector", но разницы вы скорее всего не заметите. Так как метод "getElementById" работает с идентификатором, а это уникальная сущность в единственном числе, после того как он его находит - он не ищет дальше. Эта разницы с "querySelector" может отрабатывать быстрее на особо крупных проектах. Работает только в условиях document!
const cart = document.getElementById("modal-cart");

// Теперь мы можем уже искать в переменной cart, но при этом используем только "querySelector", чтобы найти кнопку "Х".
const closeBtn = cart.querySelector(".modal-close");

// Определяем по клику на элемент кнопку с классом ".button-cart", что у элемента с идентификатором "modal-cart" появится inline-style = "display: flex;"
cartBtn.addEventListener("click", function () {
  cart.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
  cart.style.display = "";
});

// console.dir(cartBtn); - чтобы просмотреть кнопку как объект

/* Отличие этих двух методов в том, что "onclick", "onchange", "oncopy" - это всё свойства объекта, а свойства объекта могут нести в себе лишь одно значение. То есть в них можем записать только одну функцию и следующая затрёт предыдущую. В то время как в метод "addEventListener" мы можем записать сколь угодно функций. */

// cartBtn.onclick = function () {
//   console.log("click");
// };
