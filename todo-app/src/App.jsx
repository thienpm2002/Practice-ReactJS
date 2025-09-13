import { useState, useEffect, use } from 'react'
import './App.css'
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import ListToDo from './components/ListToDo';

function App() {
  const [input, setInput] = useState("");

  const [itemLeft, setItemLeft] = useState(()=>{
      const stored = localStorage.getItem('tasks');
      let index = 0;
      if(stored){
         const list =  JSON.parse(stored);
         list.forEach(task => {
             if(!task.checked) ++index; 
         });
      }
      return index;
  })

  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : []; 
  });

  const [active,setActive] = useState({all: true, completed: false, unfinished: false});

  const handlerAdd = () => {
       if (!input.trim()) return;
       const task = {
           task_name: input,
           checked: false
       }
       setTasks((prev) => [...prev,task]);
       setInput('');
       localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const selectAll = () => {
      setActive({
        all: true, 
        completed: false, 
        unfinished: false
      })
      const stored = localStorage.getItem('tasks');
      if(stored){
        const list =  JSON.parse(stored);
        setTasks(list);
      }

  }
  const selectUnfinished = () => {
      setActive({
        all: false, 
        completed: false, 
        unfinished: true
      })
      const stored = localStorage.getItem('tasks');
      if(stored){
        const list =  JSON.parse(stored);
         setTasks(list.filter(item => item.checked === false));
      }
  }
  const selectCompleted = () => {
      const stored = localStorage.getItem('tasks');
      if(stored){
        const list =  JSON.parse(stored);
        setTasks(list.filter(item => item.checked === true));
      }
      setActive({
        all: false, 
        completed: true, 
        unfinished: false
      })
  }

  useEffect(() => {
    let index = 0;
    tasks.forEach(task => {
        if(!task.checked) ++index; 
    });
    setItemLeft(index);
  }, [tasks]);

  return (
       <div className='h-[100vh]  bg-gray-300 flex'>
         <div className='m-auto bg-[#fff] w-[50%] h-[65%] flex flex-col items-center'>
            <h1 className='mt-3.5 mb-3.5 text-2xl text-center font-bold'>THINGS TO DO</h1>
            <input 
               className='bg-gray-300 outline-0 w-[95%] h-[40px] pl-2.5 pr-2.5'
               type="text" 
               onChange={(e) => setInput(e.target.value)}
               value={input}
               placeholder='Add new'
            />
            <ListToDo tasks={tasks} setTasks={setTasks}/>
            <div className='w-[100%] bg-green-50 flex justify-between items-center p-2'>
             <div className='flex justify-center flex-1 border-r-[1px] border-gray-400 mr-2.5'>
               <FaSearch className='mr-2 cursor-pointer' />
               <FaPlus className='cursor-pointer' onClick={handlerAdd}/>
             </div>
             <div className='flex flex-7 justify-between items-center'>
              <p>{`${itemLeft} items left `}</p>
              <div>
                <span className={active.all ? 'mr-3 border-[1px] p-1 bg-[#fff] cursor-pointer w-[40px]' : 'mr-3 cursor-pointer'} onClick={selectAll}>All</span>
                <span className={active.unfinished ? 'mr-3 border-[1px] p-1 bg-[#fff] cursor-pointer w-[40px]' : 'mr-3 cursor-pointer'} onClick={selectUnfinished}>Active</span>
                <span className={active.completed ? 'mr-3 border-[1px] p-1 bg-[#fff] cursor-pointer w-[40px]' : 'mr-3 cursor-pointer'} onClick={selectCompleted}>Completed</span>
              </div>
             </div>
            </div>
         </div>
       </div>
  )
}

export default App
