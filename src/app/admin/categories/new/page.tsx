"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCategory, getCategories, Category } from "@/lib/categories";

const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("accessToken") || "";
  return "";
};

export default function NewCategoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]); // Parent seçmək üçün
  
  // Form datası
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategoryId: "" // String kimi saxlayırıq, göndərəndə number edəcəyik
  });

  // Mövcud kateqoriyaları yüklə (Parent seçimi üçün)
  useEffect(() => {
    async function loadCats() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Kateqoriyalar yüklənmədi", err);
      }
    }
    loadCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        alert("Sessiya bitib, yenidən giriş edin.");
        router.push("/login");
        return;
      }

      await createCategory({
        name: formData.name,
        description: formData.description,
        parentCategoryId: formData.parentCategoryId ? Number(formData.parentCategoryId) : null
      }, token);

      alert("Kateqoriya uğurla yaradıldı!");
      router.push("/admin/categories"); // Siyahıya qaytar
      router.refresh(); // Siyahını yenilə
    } catch (error: any) {
      console.error(error);
      alert("Xəta baş verdi: " + (error.message || "Bilinməyən xəta"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>New Category</h1>
        <Link href="/admin/categories" style={{ textDecoration: "underline" }}>Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Name */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Category Name *</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            placeholder="e.g. Living Room"
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", minHeight: "100px" }}
            placeholder="Category description..."
          />
        </div>

        {/* Parent Category */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Parent Category (Optional)</label>
          <select
            value={formData.parentCategoryId}
            onChange={(e) => setFormData({ ...formData, parentCategoryId: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          >
            <option value="">-- No Parent (Main Category) --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
            Select only if this is a sub-category (e.g. "Dining Tables" under "Tables").
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "12px 20px",
            backgroundColor: isLoading ? "#ccc" : "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            marginTop: "10px"
          }}
        >
          {isLoading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}