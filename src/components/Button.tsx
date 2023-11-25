import { ComponentProps, PropsWithChildren } from "react";

const Button = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ComponentProps<"button">>) => {
  return (
    <button
      className={
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
