import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface IButtonProps {
  navButton?: boolean;
  primary?: boolean;
  secondary?: boolean;
  sidebar?: boolean;
  selected?: boolean;
  className?: string;
  disabled?: boolean;
  rounded?: boolean;
  link?: boolean;
  dropdown?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  [key: string]: any;
}

export const Button: React.FC<PropsWithChildren<IButtonProps>> = ({
  children,
  navButton,
  className,
  disabled,
  selected,
  primary,
  secondary,
  sidebar,
  rounded,
  link,
  dropdown,
  ...rest
}) => {
  const classes = classNames(className, "button", "duration-200", "transition-colors", "min-w-min", {
    "py-4 px-6 sm:px-4": !link,
    "!p-0": link,
    "cursor-pointer": !disabled,
    "rounded-full": rounded,
    "primary flex flex-col items-center justify-center overflow-hidden group relative": navButton,
    "hover:text-theme-1": primary,
    "text-theme-1": primary && disabled,
    "bg-transparent !text-theme-1 w-full py-2 px-2 hover:bg-theme-1 hover:!text-theme-4": secondary,
    "!bg-theme-1 !text-theme-4": secondary && selected,
    "text-theme-4": secondary && !disabled,
    "hover:!bg-theme-1 hover:!text-theme-4": secondary && disabled,
    "bg-transparent w-full py-2 px-4 text-left hover:bg-[#fafefb39] rounded-r-full": sidebar,
    "bg-[#fafefb1b] text-theme-1": sidebar && selected,
  });

  return (
    <button
      aria-label={dropdown ? "dropdown-button" : ""}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
};
