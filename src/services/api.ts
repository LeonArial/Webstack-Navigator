const API_BASE_URL = 'http://localhost:5010/api/v1';

export interface Site {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
}

export interface CreateSiteRequest {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
}

export interface UpdateSiteRequest {
  name?: string;
  description?: string;
  url?: string;
  category?: string;
  tags?: string[];
  rating?: number;
}

// 获取所有网站
export const getAllSites = async (): Promise<Site[]> => {
  const response = await fetch(`${API_BASE_URL}/sites`);
  if (!response.ok) {
    throw new Error('Failed to fetch sites');
  }
  return response.json();
};

// 根据ID获取网站
export const getSiteById = async (id: string): Promise<Site> => {
  const response = await fetch(`${API_BASE_URL}/sites/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch site');
  }
  return response.json();
};

// 创建新网站
export const createSite = async (site: CreateSiteRequest): Promise<Site> => {
  const response = await fetch(`${API_BASE_URL}/sites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(site),
  });
  if (!response.ok) {
    throw new Error('Failed to create site');
  }
  return response.json();
};

// 更新网站
export const updateSite = async (id: string, site: UpdateSiteRequest): Promise<Site> => {
  const response = await fetch(`${API_BASE_URL}/sites/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(site),
  });
  if (!response.ok) {
    throw new Error('Failed to update site');
  }
  return response.json();
};

// 删除网站
export const deleteSite = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/sites/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete site');
  }
};

// 搜索网站
export const searchSites = async (query: string): Promise<Site[]> => {
  const response = await fetch(`${API_BASE_URL}/sites?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search sites');
  }
  return response.json();
};
