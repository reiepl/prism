/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CalendarRange, Users, ScrollText } from 'lucide-react';
import { type Person } from '../../lib/types/person';
import { getBlueprintForPerson } from '../../lib/adapter/blueprintAdapter';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs, type ProfileTabType } from './ProfileTabs';
import { BlueprintSection } from './BlueprintSection';

/**
 * DATA FLOW DIAGRAM FOR PRISM METAPHYSICAL COMPUTATION PIPELINE:
 * 
 *     [Repository Layer] 
 *             │
 *             ▼ (Raw data only: Person Entity)
 *      ┌──────────────┐
 *      │  IndexedDB   │   <-- Holds only raw fields (ID, Name, DOB, raw birthTime, etc.)
 *      └──────┬───────┘
 *             │
 *             ▼
 *     [Adapter / Boundary Layer]
 *      ┌──────────────┐
 *      │  blueprint   ├──────────────────────────────────────────────────────┐
 *      │   Adapter    │ (Pre-processes & normalizes time formatting)         │
 *      └──────┬───────┘                                                      │
 *             │ (Sends normalized Date + hasHour)                            │
 *             ▼                                                              │
 *     [Computation Engine]                                                   │
 *      ┌──────────────┐                                                      │
 *      │  baziEngine  │ (Computes raw pillars, stems, branches, hidden,      │
 *      │   (Pure)     │  element occurrences, & Ten Gods relations)          │
 *      └──────┬───────┘                                                      │
 *             │                                                              │
 *             ▼ (Returns RawEngineOutput data structs)                       │
 *     [Decorate & Map]                                                       │
 *             │                                                              │
 *             └──────────────────────────────────────────────────────────────► (Decorates characters to
 *                                                                              localized labels, pinyin,
 *                                                                              and emoji representations)
 *                                                                            │
 *                                                                            ▼
 *                                                                   (Produces Blueprint)
 *                                                                            │
 *                                                                            ▼
 *                                                                   [UI Rendering Layer]
 *                                                                   ┌────────────────┐
 *                                                                   │ PersonProfile  │ <-- Fetches Person,
 *                                                                   │  (Component)   │     calls getBlueprint,
 *                                                                   └────────────────┘     and renders UI-only.
 *                                                                                          No calculations here!
 */

interface PersonProfileProps {
  person: Person;
}

export const PersonProfile: React.FC<PersonProfileProps> = ({ person }) => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('Blueprint');
  const blueprint = getBlueprintForPerson(person);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Blueprint':
        return (
          <motion.div
            key="blueprint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <BlueprintSection blueprint={blueprint} />
          </motion.div>
        );

      case 'Insights':
        return (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 px-4 border border-slate-100 bg-white rounded-2xl shadow-xs text-center select-none"
          >
            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-full mb-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Insights Coming Soon</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Personalized elemental patterns, strengths, and celestial forecasts are currently under construction.
            </p>
          </motion.div>
        );

      case 'Notes':
        return (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 px-4 border border-slate-100 bg-white rounded-2xl shadow-xs text-center select-none"
          >
            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-full mb-3">
              <ScrollText className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Notes Coming Soon</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Store custom notes, specific observations, and readings directly within this person's timeline soon.
            </p>
          </motion.div>
        );

      case 'Relationships':
        return (
          <motion.div
            key="relationships"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 px-4 border border-slate-100 bg-white rounded-2xl shadow-xs text-center select-none"
          >
            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-full mb-3">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Relationships Coming Soon</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Explore elemental synastry, clash and combination checks, and interpersonal dynamics in an upcoming sprint.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section with person metadata */}
      <ProfileHeader person={person} />

      {/* Tabs navigation */}
      <ProfileTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Dynamic Tab Content rendering with transition animations */}
      <div className="pt-2">
        {renderTabContent()}
      </div>
    </div>
  );
};
