import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

async function getRequestPermission() {
  if (typeof DeviceMotionEvent.requestPermission != 'function') return 'denided';
  return await DeviceMotionEvent.requestPermission();
}

function roundNum(val) {
  return Math.round(val * Math.pow(10, 2)) / Math.pow(10, 2);
}

export default function Home() {
  const [motionData, setMotionData] = useState({
    acceleration: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null }
  });

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      setMotionData({
        acceleration: event.acceleration,
        rotationRate: event.rotationRate
      });
    };

    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    // Clean up the event listener when component is unmounted
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  async function handleClick() {
    const permission = await getRequestPermission();
    if (permission !== 'granted') return;

  }

  return (
    <main className="font-mono p-8">
    <div>
      <h1>Device Motion Data:</h1>
      <h2>Acceleration:</h2>
      <p>X: {roundNum(motionData.acceleration.x)}</p>
      <p>Y: {roundNum(motionData.acceleration.y)}</p>
      <p>Z: {roundNum(motionData.acceleration.z)}</p>

      <h2>Rotation Rate:</h2>
      <p>Alpha: {roundNum(motionData.rotationRate.alpha)}</p>
      <p>Beta: {roundNum(motionData.rotationRate.beta)}</p>
      <p>Gamma: {roundNum(motionData.rotationRate.gamma)}</p>
    </div>
      <button
        className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleClick}>
        計測開始
      </button>
    </main>
  )
}

