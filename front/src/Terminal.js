import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import './Terminal.css';

const Terminal = ({ socket }) => {
  const terminalRef = useRef(null);
  const fitAddonRef = useRef(null);

  useEffect(() => {
    const terminal = new XTerm();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminal.open(terminalRef.current);
    fitAddon.fit();

    const attachAddon = new AttachAddon(socket);
    terminal.loadAddon(attachAddon);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        const command = event.target.value;
        socket.send(command);
        event.target.value = '';
      }
    };

    terminal.onResize(({ cols, rows }) => {
      socket.send(JSON.stringify({ resize: { cols, rows } }));
    });

    const container = terminalRef.current;
    container.addEventListener('keypress', handleKeyPress);

    return () => {
      container.removeEventListener('keypress', handleKeyPress);
      terminal.dispose();
    };
  }, [socket]);

  return <div ref={terminalRef} className="terminal" />;
};

export default Terminal;
