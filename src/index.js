import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

number.innerText = 0;

//string을 쓴다면 오타를 잡아내기 어려울 수 있음
const ADD = 'ADD';
const MINUS = 'MINUS';

//application의 현재 상태, aciton과 함께 호출되는 함수
//action은 countModifier와 소통하는 방법
//countModifier가 return하는 것은 application의 상태
const countModifier = (count = 0, action) => {
  console.log(count, action);
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// const countModifier = (count = 0, action) => {
//   console.log(count, action);
//   if (action.type === 'ADD') {
//     return count + 1;
//   } else if (action.type === 'MINUS') {
//     return count - 1;
//   } else {
//     return count;
//   }
// };

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

//
countStore.subscribe(onChange);

//dispatch가 현재 상태와 전달하는 액션과 함께 리듀서를 부름
//action은 객체이며 정의된 type 프로퍼티를 가져야 함
const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};
const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
// add.addEventListener('click', () => countStore.dispatch({ type: 'ADD' }));
// minus.addEventListener('click', () => countStore.dispatch({ type: 'MINUS' }));
