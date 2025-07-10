import React, { useRef, useEffect } from 'react';

const QualiaSeal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 300;
    canvas.height = 300;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.translate(canvas.width/2, canvas.height/2);
    
    const φ = 1.6180339887;
    for (let i = 0; i < 5; i++) {
      const radius = 30 * Math.pow(φ, i);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = i % 2 === 0 ? '#ffd700' : '#00ffff';
      ctx.lineWidth = 1.618;
      ctx.stroke();
    }
    
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI/3 * i) - Math.PI/2;
      const r = 70;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.font = "bold 24px 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText("יהוה", 0, 0);
    
  }, []);

  return (
    <div className="bg-red-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Qualia Seal</h2>
      <canvas ref={canvasRef} className="w-full"></canvas>
    </div>
  );
};

export default QualiaSeal;
