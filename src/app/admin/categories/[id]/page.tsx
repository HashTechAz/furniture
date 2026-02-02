"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // params burada yox, props kimi gəlir
import Link from "next/link";
import { getCategoryById, updateCategory, getCategories, Category } from "@/lib/categories";

const getToken = () => typeof window !== "undefined" ? localStorage.getItem("accessToken") || "" : "";

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Next.js 15-də params promise ola bilər, ona görə id-ni belə alırıq (və ya sadəcə params.id istifadə edirik)
  // Amma "client component"-də props-dan birbaşa götürmək olar.
  const categoryId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategoryId: ""
  });

  // Datanı yüklə
  useEffect(() => {
    async function init() {
      try {
        // 1. Bütün kateqoriyaları yüklə (Dropdown üçün)
        const allCats = await getCategories();
        setCategories(allCats);

        // 2. Cari kateqoriyanı yüklə
        const currentCat = await getCategoryById(categoryId);
        setFormData({
            name: currentCat.name,
            description: currentCat.description || "",
            parentCategoryId: currentCat.parentCategoryId ? String(currentCat.parentCategoryId) : ""
        });

      } catch (err) {
        console.error("Yüklənmə xətası:", err);
        alert("Kateqoriya tapılmadı!");
        router.push("/admin/categories");
      }
    }
    
    if (categoryId) init();
  }, [categoryId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = getToken();
      await updateCategory(categoryId, {
        name: formData.name,
        description: formData.description,
        parentCategoryId: formData.parentCategoryId ? Number(formData.parentCategoryId) : null
      }, token);

      alert("Kateqoriya yeniləndi!");
      router.push("/admin/categories");
      router.refresh();
    } catch (error: any) {
      alert("Xəta: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>Edit Category</h1>
        <Link href="/admin/categories" style={{ textDecoration: "underline" }}>Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Category Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", minHeight: "100px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Parent Category</label>
          <select
            value={formData.parentCategoryId}
            onChange={(e) => setFormData({ ...formData, parentCategoryId: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          >
            <option value="">-- No Parent --</option>
            {categories.map((cat) => (
                // Özünü parent kimi seçə bilməz
               Number(cat.id) !== Number(categoryId) && (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
               )
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "12px 20px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}