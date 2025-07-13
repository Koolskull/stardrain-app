import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { createPublicClient, http, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  const { ready, authenticated, login, user } = usePrivy();
  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready && authenticated && user?.wallet?.address) {
      checkNFTHoldings(user.wallet.address);
    }
  }, [ready, authenticated, user]);

  const checkNFTHoldings = async (address: string) => {
    setLoading(true);
    const client = createPublicClient({
      chain: mainnet,
      transport: http(import.meta.env.VITE_RPC_URL),
    });

    // Example: Check balance of a specific NFT contract (ERC-721)
    const nftContractAddress = '0xYourNFTContractAddress';  // Replace with your NFT contract
    const abi = parseAbi(['function balanceOf(address owner) view returns (uint256)']);
    const balance = await client.readContract({
      address: nftContractAddress,
      abi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    });

    setHasNFT(Number(balance) > 0);
    setLoading(false);
  };

  if (!ready || loading) return <div>Loading...</div>;
  if (!authenticated) return <button onClick={login}>Connect Wallet</button>;

  return (
    <div style={{ height: '100vh' }}>
    {hasNFT ? (
      <Canvas>
      {/* Your R3F game scene here */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
      </Canvas>
    ) : (
      <div>You need to hold our NFT to access the game!</div>
    )}
    </div>
  );
}

export default App;
