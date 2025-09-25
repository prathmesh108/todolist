import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)



  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }



//handleEdit

  const handleEdit = (e, id) => {
    let todo = todos.filter(i => i.id === id)
    setTodo(todo[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


//handleDelete

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


//handleAdd 

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()

  }

//handleChange
  const handleChange = (e) => {

    setTodo(e.target.value)
  }


// handleCheckbox 

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }





  return (
    <>
      <Navbar />
      <div className="mx-4 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">

      <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>


        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className='text-lg font-bold'>Add a Todo</h2>


          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-2' />

          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1
           text-sm font-bold text-white disabled:bg-violet-700 rounded-md '>Save</button>
        </div>


        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> showFinished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'> No Todos to diplay</div>}
          {todos.map(item => {


            return(showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex  my-3 items-start"}>



              <div className=' flex gap-5 flex-1 min-w-0'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}
                  id="" className=' ' />
                <div className={`${item.isCompleted ? "line-through" : ""}   flex-1 min-w-0 break-all whitespace-normal `}>{item.todo}</div>
              </div>




              <div className="buttons flex  shrink-0 ml-2">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white  rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white  rounded-md mx-2'><MdDelete /></button>
              </div>
            </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App
