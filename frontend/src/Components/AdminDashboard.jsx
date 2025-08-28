import { useState, useEffect } from "react";
import { productsAPI } from "../data/api";

export default function FullAdminDashboard() {
  const [product, setProduct] = useState({
    nama_produk: "",
    deskripsi: "",
    harga: "",
    Stok: "",
    gambar: null,
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("add");

  useEffect(() => {
    console.log("Tab aktif:", activeTab);
    // FIX: Ubah dari "products" ke "list"
    if (activeTab === "list") {
      fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Reset error sebelum fetch
    try {
      console.log("Fetching products...");
      const response = await productsAPI.getAll();
      console.log("API Response:", response);
      console.log("Response type:", typeof response);
      
      // Handle berbagai kemungkinan struktur response
      let productsData;
      if (Array.isArray(response)) {
        productsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response && response.products && Array.isArray(response.products)) {
        productsData = response.products;
      } else if (response && typeof response === 'object') {
        // Jika response adalah object, cari array di dalamnya
        const keys = Object.keys(response);
        const arrayKey = keys.find(key => Array.isArray(response[key]));
        if (arrayKey) {
          productsData = response[arrayKey];
        } else {
          console.warn("No array found in response:", response);
          productsData = [];
        }
      } else {
        console.warn("Unexpected response structure:", response);
        productsData = [];
      }
      
      console.log("Processed products data:", productsData);
      // Debug: Tampilkan path gambar untuk setiap produk
      productsData.forEach((product, index) => {
        console.log(`Product ${index + 1} - ${product.nama_produk}:`, {
          id: product.id,
          gambar: product.gambar,
          imageUrl: product.gambar ? (product.gambar.startsWith('http') ? product.gambar : `http://localhost:3000${product.gambar}`) : 'No image'
        });
      });
      setProducts(productsData);
      
    } catch (err) {
      console.error("Error fetching products:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch products";
      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setProduct({ ...product, gambar: files?.[0] || null });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const resetForm = () => {
    setProduct({
      nama_produk: "",
      deskripsi: "",
      gambar: null,
      harga: "",
      Stok: "",
    });
    setEditingProduct(null);
    setError(null);

    try {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.warn("Could not reset file input:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.nama_produk?.trim()) {
      setError("Nama produk harus diisi");
      return;
    }
    if (!product.deskripsi?.trim()) {
      setError("Deskripsi harus diisi");
      return;
    }
    if (!product.harga || isNaN(product.harga) || Number(product.harga) <= 0) {
      setError("Harga harus berupa angka positif");
      return;
    }
    if (!product.Stok || isNaN(product.Stok) || Number(product.Stok) < 0) {
      setError("Stok harus berupa angka non-negatif");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("nama_produk", product.nama_produk);
    formData.append("deskripsi", product.deskripsi);
    formData.append("harga", parseInt(product.harga));
    formData.append("Stok", parseInt(product.Stok));
    if (product.gambar) {
      formData.append("gambar", product.gambar);
    }

    try {
      let result;
      if (editingProduct) {
        result = await productsAPI.update(editingProduct.id, formData);
        alert("Produk berhasil diupdate!");
      } else {
        result = await productsAPI.create(formData);
        alert("Produk berhasil ditambahkan!");
      }
      resetForm();
      // Refresh products list jika sedang di tab list
      if (activeTab === "list") {
        fetchProducts();
      }
    } catch (err) {
      console.error("Error saat operasi produk:", err);
      setError(err?.message || "Terjadi kesalahan");
      alert(
        `Gagal ${editingProduct ? "mengupdate" : "menambahkan"} produk: ${
          err?.message || "Terjadi kesalahan"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productToEdit) => {
    if (!productToEdit) return;
    setProduct({
      nama_produk: productToEdit.nama_produk || "",
      deskripsi: productToEdit.deskripsi || "",
      harga: productToEdit.harga?.toString() || "",
      Stok: productToEdit.Stok?.toString() || "",
      gambar: null,
    });
    setEditingProduct(productToEdit);
    setActiveTab("add");
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setLoading(true);
      try {
        await productsAPI.delete(id);
        alert("Produk berhasil dihapus!");
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        setError(err?.message || "Gagal menghapus produk");
        alert(
          "Gagal menghapus produk: " +
            (err?.message || "Gagal menghapus produk")
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const formatCurrency = (amount) => {
    try {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount || 0);
    } catch {
      return `IDR ${amount || 0}`;
    }
  };

  const safeDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d) ? "Tanggal tidak valid" : d.toLocaleDateString("id-ID");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="alert alert-error mb-4">
          <span>Error: {error}</span>
          <button 
            className="btn btn-sm btn-ghost" 
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className="tabs tabs-bordered mb-6">
        <button
          className={`tab tab-bordered ${
            activeTab === "add" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("add")}
        >
          {editingProduct ? "Edit Produk" : "Tambah Produk"}
        </button>
        <button
          className={`tab tab-bordered ${
            activeTab === "list" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("list")}
        >
          Daftar Produk ({products.length})
        </button>
      </div>

      {activeTab === "add" && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              {editingProduct
                ? `Edit Produk: ${editingProduct.nama_produk}`
                : "Tambah Produk Baru"}
            </h2>
            {editingProduct && (
              <div className="alert alert-info mb-4">
                <span>
                  Mode Edit: Anda sedang mengedit produk. Klik "Batal Edit"
                  untuk kembali ke mode tambah.
                </span>
                <button className="btn btn-sm btn-ghost" onClick={resetForm}>
                  Batal Edit
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nama Produk</span>
                </label>
                <input
                  name="nama_produk"
                  type="text"
                  placeholder="Nama Produk"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                  value={product.nama_produk}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deskripsi Produk</span>
                </label>
                <textarea
                  name="deskripsi"
                  placeholder="Deskripsi Produk"
                  className="textarea textarea-bordered w-full h-24"
                  onChange={handleChange}
                  value={product.deskripsi}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Harga (IDR)</span>
                  </label>
                  <input
                    name="harga"
                    type="number"
                    placeholder="100000"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    value={product.harga}
                    min="0"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Stok</span>
                  </label>
                  <input
                    name="Stok"
                    type="number"
                    placeholder="10"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    value={product.Stok}
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gambar Produk</span>
                </label>
                <input
                  name="gambar"
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleChange}
                />
                {product.gambar && (
                  <div className="label">
                    <span className="label-text-alt text-success">
                      File dipilih: {product.gambar.name}
                    </span>
                  </div>
                )}
                {editingProduct && (
                  <div className="label">
                    <span className="label-text-alt">
                      Kosongkan jika tidak ingin mengubah gambar
                    </span>
                  </div>
                )}
              </div>
              <div className="card-actions justify-end">
                {editingProduct && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={resetForm}
                  >
                    Batal
                  </button>
                )}
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading
                    ? editingProduct
                      ? "Mengupdate..."
                      : "Menambahkan..."
                    : editingProduct
                    ? "Update Produk"
                    : "Tambah Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "list" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Daftar Produk</h2>
            <button 
              className="btn btn-primary btn-sm"
              onClick={fetchProducts}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
          
          {loading && (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          
          {!loading && products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">
                Belum ada produk. Tambahkan produk pertama Anda!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="card bg-base-100 shadow-xl">
                  {/* Gambar Produk */}
                  {prod.gambar && (
                    <figure className="px-4 pt-4">
                      <img
                        src={prod.gambar.startsWith('http') ? prod.gambar : `http://localhost:3000${prod.gambar}`}
                        alt={prod.nama_produk}
                        className="rounded-xl w-full h-48 object-cover"
                        onError={(e) => {
                          console.log("Image failed to load:", prod.gambar);
                          e.target.style.display = 'none';
                        }}
                      />
                    </figure>
                  )}
                  <div className="card-body">
                    <h3 className="card-title text-lg">{prod.nama_produk}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {prod.deskripsi}
                    </p>
                    <div className="stats stats-vertical shadow mt-4">
                      <div className="stat">
                        <div className="stat-title">Harga</div>
                        <div className="stat-value text-lg text-primary">
                          {formatCurrency(prod.harga)}
                        </div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Stok</div>
                        <div
                          className={`stat-value text-lg ${
                            prod.Stok < 10 ? "text-warning" : "text-success"
                          }`}
                        >
                          {prod.Stok} unit
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {prod.createdAt && (
                        <p>Dibuat: {safeDate(prod.createdAt)}</p>
                      )}
                      {prod.updatedAt && (
                        <p>Diupdate: {safeDate(prod.updatedAt)}</p>
                      )}
                      {prod.gambar && (
                        <p className="text-blue-600">
                          Gambar: {prod.gambar.split('/').pop()}
                        </p>
                      )}
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleEdit(prod)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(prod.id)}
                        disabled={loading}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}