import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio ReactJS',
      url: 'https://github.com/ch4rl3s/front-end',
      techs: ['React', 'Node']
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    const newRepo = repositories.filter(repositories => repositories.id !== id);
    setRepositories(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)} >Remover</button>
          </li>
        ))
        }
      </ul><br></br>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
