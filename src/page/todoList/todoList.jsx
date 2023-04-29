import React, { createContext, useEffect, useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import Header from '../../component/layout/header';

export const todoListContext = createContext(undefined);
const TodoList = () => {
  const [useTodoList, setTodoList] = useState([]);
  const [useAddText, setAddText] = useState('');

  useEffect(() => {
    const todoListArr = sessionStorage.getItem('todoList');
    if (todoListArr) {
      setTodoList(JSON.parse(todoListArr));
    }
  }, []);

  const handelChecked = (e, itemId, itemStatus) => {
    e.preventDefault();
    const newData = useTodoList.map((item, key) => {
      if (item.id === itemId) {
        return {
          ...item,
          status: !itemStatus,
        };
      } else {
        return item;
      }
    });
    setTodoList(newData);
    sessionUpdate(newData);
  };

  // new add todolist input
  const handelChangeAdd = (e) => {
    const targetVal = e.target.value;
    setAddText(targetVal);
  };

  const handelOnKeypress = (e) => {
    if (e.key === 'Enter') handleClickAdd(e);
  };

  const handelFocusIn = (e) => {
    e.target.value = '';
  };

  // new todo list submit
  const handleClickAdd = () => {
    const dataLen = useTodoList.length;

    // new todo list text not data
    if (useAddText.length > 0) {
      const addData = [
        ...useTodoList,
        {
          id: dataLen + 1,
          todo: useAddText,
          status: false,
        },
      ];
      setTodoList(addData);
      sessionUpdate(addData);
    } else {
      alert('해야 할 일을 입력해주세요.');
    }
  };

  // delete todo list item
  const handelClickDel = (itemId) => {
    // 배열에서 삭제해야 할 항목 제거
    const delData = useTodoList.filter((item) => item.id !== itemId);

    // 배열의 id 값 재정의
    const newData = delData.map((item, idx) => {
      return {
        ...item,
        id: (item.id = idx + 1),
      };
    });

    // id 재정의 된 배열 저장
    setTodoList(newData);
    sessionUpdate(newData);
  };

  const sessionUpdate = (data) => {
    sessionStorage.setItem('todoList', JSON.stringify(data));
  };

  const listType = (type) => {
    console.log(useTodoList);
  };

  return (
    <todoListContext.Provider value={{ useTodoList, listType }}>
      <Header />
      {useTodoList.length > 0 && (
        <div className="todoList-box">
          <ul>
            {useTodoList.map((item, key) => {
              return (
                <li className="todoList" key={item.id}>
                  <label
                    htmlFor={`inputChk${item.id}`}
                    onClick={(e) => handelChecked(e, item.id, item.status)}
                  >
                    <input
                      type="checkbox"
                      className="input"
                      id={`inputChk${item.id}`}
                      defaultChecked={item.status}
                    />
                    <BiCheckCircle
                      className="icon-input-check"
                      style={item.status && { color: '#3ac46d' }}
                    />
                    <span className="title">{item.todo}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handelClickDel(item.id)}
                    className="todoList-del-btn"
                  >
                    삭제
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="todoList-add-box">
        <input
          type="text"
          className="input todoList-input"
          onChange={(e) => handelChangeAdd(e)}
          onFocus={(e) => handelFocusIn(e)}
          onKeyPress={(e) => handelOnKeypress(e)}
        />
        <button type="button" onClick={handleClickAdd} className="todoList-add-btn">
          ADD
        </button>
      </div>
    </todoListContext.Provider>
  );
};

export default TodoList;
