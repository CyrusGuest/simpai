interface HeliusResponseProps {
  type: 'wallet' | 'token' | 'tx';
  data: any;
}

export default function HeliusResponse({ type, data }: HeliusResponseProps) {
  if (!data) return null;

  const renderWalletInfo = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-black/20 border border-white/10">
        <h3 className="text-lg font-semibold mb-2">SOL Balance</h3>
        <p className="text-xl">{data.nativeBalance} SOL</p>
      </div>

      {data.tokens && data.tokens.length > 0 && (
        <div className="p-4 rounded-lg bg-black/20 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Tokens</h3>
          <div className="space-y-3">
            {data.tokens.map((token: any) => (
              <div key={token.mint} className="flex justify-between items-center">
                <span>{token.name || token.mint.slice(0, 8)}</span>
                <span>{token.balance} {token.symbol}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTokenInfo = () => (
    <div className="p-4 rounded-lg bg-black/20 border border-white/10">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-white/70">Name</span>
          <span>{data.onChainMetadata?.metadata?.data?.name || 'Unknown'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Symbol</span>
          <span>{data.onChainMetadata?.metadata?.data?.symbol || 'Unknown'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Mint</span>
          <span className="text-sm">{data.account}</span>
        </div>
      </div>
    </div>
  );

  const renderTransactionInfo = () => (
    <div className="p-4 rounded-lg bg-black/20 border border-white/10">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-white/70">Type</span>
          <span>{data.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Status</span>
          <span className={data.success ? 'text-green-400' : 'text-red-400'}>
            {data.success ? 'Success' : 'Failed'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Timestamp</span>
          <span>{new Date(data.timestamp * 1000).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-4">
      {type === 'wallet' && renderWalletInfo()}
      {type === 'token' && renderTokenInfo()}
      {type === 'tx' && renderTransactionInfo()}
    </div>
  );
} 