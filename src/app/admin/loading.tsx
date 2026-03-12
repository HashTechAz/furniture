'use client';

import React from 'react';
import AdminTableSkeleton from './components/AdminTableSkeleton';

export default function AdminLoading() {
  return (
    <div style={{ padding: '20px 40px', maxWidth: 1600, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ width: 180, height: 24, background: '#eee', borderRadius: 6, marginBottom: 16 }} />
        <div style={{ width: 120, height: 40, background: '#eee', borderRadius: 8 }} />
      </div>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #eaeaea', overflow: 'hidden' }}>
        <AdminTableSkeleton rows={6} />
      </div>
    </div>
  );
}
