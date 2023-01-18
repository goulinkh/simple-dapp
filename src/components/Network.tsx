import { FC } from "react";

type Props = { name: string };

const Network: FC<Props> = ({ name }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-3 w-3 rounded-full bg-green-600  outline outline-4
       outline-green-600/20"
      ></div>
      <span className="capitalize">{name}</span>
    </div>
  );
};

export default Network;
