import api from './axios';

export const adminLogin = (username, password) =>
  api.post('/admin/login', { username, password });

export const adminLogout = () => api.post('/admin/logout');

export const checkAdminAuth = () => api.get('/admin/check');

export const getAllOrders = () => api.get('/orders');

export const updateOrderStatus = (orderId, status) =>
  api.patch(`/orders/${orderId}/status`, { status });