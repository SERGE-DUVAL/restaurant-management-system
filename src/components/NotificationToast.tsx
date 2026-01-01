'use client';

import React, { useEffect } from 'react';
import { useNotification, NotificationType } from '@/contexts/NotificationContext';

const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  // Ajouter les styles d'animation côté client uniquement
  useEffect(() => {
    const styleId = 'notification-toast-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes slide-in-right {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .animate-slide-in-right {
        animation: slide-in-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const getIcon = (type: NotificationType) => {
    const iconProps = { width: 24, height: 24, fill: 'none', stroke: 'currentColor', strokeWidth: 2 };
    switch (type) {
      case 'success':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/10 border-green-500/40',
          text: 'text-green-200',
          icon: 'text-green-400',
          accent: 'bg-green-500',
        };
      case 'error':
        return {
          bg: 'bg-red-500/10 border-red-500/40',
          text: 'text-red-200',
          icon: 'text-red-400',
          accent: 'bg-red-500',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10 border-yellow-500/40',
          text: 'text-yellow-200',
          icon: 'text-yellow-400',
          accent: 'bg-yellow-500',
        };
      case 'info':
        return {
          bg: 'bg-blue-500/10 border-blue-500/40',
          text: 'text-blue-200',
          icon: 'text-blue-400',
          accent: 'bg-blue-500',
        };
      default:
        return {
          bg: 'bg-[--color-accent]/10 border-[--color-accent]/40',
          text: 'text-[--color-accent]',
          icon: 'text-[--color-accent]',
          accent: 'bg-[--color-accent]',
        };
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 space-y-4 max-w-md" style={{ zIndex: 9999 }}>
      {notifications.map((notification) => {
        const styles = getStyles(notification.type);
        return (
          <div
            key={notification.id}
            className={`
              ${styles.bg}
              border-2
              ${styles.text}
              backdrop-blur-md
              rounded-2xl
              shadow-2xl
              p-5
              animate-slide-in-right
              relative
              overflow-hidden
              group
            `}
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: 'var(--color-bg-card)',
              borderColor: `rgba(${notification.type === 'success' ? '34, 197, 94' : notification.type === 'error' ? '239, 68, 68' : notification.type === 'warning' ? '234, 179, 8' : '59, 130, 246'}, 0.3)`,
            }}
          >
            {/* Accent bar */}
            <div 
              className={`absolute top-0 left-0 right-0 h-1 ${styles.accent}`}
              style={{
                backgroundColor: notification.type === 'success' ? '#22c55e' : notification.type === 'error' ? '#ef4444' : notification.type === 'warning' ? '#eab308' : '#3b82f6',
              }}
            />
            
            {/* Content */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 ${styles.icon} mt-0.5`}>
                {getIcon(notification.type)}
              </div>
              
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h4
                  className="font-semibold text-lg mb-1"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-text)',
                  }}
                >
                  {notification.title}
                </h4>
                <p 
                  className="text-sm leading-relaxed"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {notification.message}
                </p>
              </div>
              
              {/* Close button */}
              <button
                onClick={() => removeNotification(notification.id)}
                className={`
                  flex-shrink-0
                  hover:opacity-70
                  transition-opacity
                  p-1
                  rounded-lg
                  hover:bg-white/10
                `}
                style={{
                  color: 'var(--color-text-muted)',
                }}
                aria-label="Fermer"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationToast;

