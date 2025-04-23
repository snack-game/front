import React from 'react';

export interface ModalType {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';
export interface toastStateType {
  id?: string;
  message: string;
  type: ToastType;
}

export type MouseEventType = React.MouseEvent<HTMLCanvasElement> | TouchEvent;
