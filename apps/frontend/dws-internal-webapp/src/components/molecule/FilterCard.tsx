import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, PenLine, Check, X, Search, GripVertical, Plus, MoreVertical, Upload, Copy, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterService } from '@/services/FilterService';
import type { Filter } from '@/lib/types';

interface FilterCardProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
  onDelete: (filterId: string) => void;
  canEdit: boolean;
}

export const FilterCard: React.FC<FilterCardProps> = ({ filter, onUpdate, onDelete, canEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState<string[]>([...filter.values]);
  const [newValue, setNewValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const filteredValues = editedValues.filter(value =>
    value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddValue = () => {
    const trimmed = newValue.trim();
    if (trimmed && !editedValues.includes(trimmed)) {
      setEditedValues(prev => [...prev, trimmed]);
      setNewValue('');
    }
  };

  const handleRemoveValue = (valueToRemove: string) => {
    setEditedValues(prev => prev.filter(value => value !== valueToRemove));
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null) return;
    const newValues = [...editedValues];
    const draggedValue = newValues[draggedItem];
    newValues.splice(draggedItem, 1);
    newValues.splice(index, 0, draggedValue);
    setEditedValues(newValues);
    setDraggedItem(index);
  };

  const handleBulkImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const newValues = text.split('\n')
          .map(v => v.trim())
          .filter(v => v && !editedValues.includes(v));
        setEditedValues(prev => [...prev, ...newValues]);
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyValues = () => {
    navigator.clipboard.writeText(editedValues.join('; \n'));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedFilter = { ...filter, values: editedValues };
      await FilterService.updateFilter(updatedFilter);
      onUpdate(updatedFilter);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving filter:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedValues([...filter.values]);
    setIsEditing(false);
    setNewValue('');
    setSearchTerm('');
  };

  const handleDelete = async () => {
    try {
      await FilterService.deleteFilter(filter.id);
      onDelete(filter.id);
    } catch (error) {
      console.error('Error deleting filter:', error);
    }
  };

  return (
    <Card className="w-full shadow hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium capitalize">
          {filter.filter.replace(/_/g, ' ')}
          <span className="ml-2 text-sm text-gray-400">
            ({editedValues.length} values)
          </span>
        </CardTitle>
        <div className="flex items-center gap-2">
          {/* If editing is allowed, show the edit button.
              Otherwise, render a disabled button with a tooltip. */}
          {canEdit ? (
            !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <PenLine className="h-4 w-4" />
              </Button>
            )
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-50 cursor-not-allowed"
              title="Editing is disabled while API Updater is enabled"
              disabled
            >
              <PenLine className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyValues}>
                <Copy className="h-4 w-4 mr-2" />
                Copy all values
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className={canEdit ? 'visible text-red-600' : 'hidden'}>
                <Trash className="h-4 w-4 mr-2" />
                Delete filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing && canEdit && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search values..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="relative">
                <Button variant="outline" size="sm" className="shrink-0" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.csv"
                  onChange={handleBulkImport}
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Add new value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddValue()}
                className="flex-1"
              />
              <Button onClick={handleAddValue} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {filteredValues.map((value, index) => (
              <div
                key={value}
                draggable={canEdit && isEditing}
                onDragStart={() => canEdit && handleDragStart(index)}
                onDragOver={(e) => canEdit && handleDragOver(e, index)}
                className={`flex items-center space-x-1 bg-gray-100 px-3 py-1.5 rounded-full 
                  ${canEdit && isEditing ? 'cursor-move hover:bg-gray-200' : ''} 
                  transition-colors duration-200`}
              >
                {canEdit && isEditing && (
                  <GripVertical className="h-3 w-3 text-gray-400 mr-1" />
                )}
                <span className="text-sm">{value}</span>
                {canEdit && isEditing && (
                  <button
                    onClick={() => handleRemoveValue(value)}
                    className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing && canEdit && (
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel} disabled={isSaving}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
