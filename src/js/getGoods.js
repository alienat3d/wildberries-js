// Другой менее коротки вариант с пояснениями см. learn-js/getGoods.js
const getGoods = () => {
  // Для того чтобы доставать данные из базы данных по клику на ссылках меню header, сперва
  const links = document.querySelectorAll(".navigation-link");

  const getData = () => {
    fetch(
      "https://willberries-js-1-default-rtdb.europe-west1.firebasedatabase.app/db.json"
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
      });
  };

  // Метод "forEach" аргументом принимает функцию и запустит для каждого итерируемого элемента нашего массива. Метод принимает никий callback и в этот callback при вызове функции попадают несколько параментров. Первый из которых это link, то есть первый итерируемый элемент нашего массива.
  links.forEach((link) => {
    // теперь на каждый линк повесим обработчик события "click".
    link.addEventListener("click", (event) => {
      // Методом "preventDefault" убираем переходы по клику на ссылках
      event.preventDefault();
      getData();
    });
  });

  // Обратимся к глобальному объекту "localStorage". Используем медот "setItem" для записи. В нём используем ключ "goods" и значение "name: "all"", но так как можно использовать только строки, то сперва переводим объект при помощи метода stringify из JSON файла.
  localStorage.setItem("goods", JSON.stringify([1, 2, 3, 4, 5]));

  // "getItem" метод считывания информации из localStorage.
  const goods = JSON.parse(localStorage.getItem("goods"));
  console.log(localStorage);

  // "removeItem" метод удаления информации из localStorage.
  localStorage.removeItem("goods");
  console.log(localStorage);
};

getGoods();
