import { useEffect, useState } from 'react';
import { createPublicClient, http, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  const { address, isConnected } = useAccount();
  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      checkNFTHoldings(address);
    } else {
      setLoading(false);
    }
  }, [isConnected, address]);

  const checkNFTHoldings = async (address: `0x${string}`) => {
    setLoading(true);
    const client = createPublicClient({
      chain: mainnet,
      transport: http(import.meta.env.VITE_RPC_URL),
    });

    // Example: Check balance of a specific NFT contract (ERC-721)
    const nftContractAddress = '0xC5759Dd58057808568C698fFDc4Ad5548D17e75a';  // Replace with your NFT contract
    const abi = parseAbi(['function balanceOf(address owner) view returns (uint256)']);
    const balance = await client.readContract({
      address: nftContractAddress,
      abi,
      functionName: 'balanceOf',
      args: [address],
    });

    setHasNFT(Number(balance) > 0);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ height: '100vh' }}>
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
    <ConnectButton />
    </div>
    {isConnected ? (
      hasNFT ? (
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
      )
    ) : (
      <div>Please connect your wallet to continue.</div>
    )}
    </div>
  );
}

export default App;
