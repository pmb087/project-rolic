import { useState } from 'react';

export default function useHandleInput() {
  const [input, setInput] = useState<string>('');

  const handleInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setInput(value);
  };

  return { input, handleInput, setInput };
}
