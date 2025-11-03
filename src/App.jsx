import ToDoList from './ToDoList'
import CompletedTodos from './CompletedTodos'

import { useState } from 'react'


function App() {
  const [todos, setTodos] = useState([
    {id: 1, title: 'Complete Lab4', description: 'Complete lab4 by monday 11:59pm', due: '10/20/2025', completed: false}, //1
    {id: 2, title: 'Workout', description: 'Some calisthenics, some weightliftin, some runnin', due: '10/19/2025', completed: false},
    {id: 3, title: 'Finish my other two assignments', description: 'Finish my other two assignments for my other classes', due: '10/19/2025', completed: false},
    {id: 4, title: 'Leetcode', description: 'Do 2-3 leetcode problems tomorrow', due: '10/17/2025', completed: false},
    {id: 5, title: 'LoL matches', description: 'Play my first 2 matches for the LoL team at Stevens on saturday', due: '10/18/2025', completed: false},
    {id: 6, title: 'MMA gym', description: 'Go to my first practice at my mma gym on friday since I have been sick for the past 2 weeeks!', due: '10/17/2025', completed: false},
    {id: 7, title: 'meal prep food for the next few days', description: 'Meal prep some chicken in a tomato-cream sauce with protein pasta for the next few days (recipe is FIRE)', due: '10/16/2025', completed: false},
    {id: 8, title: 'Survivor', description: 'Start watching Australian Survivor (my roomate put me on)', due: '10/14/2025', completed: false},
    {id: 9, title: 'Halloween costume', description: 'Need to figure out a halloween costume soon and purchase', due: '10/31/2025', completed: false},
    {id: 10, title: 'Finish reading Vagabond', description: 'Currently on chapter 51 out of 327 of the Vagabond manga', due: '10/16/2026', completed: false}
  ])
  const deleteTodo = (id) => {
    setTodos(todos.filter((item) => (
      item.id !== id
    )))
  }

  const toggleCompleted = (todo) => {
    setTodos(todos.map((item) => (
      item.id === todo.id ? {...item, completed: !item.completed} : item
    )))
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white text-3xl font-bold">
        Tailwind is working 🎉
      </div>
      <ToDoList todos = {todos} setTodos = {setTodos} deleteTodo = {deleteTodo} toggleCompleted = {toggleCompleted}/>
      <CompletedTodos todos = {todos} setTodos = {setTodos} toggleCompleted = {toggleCompleted}/>
    </>
  )
}

export default App
