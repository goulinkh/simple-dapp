import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from "react";

type Props = {
  label: string;
  postfix?: ReactElement;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput: FC<Props> = ({ label, postfix, ...props }) => {
  return (
    <label className="block">
      <span className="">{label}</span>
      <div className="relative mt-2">
        <input
          type="text"
          className="w-full rounded-lg border-zinc-200 bg-zinc-100 focus:border-primary focus:ring-primary"
          {...props}
        />
        {postfix}
      </div>
    </label>
  );
};
export default TextInput;
