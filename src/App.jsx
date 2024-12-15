import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './component/navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState({
    text : "",
    id : "",
    isDone : false
  })
  const [todos, setTodos] = useState([])
  const [showCompleted, setshowCompleted] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const addHandler = (e) => {
    if(todo.text === ""){
      alert("Entered task is empty.")
      return
    }

    const newTodos = todos.filter((item) => {
      return item.text == todo.text
    })
    if(newTodos.length >= 1) {
      alert("This task already exists.")
      return
    }

    setTodos((prevArray) => [...prevArray, todo])
    savetoLS()
    
    setTodo({
      text : "", 
      id : "",
      isDone : false
    })
  }

  const changeHandler = (e) => {
    setTodo({
      text : e.target.value,
      id : uuidv4(), 
      isDone : false
    })
  }

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => {
        return item.id != id;
    })
    setTodos(newTodos);
    savetoLS()
  }

  const handleEdit = (e, idTodo, textTodo, doneTodo) => {
    setTodo({
      text : textTodo,
      id : idTodo, 
      isDone : doneTodo
    })
    const newTodos = todos.filter((item) => {
      return item.id != idTodo;
    })
    setTodos(newTodos);
    savetoLS()
  } 

  const checkboxChangeHandler = (e, id) => {
    const index = todos.findIndex((item) => {
      return item.id == id;
    })
    let newTodos = [...todos]
    newTodos[index].isDone = (!(newTodos[index].isDone))
    setTodos(newTodos)
    savetoLS()
  }

  const toggleShowCompleted = () => {
    setshowCompleted(!showCompleted)
  }


  return (
    <>
      <Navbar/>
      <div className="container bg-gray-400 md:rounded-xl min-h-screen md:min-h-[70vh] md:mt-5 md:mx-auto ">
        <div className="input p-3 md:p-8">
          <h2 className='font-bold text-xl'>Add a Task  </h2>
          <input className='bg-gray-300 placeholder-gray-900 text-black text-lg px-3 py-2 rounded-xl w-1/2 outline-none m-3' value={todo.text} onChange={changeHandler}  onKeyDown={(event) => {if (event.key === "Enter") addHandler();}}  type="text" placeholder='task'/>
          <button onClick={addHandler} className='bg-gray-800 rounded-md text-white font-bold px-3 py-2 mx-3 hover:bg-gray-900 hover:shadow-neutral-800 hover:shadow-2xl'>Save</button>
          <br />
          <input type="checkbox" onChange={toggleShowCompleted} className='m-3 size-4' checked = {showCompleted} /> 
          <span className='text-xl'>Show Completed</span>
        </div>
        <hr className='w-[98%] mx-auto bg-inherit' />
        <div className="todos p-3 md:p-8">
          <h2 className='font-bold text-xl'>Your Tasks</h2>
          {(todos.length == 0) && <div className='text-xl m-3'>No tasks to show.</div> }
          {todos.map((item) => {
            return (showCompleted || !item.isDone) && <div key={item.id} className="todo text-xl mx-3 my-5 flex justify-between md:w-3/4">
              <div className="task flex max-w-md overflow-scroll md:overflow-hidden w-full">
                <input onChange={(e) => checkboxChangeHandler (e, item.id)}type="checkbox" className='mx-5 size-4 ' checked = {item.isDone}/>
                <p className={item.isDone ? 'line-through w-full' : 'w-full'}>{item.text}</p>
              </div>
              <div className="btn flex">
                <button onClick={(e) => { handleEdit(e, item.id, item.text, item.isDone) }} className='bg-gray-800 rounded-md text-white font-bold px-3 py-2 mx-3 h-11 hover:bg-gray-900 hover:shadow-neutral-800 hover:shadow-2xl'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-gray-800 rounded-md text-white font-bold px-3 py-2 mx-3 h-11 hover:bg-gray-900 hover:shadow-neutral-800 hover:shadow-2xl'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
