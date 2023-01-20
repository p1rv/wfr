import { useRouter } from "../hooks/useRouter";
import React from "react";
import { routes } from "./routes";
import { HomeIcon } from "../svg/HomeIcon";
import chevronRight from "../svg/chevron-right.min.svg";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

const Breadcrumb: React.FC = () => {
  const {
    navigate,
    location: { pathname },
  } = useRouter();

  const { address } = useSelector((state: IRootState) => state.location.data);

  const explodedPath = pathname.split(/\//g);

  let renderedSearch;
  if (pathname === routes.weather.path) {
    renderedSearch = address && (
      <React.Fragment key={address}>
        <img
          src={chevronRight}
          alt=">"
          className="w-3 h-3 mx-3"
        />
        {address}
      </React.Fragment>
    );
  }

  if (pathname === "/") {
    document.title = "Karol Król  |  Portfolio";
    return null;
  }

  // slice(1) - skip home route
  const renderedPath = explodedPath.slice(1).map((piece) => (
    <React.Fragment key={piece}>
      <img
        src={chevronRight}
        alt=">"
        className="w-3 h-3 mx-3"
      />
      {Object.values(routes).map((route, ind) => {
        if (route.path.replace("/", "") === piece) {
          document.title = route.name + "  |  Karol Król";
          return route.name;
        }
      })}
    </React.Fragment>
  ));

  return (
    <div className="flex items-center w-4/5 py-[10px] w-4/5">
      <HomeIcon
        className="group w-4 h-4 cursor-pointer"
        pathClassName="group-hover:stroke-theme-1"
        onClick={() => navigate(routes.home.path)}
      />
      {renderedPath}
      {renderedSearch}
    </div>
  );
};

export default Breadcrumb;
