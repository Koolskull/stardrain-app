import { useEffect, useState } from 'react';
import { createPublicClient, http, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAccount } from 'wagmi'; // Add this import
import { ConnectButton } from '@rainbow-me/rainbowkit'; // Add this import

function App() {
  const { address, isConnected } = useAccount(); // Replace usePrivy with this
  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      checkNFTHoldings(address);
    } else {
      setLoading(false); // If not connected, stop loading
    }
  }, [isConnected, address]);

  const checkNFTHoldings = async (address: 0x${string}) => {
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
      args: [address],
    });

    setHasNFT(Number(balance) > 0);
    setLoading(false);
  };

  if (loading) return

    Loading...
    ;
  return (

    <connectbutton> {/* This replaces the <button onclick="{login}">Connect Wallet</button> */} </connectbutton>
    {isConnected ? ( hasNFT ? ( <canvas> {/* Your R3F game scene here */} <ambientlight> <pointlight position="{[10," 10,="" 10]}=""> <mesh> <boxgeometry args="{[1," 1,="" 1]}=""> <meshstandardmaterial color="hotpink"> </meshstandardmaterial></boxgeometry></mesh> <orbitcontrols> </orbitcontrols></pointlight></ambientlight></canvas> ) : (
      You need to hold our NFT to access the game!
    ) ) : (
      Please connect your wallet to continue.
      {/* Optional message if not connected */} )}
  ); }
  export default App;
