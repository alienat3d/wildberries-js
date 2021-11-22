// ПОДХОД "ИНКАПСУЛЯЦИЯ КОДА".
// Мы инкапсулировали код и завернули его внутри функции, чтобы избежать возможных ошибок, например при случайном повторении переменных. Это делает код безопаснее и более читабельным.
const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = cart.querySelector(".modal-close");

  cartBtn.addEventListener("click", function () {
    cart.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    cart.style.display = "";
  });
};

cart();

// См. /learn-js/cart.js для подробных коментариев.
