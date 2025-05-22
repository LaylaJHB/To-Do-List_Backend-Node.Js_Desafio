import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Erro ao buscar tarefas');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>{task.title}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default TaskList;
