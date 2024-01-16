import { useEffect, useState } from 'react';
import boardTopBarStyles from '../components/BoardTopBar/boardTopBar.module.scss';

type BoardResizeStyle = {
  width: `${number}px` | `${number}%`;
};

export const useBoardResizeStyle = () => {
  const [boardResizeStyles, setBoardResizeStyles] = useState<BoardResizeStyle>({
    width: '100%',
  });

  const resizeListener = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const topBarHeight = document.querySelector(
      `.${boardTopBarStyles.board_top_bar}`,
    )!.clientHeight;

    if (windowWidth >= windowHeight) {
      setBoardResizeStyles({
        width: `${windowHeight - topBarHeight - 16}px`,
      });
    } else {
      setBoardResizeStyles({
        width: '100%',
      });
    }
  };

  useEffect(() => {
    resizeListener(); // initial resize

    addEventListener('resize', resizeListener);

    return () => {
      removeEventListener('resize', resizeListener);
    };
  }, []);

  return { boardResizeStyles };
};
