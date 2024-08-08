'use client';

import Link from 'next/link';
import test from 'node:test';
import { useEffect, useState } from 'react';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [user, setUser] = useState<string>('');

  useEffect(() =>{
    const testName = localStorage.getItem('user');
    setUser(testName ? String(testName) : '');
  }, []);

  const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleJoinRoom = () => {
    if (roomId && user) {
      localStorage.setItem('user', user);
      window.location.href = `/room/${roomId}`;
    }
  };

  return (
    <div>
      <h1>Counter Room App By Mathias</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={handleIDChange}
      />
      <input
        type="text"
        placeholder="Enter User Name"
        value={user}
        onChange={handleUserChange}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
}
