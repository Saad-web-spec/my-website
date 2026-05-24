import React, { useState, useEffect } from 'react';

export const Typewriter = ({ words, delay = 80, pause = 2200 }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.substring(0, prev.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, delay / 2);
    } else {
      timer = setTimeout(() => {
        setText((prev) => currentWord.substring(0, prev.length + 1));
        if (text === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), pause);
        }
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, delay, pause]);

  return (
    <span className="typewriter-text">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};
