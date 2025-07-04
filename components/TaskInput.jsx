import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        type="text"
        placeholder="Adicione uma nova tarefa..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="add-task-btn">
        Adicionar Tarefa
      </button>
    </form>
  );
}

export default TaskInput;