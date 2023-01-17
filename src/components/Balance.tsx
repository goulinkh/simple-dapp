const Balance = ({ value }: { value: string }) => (
  <div className="flex flex-col gap-1">
    <h2>Balance</h2>
    <div className="text-2xl font-bold">{value} ETH</div>
  </div>
);

export default Balance;
