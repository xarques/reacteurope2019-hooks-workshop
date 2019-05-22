import { useEffect, useRef, useState } from 'react';

const useEventListener = (target, event, listener) => {
  const listenerRef = useRef();
  listenerRef.current = listener;
  useEffect(() => {
    const handleEvent = event => listenerRef.current(event);
    target.addEventListener(event, handleEvent);

    return () => target.removeEventListener(event, handleEvent);
  }, [target, event]);
};

const useActiveKeys = () => {
  const [activeKeys, setActiveKeys] = useState([]);

  useEventListener(window, 'keydown', event => {
    setActiveKeys(activeKeys => {
      if (!activeKeys.includes(event.keyCode)) {
        return [...activeKeys, event.keyCode];
      }
      return activeKeys;
    });
  });

  useEventListener(window, 'keyup', event => {
    setActiveKeys(activeKeys =>
      activeKeys.filter(keyCode => event.keyCode !== keyCode)
    );
  });

  return activeKeys;
};

// Nom des touches
const keyCodes = {
  alt: 18,
  f: 70
};

// Parsing du raccourcis pour obtenir les codes des touches
const getShortcutKeys = shortcut => {
  return shortcut.split('+').map(value => keyCodes[value.toLowerCase()]);
};

export const useShortcutEffect = (shortcut, effect) => {
  // Stockage de l'effect sur une ref afin d'éviter la capture
  const effectRef = useRef();
  effectRef.current = effect;

  // Récupération des clefs actives
  const activeKeys = useActiveKeys();

  // Effet permettant de tester les clefs et de déclencher l'effet
  // passé en paramètre si nécessaire
  useEffect(() => {
    const shortCutKeys = getShortcutKeys(shortcut);
    const match = shortCutKeys.every(key => activeKeys.includes(key));
    if (match) {
      effectRef.current();
    }
  }, [shortcut, activeKeys, effectRef]);
};
