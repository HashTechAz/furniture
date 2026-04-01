'use client';

import React from 'react';

export default function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ padding: '24px' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '14px 0',
            borderBottom: i < rows - 1 ? '1px solid #f0f0f0' : 'none',
          }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 8, background: '#eee', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: '60%', height: 14, borderRadius: 4, background: '#eee', marginBottom: 6 }} />
            <div style={{ width: 80, height: 12, borderRadius: 4, background: '#f5f5f5' }} />
          </div>
          <div style={{ width: 60, height: 14, borderRadius: 4, background: '#eee' }} />
          <div style={{ width: 80, height: 14, borderRadius: 4, background: '#eee' }} />
        </div>
      ))}
    </div>
  );
}
