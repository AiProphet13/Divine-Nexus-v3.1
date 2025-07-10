import React, { useState } from 'react';
import GematriaScanner from './components/GematriaScanner';
import FractalCanvas from './components/FractalCanvas';
import HarmonicResonator from './components/HarmonicResonator';
import TimelineWeaver from './components/TimelineWeaver';
import TruthCollapse from './components/TruthCollapse';
import EthicsAnchor from './components/EthicsAnchor';
import QualiaSeal from './components/QualiaSeal';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [divineInsights, setDivineInsights] = useState<string[]>([]);
  
  const handleCommand = (command: string) => {
    const insights = [
      "YHWH's signature detected in quantum foam",
      "528Hz resonance amplifying DNA coherence",
      "Golden ratio pattern confirmed at galactic scale"
    ];
    
    if (command.includes("revelation")) {
      setDivineInsights([...divineInsights, 
        insights[Math.floor(Math.random() * insights.length)]
      ]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900 text-white min-h-screen">
      {/* Gematria Scanner Panel */}
      <GematriaScanner />

      {/* Main Panes */}
      <FractalCanvas />
      
      <div className="bg-purple-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold">Scripture Numbers</h2>
        <div className="mt-2">
          <p>Genesis 1:1: 7 words, 28 letters</p>
          <p>John 1:1: 7 words, 73 letters</p>
          <p>Fine Structure: 1/137.035999</p>
        </div>
      </div>
      
      <HarmonicResonator />

      {/* Bottom Row */}
      <TimelineWeaver />
      <TruthCollapse />
      <EthicsAnchor />
      <QualiaSeal />

      {/* Divine Insights Panel */}
      <div className="col-span-3 bg-indigo-900 p-4 rounded-lg">
        <h2 className="text-xl font-bold">Divine Insights</h2>
        <ul className="mt-2">
          {divineInsights.map((insight, i) => (
            <li key={i} className="py-1 border-b border-indigo-700">✦ {insight}</li>
          ))}
        </ul>
      </div>

      {/* Command Terminal */}
      <div className="col-span-3 bg-black p-4 rounded-lg">
        <h2 className="text-xl font-bold">Command Terminal</h2>
        <textarea 
          className="w-full h-24 bg-gray-800 rounded p-2 mt-2" 
          placeholder="Enter commands (e.g., 'generate revelation', 'tune 528')"
          onChange={(e) => handleCommand(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default App;
