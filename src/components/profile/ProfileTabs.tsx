/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type ProfileTabType = 'Blueprint' | 'Insights' | 'Notes' | 'Relationships';

interface ProfileTabsProps {
  activeTab: ProfileTabType;
  onChangeTab: (tab: ProfileTabType) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: ProfileTabType; label: string; disabled: boolean }[] = [
    { id: 'Blueprint', label: 'Blueprint', disabled: false },
    { id: 'Insights', label: 'Insights', disabled: true },
    { id: 'Notes', label: 'Notes', disabled: true },
    { id: 'Relationships', label: 'Relationships', disabled: true },
  ];

  return (
    <div className="border-b border-slate-100 select-none">
      <nav className="flex space-x-6 overflow-x-auto scrollbar-none" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (!tab.disabled) {
                  onChangeTab(tab.id);
                }
              }}
              disabled={tab.disabled}
              className={`group relative py-4 px-1 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-slate-900 text-slate-950 font-black'
                  : tab.disabled
                  ? 'border-transparent text-slate-300 cursor-not-allowed'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {tab.label}
                {tab.disabled && (
                  <span className="text-[9px] uppercase tracking-wider bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-md font-bold group-hover:bg-slate-200/60 group-hover:text-slate-500">
                    Soon
                  </span>
                )}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
