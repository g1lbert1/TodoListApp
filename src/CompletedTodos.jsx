
const CompletedTodos = ({todos, setTodos, toggleCompleted}) => {
  return (
    <div>
      <h1>COMPLETED TODOS</h1>
      {todos.map((item) => {
        if(item.completed === true){
          return (
            <div>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>Due Date: {item.due}</p>
              <p>Completed: Yes</p>
              <button onClick={() => toggleCompleted(item)}>Mark Incomplete</button>
            </div>
          )
        }
      })}
    </div>
  )

}
export default CompletedTodos
