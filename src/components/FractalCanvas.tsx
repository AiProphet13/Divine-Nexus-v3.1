import React, { useRef, useEffect } from 'react';

const FractalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const WIDTH = 400, HEIGHT = 400;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const MAX_ITERATION = 80;
    const REAL_SET = { start: -2, end: 1 };
    const IMAGINARY_SET = { start: -1, end: 1 };
    const colors = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`);

    for (let i = 0; i < WIDTH; i++) {
      for (let j = 0; j < HEIGHT; j++) {
        const complex = {
          x: REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
          y: IMAGINARY_SET.start + (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start),
        };

        let z = { x: 0, y: 0 }, n = 0, d;
        do {
          const p = { x: z.x ** 2 - z.y ** 2, y: 2 * z.x * z.y };
          z = { x: p.x + complex.x, y: p.y + complex.y };
          d = Math.sqrt(z.x ** 2 + z.y ** 2);
          n += 1;
        } while (d <= 2 && n < MAX_ITERATION);

        const isMandelbrotSet = d <= 2;
        ctx.fillStyle = colors[isMandelbrotSet ? 0 : (n % colors.length - 1) + 1];
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }, []);

  return (
    <div className="bg-indigo-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Fractal Canvas (Mandelbrot with Scriptural Overlays)</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FractalCanvas;
