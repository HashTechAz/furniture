'use client';

import React from 'react';

export default function AdminDashboardSkeleton() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ width: 280, height: 28, background: '#eee', borderRadius: 6, marginBottom: 8 }} />
        <div style={{ width: 320, height: 16, background: '#f0f0f0', borderRadius: 4 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              padding: 24,
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #eee',
            }}
          >
            <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 10, marginBottom: 16 }} />
            <div style={{ width: 36, height: 28, background: '#eee', borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: 80, height: 14, background: '#f5f5f5', borderRadius: 4 }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ padding: 24, background: '#fff', borderRadius: 12, border: '1px solid #eee' }}>
          <div style={{ width: 140, height: 20, background: '#eee', borderRadius: 4, marginBottom: 20 }} />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eee' }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: '70%', height: 14, background: '#eee', borderRadius: 4, marginBottom: 6 }} />
                <div style={{ width: 100, height: 12, background: '#f5f5f5', borderRadius: 4 }} />
              </div>
              <div style={{ width: 60, height: 14, background: '#eee', borderRadius: 4 }} />
            </div>
          ))}
        </div>
        <div style={{ padding: 24, background: '#fff', borderRadius: 12, border: '1px solid #eee' }}>
          <div style={{ width: 100, height: 20, background: '#eee', borderRadius: 4, marginBottom: 20 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ width: '100%', height: 44, background: '#f5f5f5', borderRadius: 8 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
