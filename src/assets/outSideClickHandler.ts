import { MutableRefObject, Ref, RefObject } from "react";

export function listenForOutsideClicks(
    listening: boolean,
    setListening: (arg0: boolean) => void,
    menuRef:  RefObject<HTMLDivElement >,
    setIsOpen: (arg0: boolean) => void
  ) {
    return () => {
      if (listening) return;
      if (!menuRef.current) return;
      setListening(true);
      [`click`, `touchstart`].forEach((type) => {
        document.addEventListener(`click`, (evt) => {
          const cur = menuRef.current;
          const node = evt.target;
          if (cur?.contains(<Node>node)) return;
          setIsOpen(false);
        });
      });
    };
  }