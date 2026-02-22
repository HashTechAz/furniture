"use client";

import React, { useEffect, useState } from "react";
import styles from "./Related.module.css";
import Image from "next/image";
import Link from "next/link";
import { getRooms } from "@/lib/rooms";

const PLACEHOLDER_IMAGE = 'https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027';

const Related = () => {
  const [rooms, setRooms] = useState<{ id: number; name: string; imageUrl?: string; description?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms()
      .then((data) => {
        if (Array.isArray(data)) {
          // Get the first 3 rooms
          setRooms(data.slice(0, 3));
        } else {
          setRooms([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch rooms for Related component", err);
        setRooms([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const baseUrl = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042') : 'https://localhost:7042';

  return (
    <section className={styles.related}>
      <h1>Inspiration & Rooms</h1>

      <div className={styles.relatedMain}>
        {loading ? (
          <p>Loading inspiration...</p>
        ) : rooms.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          rooms.map((room) => {
            const imageUrl = room.imageUrl
              ? (room.imageUrl.startsWith('http') ? room.imageUrl : `${baseUrl}${room.imageUrl.startsWith('/') ? '' : '/'}${room.imageUrl}`)
              : PLACEHOLDER_IMAGE;

            return (
              <div className={styles.relatedItems} key={room.id}>
                <Link href={`/product?roomId=${room.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={styles.imageContainer}>
                    <Image fill src={imageUrl} alt={room.name ?? ""} className={styles.relatedImage} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h3>{room.name}</h3>
                  <p>{room.description || `Explore our elegant ${room.name} designs and find inspiration for your own space.`}</p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Related;
