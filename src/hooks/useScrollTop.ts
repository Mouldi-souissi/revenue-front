import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const useScrollTop = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    const prevLocation = prevLocationRef.current;

    if (prevLocation && location !== prevLocation) {
      window.scrollTo(0, 0);
      prevLocationRef.current = location;
    }
  }, [location]);
};

export default useScrollTop;
