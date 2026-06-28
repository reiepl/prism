/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  Plus,
  Search,
  Users,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import { personRepository } from './lib/repository/personRepository';
import { type Person } from './lib/types/person';
import { PersonCard } from './components/PersonCard';
import { AddPersonModal } from './components/AddPersonModal';
import { OnboardingScreen } from './components/OnboardingScreen';
import PersonProfilePage from './app/person/[id]/page';

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync route on popstate (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Real-time IndexedDB synchronization using Dexie react hooks
  const self = useLiveQuery(() => personRepository.getSelf());
  const people = useLiveQuery(() => personRepository.getPeople()) ?? [];

  // Stop loading once the database queries have run at least once
  useEffect(() => {
    personRepository.getSelf()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // Handle Save User Profile (Self)
  const handleSaveSelf = async (profileData: Omit<Person, 'id' | 'isSelf' | 'createdAt' | 'updatedAt'>) => {
    const profile: Person = {
      ...profileData,
      isSelf: true,
      id: crypto.randomUUID ? crypto.randomUUID() : `self_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await personRepository.create(profile);
  };

  // Handle Save Connection
  const handleSavePerson = async (newPersonData: Omit<Person, 'id' | 'isSelf' | 'createdAt' | 'updatedAt'>) => {
    const newPerson: Person = {
      ...newPersonData,
      isSelf: false,
      id: crypto.randomUUID ? crypto.randomUUID() : `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await personRepository.create(newPerson);
  };

  // Handle Delete Connection / Profile
  const handleDeletePerson = async (id: string) => {
    await personRepository.delete(id);
  };

  // Filter & Search Logic
  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      const matchesSearch =
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (person.nickname && person.nickname.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || person.relationshipType === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [people, searchQuery, selectedCategory]);

  // Count per Category (Connections only)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: people.length };
    
    // Initialise other types
    const relationshipTypes = ['Friend', 'Family', 'Colleague', 'Client', 'Mentor', 'Student', 'Other'];
    relationshipTypes.forEach(t => { counts[t] = 0; });

    people.forEach((p) => {
      if (p.relationshipType in counts) {
        counts[p.relationshipType]++;
      } else {
        counts[p.relationshipType] = 1;
      }
    });

    return counts;
  }, [people]);

  // Safe Seed Mock Connection for testing
  const handleSeedDemoData = async () => {
    const demoPeople: Person[] = [
      {
        id: 'demo-1',
        name: 'Elaine Poh',
        nickname: 'Ellie',
        relationshipType: 'Family',
        isSelf: false,
        dob: '1995-10-24',
        timeAccuracy: 'ShiChen',
        birthTime: 'Wei (13:00–14:59)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'demo-2',
        name: 'Marcus Vance',
        relationshipType: 'Mentor',
        isSelf: false,
        dob: '1982-04-12',
        timeAccuracy: 'ShiChen',
        birthTime: 'Chen (07:00–08:59)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'demo-3',
        name: 'Kenji Sato',
        nickname: 'Ken',
        relationshipType: 'Colleague',
        isSelf: false,
        dob: '1990-07-08',
        timeAccuracy: 'Unknown',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'demo-4',
        name: 'Sophie Dubois',
        relationshipType: 'Friend',
        isSelf: false,
        dob: '1998-12-01',
        timeAccuracy: 'ShiChen',
        birthTime: 'Chen (07:00–08:59)',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    for (const person of demoPeople) {
      await personRepository.create(person);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-500" />
      </div>
    );
  }

  // Force onboarding if user profile is not configured yet
  if (!self) {
    return <OnboardingScreen onSaveProfile={handleSaveSelf} />;
  }

  // Intercept and route to Person Profile Page if dynamic path matches
  if (currentPath.startsWith('/person/')) {
    const parts = currentPath.split('/');
    const personId = parts[2];
    if (personId) {
      return (
        <PersonProfilePage
          params={{ id: personId }}
          onNavigateBack={() => navigate('/')}
          onDeletePerson={handleDeletePerson}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans select-none antialiased">
      {/* Upper ambient glow container */}
      <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-indigo-50/40 to-transparent pointer-events-none" />

      {/* Main Responsive Canvas container */}
      <main className="relative max-w-md mx-auto px-4 pt-8 sm:pt-12">
        {/* App Branding & Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[13px] font-extrabold text-white tracking-widest font-display shadow-md">
                P
              </span>
              <h1 className="text-xl font-display font-black tracking-widest text-slate-900">
                PRISM
              </h1>
            </div>
            <h2 className="text-3xl font-display font-extrabold tracking-tight text-slate-800 mt-2">
              People Deck
            </h2>
          </div>
          
          {/* Active stats badge */}
          {people.length > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-white border border-slate-100 px-3 py-1.5 shadow-xs">
              <Users className="h-3.5 w-3.5 text-indigo-500" />
              <span className="text-xs font-bold text-slate-600 font-mono">{people.length}</span>
            </div>
          )}
        </div>

        {/* Master User Profile (Self) Anchor */}
        <div className="mb-8 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">My Profile</h3>
          <PersonCard person={self} onClick={() => navigate(`/person/${self.id}`)} />
        </div>

        {/* Connections Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">My Connections</h3>

          {/* Search & Filtering Area */}
          <div className="space-y-4 mb-6">
            {/* Search bar input container */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                id="search-people"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or nickname..."
                className="w-full rounded-2xl border border-slate-100 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded animate-fade-in"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filters Horizontal Scrolling List */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
              {Object.keys(categoryCounts).map((category) => {
                const count = categoryCounts[category];
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-1.5 shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:text-slate-800'
                    }`}
                  >
                    <span>{category}</span>
                    {count > 0 && (
                      <span className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic List Content */}
          {people.length === 0 ? (
            /* Entirely Empty Database State */
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 bg-white shadow-xs animate-fade-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 mb-4 border border-indigo-100/50">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-display font-extrabold text-slate-800 tracking-tight">Your Connections Deck is Empty</h3>
              <p className="text-sm text-slate-500 font-medium max-w-xs mt-2 mb-6 leading-relaxed">
                Start mapping your personal relationships. Add friends, family, mentors, or colleagues securely.
              </p>
              <div className="flex flex-col w-full gap-2.5 px-6">
                <button
                  id="add-first-person"
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <UserPlus className="h-4.5 w-4.5" />
                  Add Your First Person
                </button>
                <button
                  onClick={handleSeedDemoData}
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Pre-populate with Demo People
                </button>
              </div>
            </div>
          ) : filteredPeople.length === 0 ? (
            /* Filtered Results are Empty State */
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-3xl bg-slate-50 border border-slate-100 animate-fade-in">
              <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-2">No Matches Found</p>
              <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                We couldn&apos;t find anyone matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Active Person Grid List */
            <div className="space-y-3.5 animate-fade-in">
              {filteredPeople.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onClick={() => navigate(`/person/${person.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sticky floating bottom action bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-full px-4 flex justify-end pointer-events-none">
          <button
            id="floating-add-button"
            onClick={() => setIsAddModalOpen(true)}
            className="pointer-events-auto flex items-center gap-2 px-5 py-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            <span>Add Person</span>
          </button>
        </div>
      </main>

      {/* Add Person Slide-over Form */}
      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSavePerson}
      />
    </div>
  );
}
