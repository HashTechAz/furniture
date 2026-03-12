'use client';

import { useEffect } from 'react';
import { getTokenExpiryMs } from '@/lib/auth';

export default function SessionKeepAlive() {
  useEffect(() => {
    const REFRESH_BEFORE_MS = 2 * 60 * 1000; // 2 dəqiqə əvvəl yenilə

    const checkAndRefresh = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;
      
      const expiryMs = getTokenExpiryMs(accessToken);
      if (!expiryMs) return;

      const timeLeft = expiryMs - Date.now();
      // Əgər tokenin bitməsinə 2 dəqiqədən az vaxt qalıbsa, amma HƏLƏ BİTMƏYİBSƏ (vaxt > 0)
      if (timeLeft > 0 && timeLeft < REFRESH_BEFORE_MS) {
        console.log('[SessionKeepAlive] Token 2 dəqiqədən az vaxta bitir. Arxa planda yenilənir...');
        try {
          const res = await fetch('/api/admin/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          });
          if (res.ok) {
            const data = await res.json();
            if (data.accessToken) {
              localStorage.setItem('accessToken', data.accessToken);
              document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
              console.log('[SessionKeepAlive] ✅ Proaktiv token yeniləndi');
            }
          } else {
             console.warn('[SessionKeepAlive] Refresh uğursuz, status:', res.status);
          }
        } catch (err) {
          console.error('[SessionKeepAlive] Proaktiv refresh xətası:', err);
        }
      }
    };

    // Hər 30 saniyədən bir yoxlayırıq
    const interval = setInterval(checkAndRefresh, 30 * 1000);
    
    // Səhifəyə (Tab-a) Qayıdanda dərhal yoxla
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkAndRefresh();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // İlk yüklənmədə bir dəfə yoxla
    checkAndRefresh();

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return null; // Görünməz komponent
}
