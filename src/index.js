import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

//object를 return하는 actionCreator
//action(object)은 reducer에 보내짐
//return된 object는 dispatch에 보내짐
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

//state를 바꾸는 것이 아니라 새로운 state를 만듦
const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    // return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      return cleaned;
    // return state.filter((toDo) => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

//action을 dispatch하는 fucntion
const dispatchAddTodo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.Id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach((toDo) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = 'DEL';
    btn.addEventListener('click', dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddTodo(toDo);
};

form.addEventListener('submit', onSubmit);
