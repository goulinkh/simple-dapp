import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={clsx(className, "rounded-lg py-1 px-4")}>
      {children}
    </button>
  );
};

export const PrimaryButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      className={clsx(
        props.className,
        "bg-primary text-white transition-[background-color] hover:bg-primary/90"
      )}
    />
  );
};

export const SecondaryButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      className={clsx(
        props.className,
        "border border-zinc-300 bg-black/5 transition-[background-color] hover:bg-black/10"
      )}
    />
  );
};
