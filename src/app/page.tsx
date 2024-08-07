'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [user, setUser] = useState<string>('');

  const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleJoinRoom = () => {
    if (roomId && user) {
      window.location.href = `/room/${roomId}?user=${encodeURIComponent(user)}`;
    }
  };

  return (
    <div>
      <h1>Welcome to the Real-Time Room App</h1>
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
