import { useEffect } from 'react';

export function useOnClickOutside(ref, handler) {
  // função disparada ao clicar fora do botão
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  };

  useEffect(() => {
    // chama a função hadleClick
    document.addEventListener('click', handleClick);

    // para a funcção hadleClick
    return () => document.removeEventListener('click', handleClick);
  });
}
