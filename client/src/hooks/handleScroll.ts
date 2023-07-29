import { useEffect, useState } from "react";

const useHandleScrollController = (container: any) => {
  const [rightshow, setRightshow] = useState<boolean>(true);
  const [leftshow, setLeftshow] = useState<boolean>(false);
  const handleScroll = () => {
    if (container) {
      const position = container.current.scrollLeft;
      if (position < 200) {
        setRightshow(true);
        setLeftshow(false);
      } else {
        setLeftshow(true);
      }
      if (
        position >
        container.current.scrollWidth - container.current.clientWidth - 2
      ) {
        setRightshow(false);
      } else {
        setRightshow(true);
      }
    }
  };

  useEffect(() => {
    if (container) {
      container.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => {
        container?.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [container]);
  return { rightshow, leftshow };
};

export default useHandleScrollController;