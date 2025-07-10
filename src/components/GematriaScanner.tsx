import React, { useState } from 'react';

const hebrewGematria = (word: string): number => {
  const gematriaMap: { [key: string]: number } = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10,
    'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90, 'ק': 100,
    'ר': 200, 'ש': 300, 'ת': 400,
    'ך': 20, 'ם': 40, 'ן': 50, 'ף': 80, 'ץ': 90,
  };
  return word.split('').reduce((sum, letter) => sum + (gematriaMap[letter] || 0), 0);
};

const significantValues: { [key: number]: string } = {
  26: 'יהוה (YHWH)',
  73: 'חכמה (Chokmah/Wisdom)',
  86: 'אלהים (Elohim)',
  137: 'קבלה (Kabbalah/Alpha)',
};

const GematriaScanner: React.FC = () => {
  const [text, setText] = useState<string>('בראשית ברא אלהים את השמים ואת הארץ');

  const scannedWords = text.split(/\s+/).map(word => {
    const value = hebrewGematria(word);
    return {
      word,
      value,
      significance: significantValues[value] || null,
    };
  });

  const totalValue = scannedWords.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-blue-800 p-4 rounded-lg col-span-3">
      <h2 className="text-xl font-bold mb-2">📜 Gematria Scanner</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste Hebrew text here to scan..."
        className="w-full h-24 p-2 bg-gray-700 rounded mb-2 text-lg text-right"
      />
      <div className="p-2 bg-gray-900 rounded">
        <h3 className="font-bold text-yellow-300">Total Value: {totalValue}</h3>
        <div className="flex flex-wrap">
          {scannedWords.map((item, index) => (
            <div key={index} className={`p-2 m-1 rounded ${item.significance ? 'bg-yellow-500 text-black' : 'bg-indigo-600'}`}>
              <span className="font-bold">{item.word}</span>: {item.value}
              {item.significance && <span className="block text-xs">({item.significance})</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GematriaScanner;
