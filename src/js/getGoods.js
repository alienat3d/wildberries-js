// Другой менее короткий вариант с пояснениями см. learn-js/getGoods.js
const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');

  // Чтобы отрисовать карточки товаров, нам сперва нужно получить класс всех карточек и поместить их в переменную "goodsContainer".
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

  const getData = (value, category) => {
    fetch(
      'https://willberries-js-1-default-rtdb.europe-west1.firebasedatabase.app/db.json'
    )
      .then((res) => res.json())
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;

        localStorage.setItem('goods', JSON.stringify(array));

        if (window.location.pathname !== '/src/goods.html') {
          window.location.href = '/src/goods.html';
        } else {
          renderGoods(array);
        }
      });
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });

  if (
    localStorage.getItem('goods') &&
    window.location.pathname === '/src/goods.html'
  ) {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }
};

getGoods();
