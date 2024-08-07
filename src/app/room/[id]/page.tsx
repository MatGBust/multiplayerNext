'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import io, { Socket } from 'socket.io-client';
import { useParams, useSearchParams } from 'next/navigation';

interface RoomState {
  count: number;
  users: string[];
}

let socket: Socket;

export default function Room() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const user = searchParams.get('user') || '';
  const [room, setRoom] = useState<RoomState>({ count: 0, users: [] });

  useEffect(() => {
    socket = io();

    if (id) {
      socket.emit('joinRoom', { roomId: id, user });
      socket.on('updateRoom', (room: RoomState) => {
        setRoom(room);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [id, user]);

  const handleIncrement = () => {
    socket.emit('increment', { roomId: id, user });
  };

  const handleHome = () => {
    window.location.href = `/`;
  }

  return (
    <div>
        <button onClick={handleHome}>Go Home</button>
      <h1>Room: {id}</h1>
      <h2>Count: {room.count}</h2>
      <button onClick={handleIncrement}>Increment</button>
      <h3>Users in room:</h3>
      <ul>
        {room.users.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
}
