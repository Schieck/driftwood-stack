import axiosInstance from '@/lib/axios';
import type { Filter } from '@/lib/types';

export const FilterService = {
  async getFilters(): Promise<Filter[]> {
    try {
      const response = await axiosInstance.get(`/filters`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching filter values:', error);
      return [];
    }
  },

  async updateFilter(filter: Filter): Promise<Filter> {
    try {
      const response = await axiosInstance.put(`/filters/${filter.id}`, filter);
      return response.data;
    } catch (error) {
      console.error('Error updating filter:', error);
      throw error;
    }
  },

  async deleteFilter(filterId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/filters/${filterId}`);
    } catch (error) {
      console.error('Error deleting filter:', error);
      throw error;
    }
  },

  async updateUpdaterConfiguration(config: { enabled: boolean; interval?: number }): Promise<any> {
    try {
      const response = await axiosInstance.put(`/filters/updater-config`, config);
      return response.data;
    } catch (error) {
      console.error('Error updating updater configuration:', error);
      throw error;
    }
  },

  async getUpdaterConfiguration(): Promise<any> {
    try {
      const response = await axiosInstance.get(`/filters/updater-config`);
      return response.data;
    } catch (error) {
      console.error('Error updating updater configuration:', error);
      throw error;
    }
  },
};
