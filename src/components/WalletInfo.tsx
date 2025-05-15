import { useState } from 'react';
import { getWalletPortfolio } from '../utils/helius';

export default function WalletInfo() {
  const [address, setAddress] = useState('');
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    setError('');
    try {
      const data = await getWalletPortfolio(address);
      setPortfolio(data);
    } catch (err) {
      setError('Failed to fetch wallet information');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Solana wallet address"
            className="flex-1 p-3 rounded-lg bg-black/20 border border-white/10 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Check Wallet'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {portfolio && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Wallet Portfolio</h2>
          
          <div className="grid gap-4">
            {/* Native SOL Balance */}
            <div className="p-4 rounded-lg bg-black/20 border border-white/10">
              <h3 className="text-lg font-semibold mb-2">SOL Balance</h3>
              <p className="text-2xl">{portfolio.nativeBalance} SOL</p>
            </div>

            {/* Tokens */}
            {portfolio.tokens && portfolio.tokens.length > 0 && (
              <div className="p-4 rounded-lg bg-black/20 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Tokens</h3>
                <div className="space-y-3">
                  {portfolio.tokens.map((token: any) => (
                    <div key={token.mint} className="flex justify-between items-center">
                      <span>{token.name || token.mint.slice(0, 8)}</span>
                      <span>{token.balance} {token.symbol}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 