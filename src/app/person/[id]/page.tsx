/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, Trash2, PenLine } from 'lucide-react';
import { personRepository } from '../../../lib/repository/personRepository';
import { PersonProfile } from '../../../components/profile/PersonProfile';
import { EditPersonModal } from '../../../components/profile/EditPersonModal';

interface PersonProfilePageProps {
  params: {
    id: string;
  };
  onNavigateBack: () => void;
  onDeletePerson?: (id: string) => Promise<void>;
}

export default function PersonProfilePage({ params, onNavigateBack, onDeletePerson }: PersonProfilePageProps) {
  const { id } = params;
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Reactively fetch the person from IndexedDB using Dexie
  const person = useLiveQuery(() => personRepository.getById(id), [id]);

  // Push scroll position back to top when routing to a profile
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const handleDelete = async () => {
    if (!person) return;
    if (window.confirm(`Are you sure you want to remove ${person.name} from your Deck?`)) {
      if (onDeletePerson) {
        await onDeletePerson(person.id);
      } else {
        await personRepository.delete(person.id);
      }
      onNavigateBack();
    }
  };

  const handleUpdatePerson = async (updatedPerson: any) => {
    await personRepository.update(updatedPerson);
  };

  if (person === undefined) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (person === null) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="text-center max-w-sm bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Error</p>
          <h1 className="text-lg font-bold text-slate-800">Person Not Found</h1>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            The profile you are trying to view does not exist or has been removed.
          </p>
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 py-2 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to Deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans select-none antialiased">
      {/* Upper ambient glow container */}
      <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-indigo-50/40 to-transparent pointer-events-none" />

      {/* Main Container */}
      <main className="relative max-w-md mx-auto px-4 pt-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-1.5 py-1.5 pr-3 pl-2.5 rounded-full bg-white border border-slate-100 shadow-2xs hover:border-slate-200 transition-all text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          {/* Title */}
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            命盘 Blueprint
          </h2>

          {/* Edit/Delete Options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              title="Edit Profile"
              className="p-2 rounded-full bg-white border border-slate-100 shadow-2xs hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-400 cursor-pointer"
            >
              <PenLine className="h-4 w-4" />
            </button>

            {!person.isSelf && (
              <button
                onClick={handleDelete}
                title="Delete Connection"
                className="p-2 rounded-full bg-white border border-slate-100 shadow-2xs hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600 transition-all text-slate-400 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <PersonProfile person={person} />

        {/* Edit Modal */}
        <EditPersonModal
          person={person}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={handleUpdatePerson}
        />
      </main>
    </div>
  );
}
