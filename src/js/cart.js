// ПОДХОД "ИНКАПСУЛЯЦИЯ КОДА".
// Мы инкапсулировали код и завернули его внутри функции, чтобы избежать возможных ошибок, например при случайном повторении переменных. Это делает код безопаснее и более читабельным.
const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = cart.querySelector('.modal-close');
  const goodsContainer = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');
  const modalForm = document.querySelector('.modal-form');

  // Кнопка модального окна "очистка товара из корзины 'x'".
  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.filter((good) => {
      return good.id !== id;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    // Запускаем 'renderCartGood()' после каждого изменения.
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };
  // Кнопка модального окна "добавление товара из корзины '+'".
  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };
  // Кнопка модального окна "удаление товара из корзины '-'".
  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        // Необходимо предотвратить уход значений в минус.
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  // Функция добавление товара в корзину.
  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'));

    // Метод 'find' работает очень похоже на метод 'map', на метод 'forEach' или 'filter'. Мы также передадим callback и будем сравнивать ID каждого товара с тем ID, что мы получим с кнопки. Callback будет получать каждый итерируемый 'good', проверять 'good.id' и сравнивать его с 'goodID', который мы получили с кнопки.
    // Каждый итерируемый good будет получать callback. Проверять good.id и сравнивать его с goodId, который мы получили с кнопки.
    const clickedGood = goods.find((good) => good.id === id);

    // Проверим лежит ли у нас такой ключ в localStorage воспользовавшись тернарным оператором и если такой ключ есть мы возьмём весь массив из localStorage. В ином случае мы значением переменной cart даём пустой массив.
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    // Перебираем корзину товаров и проверим есть ли у неё хотя бы 1 товар с ID таким же, как clickedGood. Метод "some" работает таким же образом, как и например "find".
    if (cart.some((good) => good.id === clickedGood.id)) {
      // Перебираем корзину методом 'map'. 'map' был придуман, чтобы мы перебирая массив получали новый массив, но меняя его структуру. Мы будем обращаться к каждому перебираемому товару и возвращать этот товар.
      // Если метод 'map' перебирая корзину найдёт ID кликнутого товара в корзине, то увеличит этот товар на 1 и вернёт этот товар, но видоизменённый.
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    // После того как функция 'addToCart' доработает новую корзину необходимо сохранить в localStorage.
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // Отрисовываем вёрстку модального окна на основе массива данных из "localStorage.setItem('cart', JSON.stringify(cart))". 'renderCartGoods' будет получать массив данных 'goods'.
  // Далее перебираем весь массив в 'renderCartGoods' и формируем вёрстку.
  // Для начала создаём сам каркас. Создаём при каждом переборе новый элемент с тегом <tr>.
  const renderCartGoods = (goods) => {
    // Необходимо обнулить контент.
    cartTable.innerHTML = '';

    goods.forEach((good) => {
      const tr = document.createElement('tr');
      // Привычным методом добавляем JS в вёрстку для динамического заполнения контента.
      // Обратите внимание на total price, там мы приводим на всякий случай значения к числу знаком "+" и перемножаем "+good.price" и "+good.count".
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>$ ${good.price}</td>
        <td>
          <button class="cart-btn-minus"">-</button>
        </td>
        <td>${good.count}</td>
        <td>
          <button class=" cart-btn-plus"">+</button>
        </td>
        <td>$ ${+good.price * +good.count}</td>
        <td>
          <button class="cart-btn-delete"">x</button>
        </td>
      `;

      cartTable.append(tr);

      // Теперь реализуем функционирования кнопок "+", "-" и "удаление товара 'X'".
      tr.addEventListener('click', (e) => {
        // Проверяем класс кликнутого элемента.
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id);
        }
      });
    });
  };

  // Реализуем отправку формы.
  // Отсылаем на тестовое API весь наш объект 'cart'.
  const sendForm = () => {
    const cartArray = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: '',
        phone: '',
      }),
      // TODO: ДОМАШНЕЕ ЗАДАНИЕ: Заполнить в отправляемые данны name & phone из формы. А в методе 'then' снизу очистить объект корзины из localStorage.

      // Не забудем прописать после отправки формы закрытие модального окна коризны.
    }).then(() => {
      cart.style.display = '';
    });
  };

  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendForm();
  });

  // Вызываем функцию 'renderCartGoods' и передаём в неё некий массив 'cartArray'. Потом необходимо достать из localStorage весь массив данных если он есть, а если его нет то передавать туда пустой массив.
  cartBtn.addEventListener('click', function () {
    const cartArray = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    renderCartGoods(cartArray);
    cart.style.display = 'flex';
  });

  closeBtn.addEventListener('click', function () {
    cart.style.display = '';
  });

  cart.addEventListener('click', (event) => {
    if (
      !event.target.closest('.modal') &&
      event.target.classList.contains('overlay')
    ) {
      cart.style.display = '';
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      cart.style.display = '';
    }
  });

  // Если мы повесили обработчик на родительский '.long-goods-list', то событие 'click' будет обрабатываться для всех его дочерних элементов.
  // Такой подход называют "делегированием событий".
  if (goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
      // Вывод в консоль "кнопа", только если кликнем по элементу с классом 'add-to-cart'.
      // if (event.target.classList.contains('add-to-cart')) {
      //   console.log('кнопа');
      // }
      // Метод 'closest' ищет по любому селектору. Теперь обработчик событий будет подниматься вверх по родительским элементам и искать у них '.add-to-cart'
      if (event.target.closest('.add-to-cart')) {
        const buttonToCart = event.target.closest('.add-to-cart');
        const goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      }
    });
  }
};

cart();

// См. /learn-js/cart.js для подробных коментариев.
