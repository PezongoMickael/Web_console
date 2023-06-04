import React from 'react';
import CommandExecution from './component/CommandExecution';

const App = () => {
  return (
    <div>
      <h1>Bienvenue dans cette application</h1>
      <CommandExecution />
    </div>
  );
};

export default App;
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// function App() {
//   const socket = io('http://localhost:5001');
//   const [command, setCommand] = useState('');
//   const [output, setOutput] = useState('');

//   useEffect(() => {
//     socket.on('output', (data) => {
//       setOutput((prevOutput) => prevOutput + data);
//     });

//     return () => {
//       socket.off('output');
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     socket.emit('command', command);
//     setOutput('');
//     setCommand('');
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={command}
//           onChange={(e) => setCommand(e.target.value)}
//         />
//         <button type="submit">Exécuter</button>
//       </form>
//       <pre>{output}</pre>
//     </div>
//   );
// }

// export default App;
