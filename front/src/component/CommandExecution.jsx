import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import axios from 'axios';
import './command.css'

const CommandExecution = () => {
  const [command, setCommand] = useState('');
  const [msfcommand, setMsfCommand] = useState('');
  const [output, setOutput] = useState('');
  const [msfOutput, setMsfOutput] = useState('');
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
  const executeCommandLs = () => {
    if (eventSource) {
      eventSource.close(); // Fermeture de la connexion SSE existante avant de créer une nouvelle
    }
    setOutput(''); // Réinitialiser la sortie

    const newEventSource = new EventSource('http://localhost:5000/api/console/stream?command=' + encodeURIComponent('ls'));
    setEventSource(newEventSource); // Mise à jour de l'état eventSource avec la nouvelle connexion SSE
  };
  const executeCommandIfconfig = () => {
    if (eventSource) {
      eventSource.close(); // Fermeture de la connexion SSE existante avant de créer une nouvelle
    }
    setOutput(''); // Réinitialiser la sortie

    const newEventSource = new EventSource('http://localhost:5000/api/console/stream?command=' + encodeURIComponent('ifconfig'));
    setEventSource(newEventSource); // Mise à jour de l'état eventSource avec la nouvelle connexion SSE
  };
  const executeCommandPwd = () => {
    if (eventSource) {
      eventSource.close(); // Fermeture de la connexion SSE existante avant de créer une nouvelle
    }
    setOutput(''); // Réinitialiser la sortie

    const newEventSource = new EventSource('http://localhost:5000/api/console/stream?command=' + encodeURIComponent('pwd'));
    setEventSource(newEventSource); // Mise à jour de l'état eventSource avec la nouvelle connexion SSE
  };

  const executeCommandId = () => {
    if (eventSource) {
      eventSource.close(); // Fermeture de la connexion SSE existante avant de créer une nouvelle
    }
    setOutput(''); // Réinitialiser la sortie

    const newEventSource = new EventSource('http://localhost:5000/api/console/stream?command=' + encodeURIComponent('id'));
    setEventSource(newEventSource); // Mise à jour de l'état eventSource avec la nouvelle connexion SSE
  };
  const executeCommandWhoami = () => {
    if (eventSource) {
      eventSource.close(); // Fermeture de la connexion SSE existante avant de créer une nouvelle
    }
    setOutput(''); // Réinitialiser la sortie

    const newEventSource = new EventSource('http://localhost:5000/api/console/stream?command=' + encodeURIComponent('whoami'));
    setEventSource(newEventSource); // Mise à jour de l'état eventSource avec la nouvelle connexion SSE
  };
  const executeMsfCommand = async (event) => {
    try{
      axios.get('http://localhost:5001/command?command=' + encodeURIComponent(msfcommand)).then((res) => {
        setMsfOutput(res.data)
      });
    }catch (error){
      console.log(error);
    }
     // Mise à jour de l'état eventSource avec la nouvelle connexion SSE
  };

  const lines = msfOutput.split('\n');
  return (
    <div>
      <div className="top-bar">
              <div className="welcome-message">
                  <p>Bienvenue sur Raspberry Pi Terminal</p>
              </div>
      </div>
      <div className="container">
        <div className="terminal">
            <div className="title">
                <h1>START HACKING</h1>
            </div>
            <pre id="output"></pre>
            <div className="input-line">
                <span>$</span>
                <input type="text" id="commandInput" autofocus onChange={e => setCommand(e.target.value)}/>
                <button id="runButton" onClick={executeCommand}>Run</button>
                <button id="runButton" onClick={stopCommand}>Stop</button>
            </div>
            <div className="commands">
                <button className="commandButton" onClick={executeCommandLs}>ls</button>
                <button className="commandButton" onClick={executeCommandIfconfig}>ifconfig</button>
                <button className="commandButton" onClick={executeCommandPwd}>pwd</button>
                <button className="commandButton" onClick={executeCommandId}>id</button>
                <button className="commandButton" onClick={executeCommandWhoami}>Whoami</button>
            </div>
            {output
              &&
                <div id="resultArea"><pre>{output}</pre></div>
            }
        </div>
        <div className="terminal">
            <div className="title">
                <h1>Advanced hacking with msfconsole</h1>
            </div>
            <pre id="output"></pre>
            <div className="input-line">
                <span>$</span>
                <input type="text" id="commandInput" autofocus onChange={e => setMsfCommand(e.target.value)}/>
                <button id="runButton" onClick={executeMsfCommand}>Run</button>
                <button id="runButton" onClick={stopCommand}>Stop</button>
            </div>
            {msfOutput
              &&
                <div id="resultArea">
                  <pre dangerouslySetInnerHTML={{ __html: msfOutput}} />
                </div>
            }
        </div>
      </div>
    </div>
  );
};

export default CommandExecution;

