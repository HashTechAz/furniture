"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { getCategories, deleteCategory, Category } from "@/lib/categories";
import { revalidateCategories } from "@/lib/revalidate";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Datanı API-dən yüklə
  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // 2. Silmə funksiyası
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const token = localStorage.getItem("accessToken") || "";
      await deleteCategory(id, token);
      await revalidateCategories();
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      alert("Category deleted successfully!");
    } catch (error: any) {
      alert("Failed to delete: " + error.message);
    }
  };

  return (
    <div className={styles.categoriesPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Categories</h1>
          <p className={styles.subtitle}>Manage your product categories structure</p>
        </div>
        <Link href="/admin/categories/new" className={styles.addButton}>
          + Add New Category
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.colName}>Name</div>
          <div className={styles.colDesc}>Description</div>
          <div className={styles.colParent}>Parent Category</div>
          <div className={styles.colActions}>Actions</div>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className={styles.emptyState}>No categories found. Create one!</div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className={styles.tableRow}>
              <div className={styles.colName}>
                <span className={styles.nameText}>{category.name}</span>
              </div>
              <div className={styles.colDesc}>
                {category.description || <span className={styles.noData}>-</span>}
              </div>
              <div className={styles.colParent}>
                {category.parentCategoryName ? (
                   <span className={styles.badge}>{category.parentCategoryName}</span>
                ) : (
                   <span className={styles.mainBadge}>Main Category</span>
                )}
              </div>
              <div className={styles.colActions}>
                <div className={styles.actionsWrapper}>
                  {/* EDIT LINK: /edit hissəsini sildik, çünki folder [id] kimidir */}
                  <Link href={`/admin/categories/${category.id}`} className={styles.editButton}>
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(category.id)} 
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}