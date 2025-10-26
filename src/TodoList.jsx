import { useEffect } from 'react'
const ToDoList = ({todos, setTodos, deleteTodo, toggleCompleted}) => {
  // useEffect(() => {
  //   toggleCompleted(todos[3])
  // }, [])
  const today = new Date()
  return (
    <div>
      <h1>TODOS</h1>
      {todos.map((item) => {
        const dueDate = new Date(item.due)
        const alreadyDue = dueDate < today
        if(item.completed === false){
            return(
              <div key={item.id}>

                <h1 style={{ color: alreadyDue ? "red" : "black"}}>Title: {item.title}</h1>
                <p>Description: {item.description}</p>
                <p style={{color: alreadyDue ? "red" : "black"}}>Due: {item.due}</p>
                <p>completed? : {item.completed ? 'Yes' : 'No'}</p>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px"}}>
                  <button onClick={() => deleteTodo(item.id)}>Delete</button>
                  <button onClick={() => toggleCompleted(item)}>Complete</button>
                </div>
              </div>
            )

        }
      })}
    </div>
  )
}
export default ToDoList;
