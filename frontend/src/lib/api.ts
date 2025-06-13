const API_URL = 'http://localhost:5000/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Terjadi kesalahan');
  }

  return response.json();
};

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  // Devices
  getDevices: () => fetchWithAuth('/devices'),
  
  getDevice: (id: string) => fetchWithAuth(`/devices/${id}`),
  
  createDevice: (data: any) =>
    fetchWithAuth('/devices', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  updateDevice: (id: string, data: any) =>
    fetchWithAuth(`/devices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  deleteDevice: (id: string) =>
    fetchWithAuth(`/devices/${id}`, {
      method: 'DELETE',
    }),

  // Templates
  getTemplates: () => fetchWithAuth('/templates'),
  
  getTemplate: (id: string) => fetchWithAuth(`/templates/${id}`),
  
  createTemplate: (data: any) =>
    fetchWithAuth('/templates', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  updateTemplate: (id: string, data: any) =>
    fetchWithAuth(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  deleteTemplate: (id: string) =>
    fetchWithAuth(`/templates/${id}`, {
      method: 'DELETE',
    }),
}; 