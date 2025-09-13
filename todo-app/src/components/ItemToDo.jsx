import React from 'react'

const ItemToDo = ({ item,handlerCheck }) => {

  return (
    <li className='flex items-center border-b-[1px] pb-2.5 pt-2.5'>
      <input 
        type="checkbox" 
        checked={item.checked}
        onChange={() => handlerCheck(item)}
      />
      <span className={item.checked ? 'ml-2.5 line-through' : 'ml-2.5'}>{item.task_name}</span>
    </li>
  )
}

export default ItemToDo
