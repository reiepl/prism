/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Check, AlertCircle, Sparkles } from 'lucide-react';
import { type Person } from '../lib/types/person';

interface OnboardingScreenProps {
  onSaveProfile: (profileData: Omit<Person, 'id' | 'isSelf' | 'createdAt' | 'updatedAt'>) => Promise<void>;
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

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onSaveProfile }) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('');
  const [timeAccuracy, setTimeAccuracy] = useState<Person['timeAccuracy']>('Unknown');
  const [birthTime, setBirthTime] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await onSaveProfile({
        name: name.trim(),
        nickname: nickname.trim() || undefined,
        relationshipType: 'Other', // default placeholder for self
        dob,
        timeAccuracy,
        birthTime: timeAccuracy === 'Unknown' ? undefined : birthTime,
        photo,
      });
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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center px-4 py-12 select-none antialiased">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-[circle_800px_at_center,rgba(99,102,241,0.04),transparent] pointer-events-none" />

      <div className="relative max-w-md w-full mx-auto space-y-8">
        {/* Branding Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-base font-extrabold text-white tracking-widest font-display shadow-md mb-2">
            P
          </div>
          <h1 className="text-4xl font-display font-black tracking-tight text-slate-900">
            Welcome to PRISM
          </h1>
          <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto">
            Personal Relationship Intelligence System
          </p>
        </div>

        {/* Setup card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] space-y-6">
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-display font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Create My Profile
            </h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Your profile serves as the central anchor of your relational intelligence network.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Photo Picker */}
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
                    <img src={photo} alt="Avatar Preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <Camera className="h-5 w-5 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-slate-500">
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-bold text-center leading-tight">My Photo</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Upload Profile Photo</p>
            </div>

            {/* Name input */}
            <div>
              <label htmlFor="self-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                My Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="self-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elaine Poh"
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              />
            </div>

            {/* Nickname input */}
            <div>
              <label htmlFor="self-nickname" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nickname / Alias
              </label>
              <input
                type="text"
                id="self-nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Ellie"
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              />
            </div>

            {/* Date of Birth input */}
            <div>
              <label htmlFor="self-dob" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                My Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="self-dob"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              />
            </div>

            {/* Time Accuracy */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Time Accuracy
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                {(['Unknown', 'ShiChen'] as Person['timeAccuracy'][]).map((accuracy) => (
                  <button
                    key={accuracy}
                    type="button"
                    onClick={() => {
                      setTimeAccuracy(accuracy);
                      setBirthTime('');
                    }}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      timeAccuracy === accuracy
                        ? 'bg-white text-slate-800 shadow-xs'
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
                <label htmlFor="self-time-shichen" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Birth Time (Shi Chen)
                </label>
                <select
                  id="self-time-shichen"
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

            {/* Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <Check className="h-4.5 w-4.5" />
                    Save & Get Started
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
