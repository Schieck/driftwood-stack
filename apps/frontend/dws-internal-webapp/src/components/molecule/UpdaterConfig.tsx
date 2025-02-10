import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { FilterService } from '@/services/FilterService';

interface UpdaterConfigProps {
  apiUpdaterEnabled: boolean;
  setApiUpdaterEnabled: (value: boolean) => void;
  apiUpdaterInterval: number;
  setApiUpdaterInterval: (value: number) => void;
}

export const UpdaterConfig: React.FC<UpdaterConfigProps> = ({
  apiUpdaterEnabled,
  setApiUpdaterEnabled,
  apiUpdaterInterval,
  setApiUpdaterInterval,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Fetch the current updater configuration on component mount.
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await FilterService.getUpdaterConfiguration();
        // Update the parent state with fetched values.
        setApiUpdaterEnabled(config.enabled);
        setApiUpdaterInterval(config.interval || 5); // default to 5 if undefined
      } catch (error) {
        console.error('Error fetching updater config:', error);
      }
    };

    fetchConfig();
  }, [setApiUpdaterEnabled, setApiUpdaterInterval]);

  // Automatically update the configuration when values change.
  const updateConfig = async (enabled: boolean, interval?: number) => {
    setIsSaving(true);
    setSaveSuccess(null);
    try {
      await FilterService.updateUpdaterConfiguration({
        enabled,
        interval: enabled ? interval : undefined,
      });
      setSaveSuccess('Saved');
    } catch (error) {
      console.error('Error updating updater config:', error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveSuccess(null), 2000);
    }
  };

  // Call updateConfig whenever the updater settings change.
  useEffect(() => {
    updateConfig(apiUpdaterEnabled, apiUpdaterInterval);
  }, [apiUpdaterEnabled, apiUpdaterInterval]);

  return (
    <div className="border p-2 rounded shadow-sm">
      {/* One line for the toggle/interval controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Auto Import Filters</span>
        <Button
          variant="outline"
          onClick={() => setApiUpdaterEnabled(!apiUpdaterEnabled)}
          className={
            apiUpdaterEnabled
              ? 'bg-green-100 text-green-800 p-2'
              : 'p-2 bg-gray-100 text-gray-800'
          }
        >
          {apiUpdaterEnabled ? 'On' : 'Off'}
        </Button>
        {apiUpdaterEnabled && (
          <Select
            value={apiUpdaterInterval.toString()}
            onValueChange={(value) => setApiUpdaterInterval(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 min</SelectItem>
              <SelectItem value="10">10 min</SelectItem>
              <SelectItem value="15">15 min</SelectItem>
            </SelectContent>
          </Select>
        )}
        {isSaving && <Loader2 className="animate-spin h-4 w-4 ml-2" />}
        {saveSuccess && (
          <span className="text-green-600 text-xs ml-2">{saveSuccess}</span>
        )}
      </div>
      {/* One line for the note */}
      <div className="text-xs text-gray-500 mt-1">
        Note: When enabled, manual filter editing is disabled.
      </div>
    </div>
  );
};
