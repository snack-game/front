export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';

export interface ModalType {
  title?: string;
  description?: string;
  open?: boolean;
  children?: React.ReactNode;
}
