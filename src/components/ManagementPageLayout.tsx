"use client";

import React from "react";

interface ManagementPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
}

const ManagementPageLayout: React.FC<ManagementPageLayoutProps> = ({
  title,
  description,
  children,
  actions,
  filters,
}) => {
  return (
    <div className="fade-in space-y-8">
      {/* Header Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-16 bg-gradient-to-b from-[--color-accent] to-[--color-accent-hover] rounded-full" />
          <div className="flex-1">
            <h1 className="font-display text-5xl text-[--color-accent] font-semibold">
              {title}
            </h1>
            <p className="text-[--color-text-muted] font-light text-xl mt-2">
              {description}
            </p>
          </div>
        </div>

        {/* Actions and Filters Bar */}
        {(actions || filters) && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 bg-gradient-to-r from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 p-6 rounded-2xl">
            <div className="flex flex-wrap gap-4">{actions}</div>
            <div className="flex flex-wrap gap-4">{filters}</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 rounded-2xl shadow-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default ManagementPageLayout;

