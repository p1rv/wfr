import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { SingleStar } from "./SingleStar";

export const StarryBackgroundWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const renderedStars = new Array(100)
    .fill(0)
    .map((_, i) => <SingleStar key={i} />);
  return (
    <div className="">
      <div className="stars-wrapper fixed inset-0 z-[-1] bg-theme-4">
        {renderedStars}
      </div>
      {children}
    </div>
  );
};