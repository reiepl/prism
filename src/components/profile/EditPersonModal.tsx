/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Check, AlertCircle } from 'lucide-react';
import { type Person } from '../../lib/types/person';

interface EditPersonModalProps {
  person: Person;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPerson: Person) => Promise<void>;
}

const SHI_CHEN_VALUES = [
  { value: 'Zi (23:00–00:59)', label: 'Zi (子) • 23:00 – 00:59' },
  { value: 'Chou (01:00–02:59)', label: 'Chou (丑) • 01:00 – 02:59' },
  { value: 'Yin (03:00–04:59)', label: 'Yin (寅) • 03:00 – 04:59' },
  { value: 'Mao (05:00–06:59)', label: 'Mao (卯) • 05:00 – 06:59' },
  { value: 'Chen (07:00–08:59)', label: 'Chen (辰) • 07:00 – 08:59' },
  { value: 'Si (09:00–10:59)', label: 'Si (巳) • 09:00 – 10:59' },
  { value: 'Wu (11:00–12:59)', label: 'Wu (午) • 11:00 – 12:59' },
  { value: 'Wei (13:00–14:59)', label: 'Wei (未) • 13:00 – 14:59' },
  { value: 'Shen (15:00–16:59)', label: 'Shen (申) • 15:00 – 16:59' },
  { value: 'You (17:00–18:59)', label: 'You (酉) • 17:00 – 18:59' },
  { value: 'Xu (19:00–20:59)', label: 'Xu (戌) • 19:00 – 20:59' },
  { value: 'Hai (21:00–22:59)', label: 'Hai (亥) • 21:00 – 22:59' },
];

const RELATIONSHIP_TYPES: Person['relationshipType'][] = [
  'Friend',
  'Family',
  'Colleague',
  'Client',
  'Mentor',
  'Student',
  'Other',
];

export const EditPersonModal: React.FC<EditPersonModalProps> = ({
  person,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [relationshipType, setRelationshipType] = useState<Person['relationshipType']>('Friend');
  const [dob, setDob] = useState('');
  const [timeAccuracy, setTimeAccuracy] = useState<Person['timeAccuracy']>('Unknown');
  const [birthTime, setBirthTime] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form state when person or open state changes
  useEffect(() => {
    if (isOpen && person) {
      setName(person.name);
      setNickname(person.nickname || '');
      setRelationshipType(person.relationshipType);
      setDob(person.dob);
      setTimeAccuracy(person.timeAccuracy);
      setBirthTime(person.birthTime || '');
      setPhoto(person.photo);
      setError(null);
    }
  }, [isOpen, person]);

  const handlePhotoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!dob) {
      setError('Date of birth is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...person,
        name: name.trim(),
        nickname: nickname.trim() || undefined,
        relationshipType,
        dob,
        timeAccuracy,
        birthTime: timeAccuracy === 'Unknown' ? undefined : birthTime,
        photo,
        updatedAt: new Date(),
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'An error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-xl font-display font-bold text-slate-800">
                  {person.isSelf ? 'Edit My Profile' : 'Edit Profile'}
                </h2>
                <p className="text-xs text-slate-400 font-medium">Update date of birth, time accuracy, and more</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 font-medium animate-fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Photo Upload Zone */}
              <div className="flex flex-col items-center justify-center">
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={triggerFileSelect}
                  className={`group relative flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed transition-all duration-200 overflow-hidden ${
                    photo
                      ? 'border-indigo-500 bg-slate-50'
                      : isDragging
                      ? 'border-indigo-500 bg-indigo-50/50 scale-105'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handlePhotoUpload(e.target.files[0]);
                      }
                    }}
                    accept="image/*"
                    className="hidden"
                  />
                  {photo ? (
                    <>
                      <img src={photo} alt="Avatar Preview" className="h-full w-full object-cover animate-fade-in" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                        <Camera className="h-5 w-5 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-slate-500">
                      <Camera className="h-6 w-6 mb-1" />
                      <span className="text-[10px] font-semibold text-center leading-tight">Photo</span>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-slate-400 font-medium">Drag & drop or tap to select</p>
              </div>

              {/* Form Fields Grid */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="edit-person-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-person-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elaine Poh"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                </div>

                {/* Nickname & Relationship Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-person-nickname" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nickname
                    </label>
                    <input
                      type="text"
                      id="edit-person-nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="e.g. Ellie"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-person-relationship" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Relationship
                    </label>
                    {person.isSelf ? (
                      <div className="w-full rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm text-slate-500 font-semibold">
                        My Profile
                      </div>
                    ) : (
                      <select
                        id="edit-person-relationship"
                        value={relationshipType}
                        onChange={(e) => setRelationshipType(e.target.value as Person['relationshipType'])}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                      >
                        {RELATIONSHIP_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="edit-person-dob" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="edit-person-dob"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                </div>

                {/* Time Accuracy Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Time Accuracy
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl">
                    {(['Unknown', 'ShiChen'] as Person['timeAccuracy'][]).map((accuracy) => (
                      <button
                        key={accuracy}
                        type="button"
                        onClick={() => {
                          setTimeAccuracy(accuracy);
                          setBirthTime('');
                        }}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          timeAccuracy === accuracy
                            ? 'bg-white text-slate-800 shadow-xs font-bold'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {accuracy === 'ShiChen' ? 'Shi Chen' : accuracy}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Shi Chen branch select */}
                {timeAccuracy === 'ShiChen' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1.5"
                  >
                    <label htmlFor="edit-time-shichen" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Birth Time (Shi Chen)
                    </label>
                    <select
                      id="edit-time-shichen"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                    >
                      <option value="">-- Select Shi Chen Branch --</option>
                      {SHI_CHEN_VALUES.map((branch) => (
                        <option key={branch.value} value={branch.value}>
                          {branch.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-sm rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
