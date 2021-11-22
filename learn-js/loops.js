// ЦИКЛЫ //
const logger = (index) => {
  console.log(index);
};

// ЗАПИСЬ ЦИКЛЫ
// Сперва в скобках укажем отправную\стартовую точку цикла, например 0.
// Далее после ; необходимо задать условие при котором цикл будет повторяться, например пока "i < 3".
// И каждое повторение\итерацию цикла мы будем увеличивать i на 1.
for (let i = 0; i < 3; i++) {
  logger(i);
}

// ↑ Выше мы подставили параметр 'index' в функцию 'logger' и выводить его в консоль.
// ↑ А в вызов функции 'logger' мы будем передавать значение переменной 'i'

// НОВЫЙ МАССИВ //
// У массивов также есть свои свойства, один из таких например 'length' - выводит длинну каждого массива.
const array = ["первый", 2, "third", "das Vierte", true];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
// подобное действие называется "перебор массива" и оно требуется довольно часто.