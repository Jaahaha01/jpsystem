"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Studio = dynamic(
  () =>
    import("next-sanity/studio").then((mod) => {
      const { NextStudio } = mod;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const config = require("../../../../sanity.config").default;
      return function StudioInner() {
        return <NextStudio config={config} basePath="/studio" />;
      };
    }),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Development Studio...</p>
          <p className="text-sm text-slate-500 mt-1">Preparing your content management environment</p>
        </div>
      </div>
    )
  }
);

export default function StudioPage() {
  const [showTips, setShowTips] = useState(true);

  return (
    <div className="relative h-full">
      {showTips && (
        <div className="absolute top-4 left-4 z-50 max-w-sm">
          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-slate-900">🚀 Quick Start</h3>
              <button
                onClick={() => setShowTips(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                ×
              </button>
            </div>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Select a document from the sidebar</li>
              <li>• Edit content using the rich editor</li>
              <li>• See changes in real-time preview</li>
              <li>• Changes save automatically</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <a
                href="#studio-guide"
                className="text-xs text-sky-600 hover:text-sky-700 font-medium"
              >
                View detailed guide →
              </a>
            </div>
          </div>
        </div>
      )}
      <Studio />
    </div>
  );
}
