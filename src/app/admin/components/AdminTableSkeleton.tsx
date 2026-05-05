'use client';

import React from 'react';

export default function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ padding: '0' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '20px 24px',
            borderBottom: i < rows - 1 ? '1px solid #f1f5f9' : 'none',
          }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#f1f5f9', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: '40%', height: 16, borderRadius: 6, background: '#f1f5f9', marginBottom: 8 }} />
            <div style={{ width: 100, height: 12, borderRadius: 4, background: '#f8fafc' }} />
          </div>
          <div style={{ width: 80, height: 14, borderRadius: 6, background: '#f1f5f9' }} />
          <div style={{ width: 100, height: 14, borderRadius: 6, background: '#f1f5f9' }} />
          <div style={{ width: 80, height: 36, borderRadius: 10, background: '#f1f5f9' }} />
        </div>
      ))}
    </div>
  );
}
