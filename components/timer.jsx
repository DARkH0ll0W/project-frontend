"use client";

import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex items-center m-3 text-white justify-center">
      <div className="flex flex-row items-center text-center">
          <div className="p-2 text-xl font-bold font-mono tracking-wider">
            {time}
          </div>
          <div className="p-3 text-sm text-white/80 font-mono tracking-wider">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      
    </div>
  );
};

export default Timer;
