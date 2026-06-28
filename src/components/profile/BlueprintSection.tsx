/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { type Blueprint } from '../../lib/models/blueprint';
import { BlueprintTable } from './BlueprintTable';

interface BlueprintSectionProps {
  blueprint: Blueprint;
}

export const BlueprintSection: React.FC<BlueprintSectionProps> = ({ blueprint }) => {
  return (
    <div className="space-y-6">
      {/* Blueprint Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          命盘 Blueprint
        </h3>
        <BlueprintTable pillars={blueprint.pillars} />
      </div>

      {/* Engine and Provider metadata footer */}
      {blueprint.metadata && (
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Engine: <span className="text-slate-600 font-medium">{blueprint.metadata.provider}</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span>Version: <span className="text-slate-600 font-medium">v{blueprint.metadata.engineVersion}</span></span>
            <span>Computed: <span className="text-slate-600 font-medium">{new Date(blueprint.metadata.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span></span>
          </div>
        </div>
      )}
    </div>
  );
};
