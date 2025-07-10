import React, { useState } from 'react';
import { ethers } from 'ethers';

const EthicsAnchor: React.FC = () => {
  const [sealedHash, setSealedHash] = useState('');
  const [verse, setVerse] = useState('Genesis 1:1');
  
  const sealOnBlockchain = async () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(`${verse}@${Date.now()}`);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setSealedHash(`0x${hashHex}`);
      
      if (hashHex.startsWith('73')) {
        console.log("Divine wisdom pattern detected!");
      }
    } catch (error) {
      console.error("Sealing failed:", error);
    }
  };

  return (
    <div className="bg-yellow-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Ethics Anchor</h2>
      <div className="my-2">
        <input 
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          className="w-full p-1 bg-gray-700 rounded"
          placeholder="Enter scripture reference"
        />
      </div>
      <button
        onClick={sealOnBlockchain}
        className="px-4 py-2 bg-yellow-600 rounded w-full"
      >
        Seal on Blockchain
      </button>
      {sealedHash && (
        <div className="mt-2 text-xs break-all">
          Divine Seal: {sealedHash}
        </div>
      )}
    </div>
  );
};

export default EthicsAnchor;
