import React, { useState, useEffect } from 'react';

const CommandExecution = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [eventSource, setEventSource] = useState(null); // Ajout de l'état eventSource

  useEffect(() => {
    if (eventSource) {
      eventSource.addEventListener('message', event => {
        const data = event.data;
        const lines = data.trim().split('\n');
        lines.forEach(line => {
          setOutput(prevOutput => prevOutput + line + '\n');
        });
      });

      eventSource.addEventListener('error', event => {
        eventSource.close();
        setEventSource(null); // Réinitialisation de l'état eventSource
      });
    }

    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null); // Réinitialisation de l'état eventSource lors de la suppression
      }
    };
  }, [eventSource]);

  const stopCommand = () => {
    eventSource.close();
    setOutput(output + "La commande a été intérrompu");
  }
  const executeCommand = () => {
    if (eventSource) {
      eventSource.close(); // Fermeture de la connexion SSE existante avant de créer une nouvelle
    }
    setOutput(''); // Réinitialiser la sortie

    const newEventSource = new EventSource('http://localhost:5000/api/console/stream?command=' + encodeURIComponent(command));
    setEventSource(newEventSource); // Mise à jour de l'état eventSource avec la nouvelle connexion SSE
  };

  return (
    <div>
      <h2>Exécution de commande</h2>
      <input
        type="text"
        value={command}
        onChange={e => setCommand(e.target.value)}
      />
      <button onClick={executeCommand}>Exécuter</button>
      <button onClick={stopCommand}>Stop</button>
      {output && (
        <div>
          <h3>Résultat :</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CommandExecution;

