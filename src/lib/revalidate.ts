// Admin create/update/delete sonrası cache təmizləmək – saytda və cədvəldə dərhal təzə məlumat görünsün.

export async function revalidateProducts() {
  try {
    await fetch(
      `/api/revalidate?tag=products&path=/&path=/product`,
      { method: 'GET', cache: 'no-store' }
    );
  } catch (e) {
    console.warn('Revalidate products failed:', e);
  }
}

export async function revalidateCategories() {
  try {
    await fetch(
      `/api/revalidate?path=/&path=/admin/categories`,
      { method: 'GET', cache: 'no-store' }
    );
  } catch (e) {
    console.warn('Revalidate categories failed:', e);
  }
}
