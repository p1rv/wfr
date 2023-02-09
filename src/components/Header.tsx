import { Button } from "./Button";
import { Menu } from "./Menu";
import { routes } from "../routes";
import { useRouter } from "../hooks/useRouter";
import { HomeIcon } from "../svg/HomeIcon";
import classNames from "classnames";
import { useContext } from "react";
import { ILanguageObject, LanguageContext } from "../context/LanguageProvider";

interface IHeaderProps {
  scrollDirection: 0 | 1;
}

const homeButtonText: ILanguageObject = {
  EN: "Home",
  PL: "Główna",
};

export const Header: React.FC<IHeaderProps> = ({ scrollDirection }) => {
  const {
    navigate,
    location: { pathname },
  } = useRouter();

  const { language } = useContext(LanguageContext);

  const className = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "transition-all",
    "duration-200",
    "ease-in-out",
    "motion-reduce:!transition-none motion-reduce:!duration-0",
    !scrollDirection && "sticky top-0 bg-[#02040af0] z-20 animate-[slideIn1_0.2s_ease]",
    pathname === "/" ? "w-screen h-24 mt-6" : "w-4/5 sm:w-full h-20 lg:w-[90vw]",
    "md:!mt-4"
  );

  return (
    <div className={className}>
      <Button
        primary
        navButton
        onClick={() => navigate(routes.home.path)}
        className="flex flex-col items-center"
      >
        <HomeIcon
          className="w-8 h-8"
          pathClassName="group-hover:stroke-theme-1"
        />
        {homeButtonText[language]}
      </Button>
      <Menu />
    </div>
  );
};
