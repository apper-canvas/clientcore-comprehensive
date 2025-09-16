import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className,
  closeOnBackdrop = true 
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface rounded-lg shadow-2xl transform transition-all",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;