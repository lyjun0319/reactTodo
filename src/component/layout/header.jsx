import React, { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../App';
import { todoListContext } from '../../page/todoList/todoList';

const Header = () => {
  const { toggleDarkMode } = useContext(DarkModeContext);
  const [isActive, setIsActive] = useState('all');

  const { listType } = useContext(todoListContext);

  const handelClick = (statusType) => {
    listType(statusType);
  };

  return (
    <header className="header">
      <button type="button" className="mode-choose-btn" onClick={() => toggleDarkMode()}>
        다크모드
      </button>
      <ul className="todoList-status">
        <li>
          <button
            type="button"
            className={`status-btn ${isActive === 'all' && 'active'}`}
            onClick={() => handelClick('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`status-btn ${isActive === 'active' && 'active'}`}
            onClick={() => handelClick('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`status-btn ${isActive === 'complete' && 'active'}`}
            onClick={() => handelClick('complete')}
          >
            Complete
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
