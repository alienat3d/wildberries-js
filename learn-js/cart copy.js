// ПОДХОД "ИНКАПСУЛЯЦИЯ КОДА".
// Мы инкапсулировали код и завернули его внутри функции, чтобы избежать возможных ошибок, например при случайном повторении переменных. Это делает код безопаснее и более читабельным.
const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = cart.querySelector('.modal-close');
  const goodsContainer = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');

  console.log(cartTable);

  // Функция добавление товара в корзину.
  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'));

    // Метод 'find' работает очень похоже на метод 'map', на метод 'forEach' или 'filter'. Мы также передадим callback и будем сравнивать ID каждого товара с тем ID, что мы получим с кнопки. Callback будет получать каждый итерируемый 'good', проверять 'good.id' и сравнивать его с 'goodID', который мы получили с кнопки.
    const clickedGood = goods.find((good) => good.id === id);
    // Проверим лежит ли у нас такой ключ в localStorage воспользовавшись тернарным оператором и если такой ключ есть мы возьмём весь массив из localStorage. В ином случае мы значением переменной cart даём пустой массив.
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    // Перебираем корзину товаров и проверим есть ли у неё хотя бы 1 товар с ID таким же, как clickedGood. Метод "some" работает таким же образом, как и например "find".
    if (cart.some((good) => good.id === clickedGood.id)) {
      console.log('Увеличить количество clickedGood');
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

  cartBtn.addEventListener('click', function () {
    cart.style.display = 'flex';
  });

  closeBtn.addEventListener('click', function () {
    cart.style.display = '';
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
        const goods = JSON.parse(localStorage.getItem('goods'));
        console.log(goods);
      }
    });
  }
};

cart();

// См. /learn-js/cart.js для подробных коментариев.
