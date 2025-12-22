import { useState } from 'react';
import { IEditableItem } from '../types';

export const useEditableItem: IEditableItem = () => {
  const [isMore, setIsMore] = useState(false);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const openReply = () => {
    setIsOpen(true);
    setIsEditing(false);
    setEditId(null);
    setValue('');
  };

  const openEdit = (id: string, content: string) => {
    setIsOpen(true);
    setIsEditing(true);
    setEditId(id);
    setValue(content);
  };

  const closeAll = () => {
    setIsOpen(false);
    setIsEditing(false);
    setEditId(null);
    setValue('');
  };

  const openMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore(true);
  };

  const closeMore = () => {
    setIsMore(false);
  };

  return {
    isMore,
    isOpen,
    isEditing,
    editId,
    value,
    setValue,
    openReply,
    openEdit,
    closeAll,
    openMore,
    closeMore,
  };
};
