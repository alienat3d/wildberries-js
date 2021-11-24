// Другой менее коротки вариант с пояснениями см. learn-js/getGoods.js
const getGoods = () => {
  // Для того чтобы доставать данные из базы данных по клику на ссылках меню header, сперва
  const links = document.querySelectorAll('.navigation-link');

  // Отрисовываем карточки товаров.
  const renderGoods = (goods) => {
    console.log(goods);
  };

  const getData = (value, category) => {
    fetch(
      'https://willberries-js-1-default-rtdb.europe-west1.firebasedatabase.app/db.json'
    )
      .then((res) => res.json())
      .then((data) => {
        // Метод "filter" очень похож на "forEach", он перебирает данные и возвращает только те данные, callback которых вернёт нам значение true.
        // Тут мы проверяем item.gender и сравниваем со значением "Womens". Т.е. в массив попадут только элементы у которых gender - "Womens".

        // К свойсту объектов можно обращаться как через точечную нотацию 'return item.gender === "Mens";', так и через скобки.
        // return item['gender'] === "Mens"; - но вместо "gender" и "Mens", мы можем использовать вышеозначенные "value" и "category".
        // В итоге упрощаем код, использую стрелочную функцию, теперь фигурн. скобки и return не нужны.

        // const array = data.filter((item) => item[category] === value);
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;

        // А теперь пропишем цикл для All. Если категория есть, то выводим отфильтрованные данные, а если нет, то полные данные.
        // if (category) {
        //   console.log('есть');
        // } else {
        //   console.log('нет');
        // }
        // Такое же условие можно показать через тернарный оператор:
        // category ? console.log('есть') : console.log('нет');

        localStorage.setItem('goods', JSON.stringify(array));

        // Переводим юзера на страницу с товарами:
        // window.location.href = 'goods.html';
        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/src/goods.html';
        } else {
          renderGoods(array);
        }
      });
  };

  // Метод "forEach" аргументом принимает функцию и запустит для каждого итерируемого элемента нашего массива. Метод принимает никий callback и в этот callback при вызове функции попадают несколько параментров. Первый из которых это link, то есть первый итерируемый элемент нашего массива.
  links.forEach((link) => {
    // теперь на каждый линк повесим обработчик события "click".
    link.addEventListener('click', (event) => {
      // Методом "preventDefault" убираем переходы по клику на ссылках
      event.preventDefault();
      // Чтобы достать текстовое содержимое применяем "textContent"
      const linkValue = link.textContent;
      // "dataset.field" используем для получения значения аттрибута "data-field"
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });

  // Нужно сделать так, чтобы отправлялось на рендер, только если страничка goods.html, а index.html нет. Для этого ставим логический знак && и проверяем, что мы действительно на 'goods.html'.
  if (
    localStorage.getItem('goods') &&
    window.location.pathname === '/goods.html'
  ) {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }
  // Обратимся к глобальному объекту "localStorage". Используем медот "setItem" для записи. В нём используем ключ "goods" и значение "name: "all"", но так как можно использовать только строки, то сперва переводим объект при помощи метода stringify из JSON файла.
  // localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]));

  // "getItem" метод считывания информации из localStorage.
  // const goods = JSON.parse(localStorage.getItem('goods'));
  // console.log(localStorage);

  // "removeItem" метод удаления информации из localStorage.
  // localStorage.removeItem('goods');
  // console.log(localStorage);
};

getGoods();
