import React, { useState, useEffect } from 'react';

export const GlassTerminal = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const command = 'starboy@system:~$ init_agents --mode=vibe';
  const restLines = [
    '[OK] Core logic loaded.',
    '[OK] Connecting to Hugging Face...',
    'System Online. Ready to build.'
  ];

  useEffect(() => {
    if (currentLineIdx === 0) {
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx < command.length) {
          setTypedCommand((prev) => prev + command[charIdx]);
          charIdx++;
        }
        if (charIdx === command.length) {
          clearInterval(interval);
          setTimeout(() => {
            setTerminalLines([`> ${command}`]);
            setCurrentLineIdx(1);
          }, 600);
        }
      }, 45);
      return () => clearInterval(interval);
    } else if (currentLineIdx === 1) {
      const timer = setTimeout(() => {
        setTerminalLines((prev) => [...prev, `> ${restLines[0]}`]);
        setCurrentLineIdx(2);
      }, 400);
      return () => clearTimeout(timer);
    } else if (currentLineIdx === 2) {
      const timer = setTimeout(() => {
        setTerminalLines((prev) => [...prev, `> ${restLines[1]}`]);
        setCurrentLineIdx(3);
      }, 700);
      return () => clearTimeout(timer);
    } else if (currentLineIdx === 3) {
      const timer = setTimeout(() => {
        setTerminalLines((prev) => [...prev, `> ${restLines[2]}`]);
        setIsComplete(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLineIdx]);

  return (
    <div className="glass-terminal">
      <div className="terminal-header">
        <span className="dot dot-red"></span>
        <span className="dot dot-yellow"></span>
        <span className="dot dot-green"></span>
        <span className="terminal-title">starboy@system: ~</span>
      </div>
      <div className="terminal-body">
        {currentLineIdx === 0 ? (
          <div className="terminal-line active-line">
            {typedCommand}
            <span className="cursor-block">█</span>
          </div>
        ) : (
          <>
            {terminalLines.map((line, idx) => {
              const isCommand = line.includes('init_agents');
              const isOk = line.includes('[OK]');
              const isOnline = line.includes('System Online');
              
              let lineClass = 'terminal-line';
              if (isCommand) lineClass += ' command-color';
              else if (isOk) lineClass += ' success-color';
              else if (isOnline) lineClass += ' online-color';

              return (
                <div key={idx} className={lineClass}>
                  {line}
                </div>
              );
            })}
            {!isComplete && (
              <div className="terminal-line">
                <span className="cursor-block">█</span>
              </div>
            )}
            {isComplete && (
              <div className="terminal-line">
                <span className="cursor-block blink">█</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
