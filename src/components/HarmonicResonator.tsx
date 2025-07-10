import React, { useRef, useState } from 'react';
import * as Tone from 'tone';

const HarmonicResonator: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const synthRef = useRef<Tone.Synth | null>(null);

  const frequencies = [528, 40];

  useEffect(() => {
    synthRef.current = new Tone.Synth().toDestination();
    setLoaded(true);
  }, []);

  const playFrequency = (freq: number) => {
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(`${freq}`, '8n');
    }
  };

  return (
    <div className="bg-teal-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Harmonic Resonator</h2>
      <button
        disabled={!isLoaded}
        onClick={() => playFrequency(528)}
        className="px-4 py-2 bg-green-600 rounded mr-2"
      >
        Play 528Hz (DNA Repair)
      </button>
      <button
        disabled={!isLoaded}
        onClick={() => playFrequency(40)}
        className="px-4 py-2 bg-green-600 rounded"
      >
        Play 40Hz (Revelation)
      </button>
    </div>
  );
};

export default HarmonicResonator;
