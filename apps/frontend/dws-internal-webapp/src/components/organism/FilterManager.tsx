// src/components/organism/FilterManager.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, RefreshCw, Pause } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterService } from '@/services/FilterService';
import { FilterCard } from '@/components/molecule/FilterCard';
import { UpdaterConfig } from '@/components/molecule/UpdaterConfig';
import type { Filter } from '@/lib/types';

export const FilterManager: React.FC = () => {
  // State for filters and refresh logic
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshInterval, setRefreshInterval] = useState<number>(5);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for API updater configuration
  const [apiUpdaterEnabled, setApiUpdaterEnabled] = useState(false);
  const [apiUpdaterInterval, setApiUpdaterInterval] = useState<number>(5);

  const fetchFilters = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const data = await FilterService.getFilters();
      const processedFilters: Filter[] = data.map((f: any, index: number) => ({
        id: f.id || `filter-${index}`,
        filter: f.filter,
        values: f.values,
      }));
      setFilters(processedFilters);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching filters:', err);
      setError('Failed to load filters. Please try again later.');
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  // Auto-refresh logic
  useEffect(() => {
    if (!isAutoRefreshEnabled) return;
    const interval = setInterval(() => {
      fetchFilters();
    }, refreshInterval * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshInterval, isAutoRefreshEnabled, fetchFilters]);

  const handleUpdateFilter = (updatedFilter: Filter) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === updatedFilter.id ? updatedFilter : f))
    );
  };

  const handleDeleteFilter = (filterId: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== filterId));
  };

  const formatLastUpdated = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - new Date().getTime()) / (1000 * 60)),
      'minutes'
    );
  };

  // Only allow manual editing if API updater is disabled.
  const canEditFilters = !apiUpdaterEnabled;

  const filteredFilters = filters.filter(
    (filter) =>
      filter.filter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filter.values.some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between w-full px-20">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoRefreshEnabled(!isAutoRefreshEnabled)}
              className={isAutoRefreshEnabled ? 'text-green-600' : 'text-gray-400'}
            >
              {isAutoRefreshEnabled ? (
                <RefreshCw className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </Button>
            <div
              className={
                isAutoRefreshEnabled
                  ? 'visible flex items-center space-x-2'
                  : 'hidden'
              }
            >
              <span>Auto-refresh every</span>
              <Select
                value={refreshInterval.toString()}
                onValueChange={(value) => setRefreshInterval(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">1 min</SelectItem>
                  <SelectItem value="5">5 min</SelectItem>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchFilters()}
              disabled={isRefreshing}
              className="text-gray-500 hover:text-gray-700"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
              />
            </Button>
            <span className="text-sm text-gray-400">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        </div>
        <div className="w-72">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search filters or values..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFilters.map((filter) => (
          <FilterCard
            key={filter.id}
            filter={filter}
            onUpdate={handleUpdateFilter}
            onDelete={handleDeleteFilter}
            canEdit={canEditFilters}
          />
        ))}
      </div>
      <UpdaterConfig
        apiUpdaterEnabled={apiUpdaterEnabled}
        setApiUpdaterEnabled={setApiUpdaterEnabled}
        apiUpdaterInterval={apiUpdaterInterval}
        setApiUpdaterInterval={setApiUpdaterInterval}
      />
    </div>
  );
};

export default FilterManager;
