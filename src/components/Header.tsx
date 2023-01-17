import { FC } from "react";
import Address from "./Address";
import Network from "./Network";
import { SecondaryButton } from "./UI/Button";

type Props = {
  network: { name: string };
  address: string;
};
const Header: FC<Props> = ({ network, address }) => {
  return (
    <header className="container mt-3 mb-6 flex w-full items-center justify-between !py-2">
      <div className="flex items-center gap-3">
        <Network name={network.name} />
        <div className="h-11 border-r"></div>
        <Address address={address} />
      </div>
      <SecondaryButton>Disconnect</SecondaryButton>
    </header>
  );
};

export default Header;
