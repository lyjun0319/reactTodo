import TodoList from './page/todoList/todoList';
import Header from './component/layout/header';
import { createContext, useEffect, useState } from 'react';
import './scss/style.scss';

export const DarkModeContext = createContext();
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((mode) => !mode);

  useEffect(() => {
    const targetBody = document.getElementsByTagName('body')[0];
    if (targetBody.classList.contains('dark')) {
      targetBody.classList.remove('dark');
    } else {
      targetBody.classList.add('dark');
    }
  }, [darkMode]);
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={'wrap'}>
        <TodoList />
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
