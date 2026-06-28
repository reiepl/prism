/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { type Person } from '../../lib/types/person';
import { relationshipStyles } from '../PersonCard';

interface ProfileHeaderProps {
  person: Person;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ person }) => {
  const isSelf = person.isSelf;
  const styles = isSelf
    ? {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-600 dark:text-indigo-400',
        ring: 'ring-indigo-500/30',
        dot: 'bg-indigo-500',
      }
    : (relationshipStyles[person.relationshipType] || relationshipStyles.Other);

  // Generate initials for avatar placeholder
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parts[2];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthStr = months[monthIndex] || 'Jan';
        const paddedDay = day.padStart(2, '0');
        return `${paddedDay} ${monthStr} ${year}`;
      }
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const d = String(date.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const m = months[date.getMonth()];
      const y = date.getFullYear();
      return `${d} ${m} ${y}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-5 relative overflow-hidden select-none">
      {/* Decorative inner glow */}
      {isSelf && (
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/5 blur-xl pointer-events-none" />
      )}
      
      {/* Avatar Container */}
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full font-bold border-2 border-slate-100 bg-slate-50 text-slate-700 text-2xl shadow-inner transition-transform duration-300">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span>{getInitials(person.name)}</span>
        )}
        <span className={`absolute right-1 bottom-1 block h-4 w-4 rounded-full ring-2 ring-white ${styles.dot}`} />
      </div>

      {/* Profile Details */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="space-y-0.5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1">
            <h1 className="text-2xl font-display font-black tracking-tight text-slate-900 truncate">
              {person.name}
            </h1>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold ring-1 ring-inset self-center sm:self-auto ${styles.bg} ${styles.text} ${styles.ring}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
              {isSelf ? 'My Profile' : person.relationshipType}
            </span>
          </div>
          {person.nickname && (
            <p className="text-sm text-slate-500 font-medium">
              &ldquo;{person.nickname}&rdquo;
            </p>
          )}
        </div>

        {/* Date / Time Details */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 pt-1.5 border-t border-slate-100/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{formatDate(person.dob)}</span>
          </div>
          {person.timeAccuracy === 'ShiChen' && person.birthTime && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="font-mono">{person.birthTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
