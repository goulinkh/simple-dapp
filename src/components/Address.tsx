import * as Tooltip from "@radix-ui/react-tooltip";
import { FC } from "react";
import useCopyToClipboard from "src/hooks/useCopyToClipboard";

type Props = {
  address: string;
  className?: string;
};
const Address: FC<Props> = ({ address, className }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const copyAddressToClipboard = () => {
    copyToClipboard(address);
  };

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger className={className} onClick={copyAddressToClipboard}>
          {address}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="animate-fade rounded-md border bg-white/50 px-4 py-2 text-xs"
            side="bottom"
          >
            Click to copy address to clipboard
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Address;
