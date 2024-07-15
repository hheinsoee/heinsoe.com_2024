import React, { useRef, useEffect, useState } from "react";

const EndDetect = ({
  onEnd,
  children,
}: {
  onEnd: (end: boolean) => void;
  children?: React.ReactNode | React.ReactNode[];
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [divRef.current]);

  useEffect(() => {
    onEnd(isIntersecting);
  }, [isIntersecting]);
  return (
    <div
      ref={divRef}
      style={{
        height: "200px",
      }}
      onClick={() => onEnd(true)}
    >
      {children||""}
    </div>
  );
};

export default EndDetect;
