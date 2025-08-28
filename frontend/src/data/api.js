import axios from 'axios';

const BASE_URL = "http://localhost:3000";

const API = {
    PRODUCTS: `${BASE_URL}/products`,
    REVIEWS: `${BASE_URL}/reviews`,
};

// Products API Functions
export const productsAPI = {
    // Get semua products
    getAll: async () => {
        try {
            const response = await axios.get(API.PRODUCTS);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Get product by ID
    getById: async (id) => {
        try {
            const response = await axios.get(`${API.PRODUCTS}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    },

    // Create new product (mendukung FormData untuk upload file)
    create: async (productData) => {
        try {
            const config = {};
            
            // Jika productData adalah FormData (untuk upload file)
            if (productData instanceof FormData) {
                config.headers = {
                    'Content-Type': 'multipart/form-data'
                };
            }

            const response = await axios.post(API.PRODUCTS, productData, config);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    // Create new product dengan JSON data (tanpa file)
    createJSON: async (productData) => {
        try {
            const response = await axios.post(API.PRODUCTS, productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    // Update product (mendukung FormData untuk upload file)
    update: async (id, productData) => {
        try {
            const config = {};
            
            // Jika productData adalah FormData (untuk upload file)
            if (productData instanceof FormData) {
                config.headers = {
                    'Content-Type': 'multipart/form-data'
                };
            }

            const response = await axios.put(`${API.PRODUCTS}/${id}`, productData, config);
            return response.data;
        } catch (error) {
            console.error(`Error updating product ${id}:`, error);
            throw error;
        }
    },

    // Update product dengan JSON data (tanpa file)
    updateJSON: async (id, productData) => {
        try {
            const response = await axios.put(`${API.PRODUCTS}/${id}`, productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating product ${id}:`, error);
            throw error;
        }
    },

    // Delete product
    delete: async (id) => {
        try {
            const response = await axios.delete(`${API.PRODUCTS}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting product ${id}:`, error);
            throw error;
        }
    },

    // Get product dengan reviews
    getWithReviews: async (id) => {
        try {
            const response = await axios.get(`${API.PRODUCTS}/${id}?include=reviews`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id} with reviews:`, error);
            throw error;
        }
    }
};

// Reviews API Functions
export const reviewsAPI = {
    // Get semua reviews
    getAll: async () => {
        try {
            const response = await axios.get(API.REVIEWS);
            return response.data;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    },

    // Get review by ID
    getById: async (id) => {
        try {
            const response = await axios.get(`${API.REVIEWS}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching review ${id}:`, error);
            throw error;
        }
    },

    // Get reviews by product ID
    getByProductId: async (productId) => {
        try {
            const response = await axios.get(`${API.REVIEWS}?productId=${productId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching reviews for product ${productId}:`, error);
            throw error;
        }
    },

    // Create new review
    create: async (reviewData) => {
        try {
            const response = await axios.post(API.REVIEWS, reviewData);
            return response.data;
        } catch (error) {
            console.error('Error creating review:', error);
            throw error;
        }
    },

    // Update review
    update: async (id, reviewData) => {
        try {
            const response = await axios.put(`${API.REVIEWS}/${id}`, reviewData);
            return response.data;
        } catch (error) {
            console.error(`Error updating review ${id}:`, error);
            throw error;
        }
    },

    // Delete review
    delete: async (id) => {
        try {
            const response = await axios.delete(`${API.REVIEWS}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting review ${id}:`, error);
            throw error;
        }
    }
};

// Generic API function dengan error handling yang lebih advanced
export const apiRequest = async (method, url, data = null, config = {}) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            ...config
        });
        return response.data;
    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || 'Server error occurred';
            throw new Error(`${error.response.status}: ${errorMessage}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Network error: No response from server');
        } else {
            // Something else happened
            throw new Error(`Request error: ${error.message}`);
        }
    }
};

export default API;