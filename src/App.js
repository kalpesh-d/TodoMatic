import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed, 
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState("All");

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed:false };
    setTasks([...tasks, newTask]);
  }

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName};
      }
      return task;
    })
    setTasks(editedTaskList);
  }

  const toggleTaskCompleted = (id) => {
    const updateTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updateTasks);
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  } 

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => 
    <Todo 
      id={task.id}
      key={task.id} 
      name={task.name} 
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  );

  const filterList = FILTER_NAMES.map(name => {
    return <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  });

  // tasks remaining
  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`
    
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        { filterList }
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        { taskList }
      </ul>
    </div>
  );
}

export default App;