import React, { useState, useEffect } from 'react'; // Importe useEffect aqui também
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'; 

// Importe o seu componente TaskInput
import TaskInput from '../components/TaskInput';

function App() {
  // 1. Carregar tarefas do localStorage ao iniciar
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasknexus-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 2. Salvar tarefas no localStorage sempre que 'tasks' mudar
  useEffect(() => {
    localStorage.setItem('tasknexus-tasks', JSON.stringify(tasks));
  }, [tasks]); // O array [tasks] significa que este efeito roda sempre que 'tasks' muda

  // Função para adicionar uma nova tarefa
  const addTask = (taskText) => {
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  // Função para excluir uma tarefa
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Função para marcar/desmarcar tarefa como concluída
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ color: '#00FFFF', marginBottom: '30px' }}>TaskNexus: Seu Gerenciador de Produtividade</h1>

      <div className="card" style={{ backgroundColor: '#1C0F32', padding: '25px', borderRadius: '10px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
        {/* Adicione o componente TaskInput aqui e passe a função addTask como prop */}
        <TaskInput onAddTask={addTask} />

        {/* Aqui vamos exibir a lista de tarefas */}
        <h2 style={{ color: '#61dafb', marginTop: '30px', marginBottom: '15px' }}>Minhas Tarefas</h2>
        {tasks.length === 0 ? (
          <p style={{ color: '#bbb' }}>Nenhuma tarefa ainda. Adicione uma para começar!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map(task => (
              <li key={task.id} style={{
                backgroundColor: '#333',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                color: '#eee',
                // Estilo condicional para tarefas concluídas
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}>
                <span onClick={() => toggleComplete(task.id)} style={{ cursor: 'pointer', flexGrow: 1, textAlign: 'left' }}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    backgroundColor: '#FF4136',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '0.8em',
                    fontWeight: 'bold',
                    marginLeft: '10px'
                  }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="read-the-docs" style={{ marginTop: '50px', fontSize: '0.9em', color: '#888' }}>
        Edite `src/App.jsx` e salve para testar HMR
      </p>
    </div>
  );
}

export default App;