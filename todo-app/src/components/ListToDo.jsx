import React from 'react'
import ItemToDo from './ItemToDo'
const ListToDo = ({tasks, setTasks}) => {
  const handlerCheck = (item) => {
       setTasks(prev =>
            prev.map(task =>
            task.task_name === item.task_name ? { ...task, checked: !task.checked } : task
            )
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
  }  
  return (
    <ul className='flex-1 w-[95%] mt-[10px] overflow-auto'>
      {tasks.length !== 0 && tasks.map((item) => <ItemToDo key={item.task_name} item={item} setTasks={setTasks} handlerCheck={handlerCheck}/>)}
    </ul>
  )
}

export default ListToDo
