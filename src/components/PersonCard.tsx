/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, User } from 'lucide-react';
import { type Person } from '../lib/types/person';

interface PersonCardProps {
  person: Person;
  onClick: () => void;
}

export const relationshipStyles: Record<
  Person['relationshipType'],
  { bg: string; text: string; ring: string; dot: string }
> = {
  Friend: {
    bg: 'bg-emerald-50/80',
    text: 'text-emerald-700',
    ring: 'ring-emerald-600/10',
    dot: 'bg-emerald-500',
  },
  Family: {
    bg: 'bg-rose-50/80',
    text: 'text-rose-700',
    ring: 'ring-rose-600/10',
    dot: 'bg-rose-500',
  },
  Colleague: {
    bg: 'bg-indigo-50/80',
    text: 'text-indigo-700',
    ring: 'ring-indigo-600/10',
    dot: 'bg-indigo-500',
  },
  Client: {
    bg: 'bg-amber-50/80',
    text: 'text-amber-700',
    ring: 'ring-amber-600/10',
    dot: 'bg-amber-500',
  },
  Mentor: {
    bg: 'bg-purple-50/80',
    text: 'text-purple-700',
    ring: 'ring-purple-600/10',
    dot: 'bg-purple-500',
  },
  Student: {
    bg: 'bg-teal-50/80',
    text: 'text-teal-700',
    ring: 'ring-teal-600/10',
    dot: 'bg-teal-500',
  },
  Other: {
    bg: 'bg-slate-50/80',
    text: 'text-slate-700',
    ring: 'ring-slate-600/10',
    dot: 'bg-slate-500',
  },
};

export const PersonCard: React.FC<PersonCardProps> = ({ person, onClick }) => {
  const isSelf = person.isSelf;
  const styles = isSelf
    ? {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-400',
        ring: 'ring-indigo-500/30',
        dot: 'bg-indigo-400',
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

  if (isSelf) {
    return (
      <div
        id={`person-card-self-${person.id}`}
        onClick={onClick}
        className="group relative overflow-hidden rounded-2xl border border-slate-850 bg-slate-900 p-5 text-white shadow-[0_4px_20px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-850 cursor-pointer"
      >
        {/* Subtle decorative grid/glow inside the dark card */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
        
        <div className="relative flex items-center gap-4">
          {/* Avatar Container */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-bold border-2 border-slate-800 bg-slate-800 text-slate-100 text-lg transition-transform duration-300 group-hover:scale-105">
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
            <span className="absolute right-0 bottom-0 block h-3 w-3 rounded-full ring-2 ring-slate-900 bg-indigo-400 animate-pulse" />
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display font-bold text-white group-hover:text-slate-100 truncate text-base leading-snug">
                {person.name}
              </h3>
            </div>
            
            {person.nickname && (
              <p className="text-xs text-slate-400 font-medium -mt-0.5 mb-1 truncate">
                &ldquo;{person.nickname}&rdquo;
              </p>
            )}

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {/* Identity Badge */}
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                My Profile
              </span>

              {/* DOB */}
              <span className="inline-flex items-center gap-1 text-xs text-slate-300 font-medium">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {formatDate(person.dob)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`person-card-${person.id}`}
      onClick={onClick}
      className="group relative flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200/80 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] cursor-pointer"
    >
      {/* Avatar Container */}
      <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-semibold border-2 border-white shadow-sm ${styles.bg} ${styles.text} text-lg transition-transform duration-300 group-hover:scale-105`}>
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
        {/* Connection status indicator dot */}
        <span className={`absolute right-0 bottom-0 block h-3 w-3 rounded-full ring-2 ring-white ${styles.dot}`} />
      </div>

      {/* Person Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display font-semibold text-slate-800 group-hover:text-slate-900 truncate text-base leading-snug">
            {person.name}
          </h3>
        </div>
        
        {person.nickname && (
          <p className="text-xs text-slate-400 font-medium -mt-0.5 mb-1 truncate">
            &ldquo;{person.nickname}&rdquo;
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {/* Relationship Badge */}
          <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles.bg} ${styles.text} ${styles.ring}`}>
            {person.relationshipType}
          </span>

          {/* DOB */}
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {formatDate(person.dob)}
          </span>
        </div>
      </div>
    </div>
  );
};
