// Подробное описание в /learn-js/search.js
const search = function () {
  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

  // Мы можем получить значение 'value' и поискать среди названий полученных карточек товара совпадения с этим 'value'. Тут нам пригодятся функции 'getData' и 'renderGoods' из "getGoods.js".
  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.long-goods-list');

    // Почистим содержимое HTML.
    goodsContainer.innerHTML = '';

    // Теперь перебираем весь массив элементов и каждый раз создаём новый блок, добавлять классы и в этот блок записывать вёрстку.
    goods.forEach((good) => {
      // Создаём новый блок, для этого обращаемся к document и используем createElement.
      const goodBlock = document.createElement('div');

      // Добавляем ему классы, которые есть у каждой карточки товара.
      goodBlock.classList.add('col-lg-3');
      goodBlock.classList.add('col-sm-6');

      // Обратите внимание на специальные ковычки. Вставляем вёрстку каждой карточки товара.
      // Заполняем вёрстку при помощи свойств JavaScript.
      // Обратите внимание на реализацию label - мы показываем его только, на определённых товарах.
      goodBlock.innerHTML = `
        <div class="goods-card">
          <span class="label ${good.label ? null : 'd-none'}">${
        good.label
      }</span>
          <img src="db/${good.img}" alt="${good.name}" class="goods-image">
          <h3 class="goods-title">${good.name}</h3>
          <p class="goods-description">${good.description}</p>
          <button class="button goods-card-btn add-to-cart" data-id="${
            good.id
          }">
            <span class="button-price">$ ${good.price}</span>
          </button>
        </div>
      `;

      // В каждом переборе мы используем метод 'append', который будет добавлять в конце списка дочерних элементов очередной 'goodBlock'.
      goodsContainer.append(goodBlock);
    });
  };

  // Удалено из изначальных значений category.
  const getData = (value) => {
    fetch(
      'https://willberries-js-1-default-rtdb.europe-west1.firebasedatabase.app/db.json'
    )
      .then((res) => res.json())
      .then((data) => {
        // Реализация поиска:
        // Когда мы перебираем "data" мы получаем каждый итерируемый элемент товара. У каждого такого элемента есть свой "name". Для того, чтобы мы не зависили от регистра мы опускаем его к нижнему методом "toLowerCase()". Тоже самое делаем и со значением из "value", которое получили из строки ввода в поиск функцией "getData". Ну а менто "includes" ищет в одной строке другую строку. Мы получим "true", если он где-то найдёт совпадение, либо "false", если не найдёт.
        // const array = data.filter((good) => {
        //   return good.name.toLowerCase().includes(value.toLowerCase());
        // });
        // Можно записать короче:
        const array = data.filter((good) =>
          good.name.toLowerCase().includes(value.toLowerCase())
        );

        localStorage.setItem('goods', JSON.stringify(array));

        if (window.location.pathname !== '/src/goods.html') {
          window.location.href = '/src/goods.html';
        } else {
          renderGoods(array);
        }
      });
  };

  searchBtn.addEventListener('click', () => {
    // вместо console.log(); в начальном.
    getData(input.value);
  });
};

search();
