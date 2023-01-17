import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        "rounded-lg py-1 px-4 focus:border-primary focus:outline-primary"
      )}
    >
      {children}
    </button>
  );
};

export const PrimaryButton: FC<ButtonProps> = ({
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={clsx(
        className,
        "border border-transparent bg-primary text-white transition-[background-color] hover:bg-primary/90",
        { "!border-zinc-300 !bg-black/5 text-black": disabled }
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
