import React, { useState, useEffect } from 'react';
import { X, Plus, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { InitiativeRecord, InitiativeType, InitiativeProofFile } from '../types';
import { ProofUploader } from './ProofUploader';

interface AddInitiativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Omit<InitiativeRecord, 'id'> & { id?: string }) => void;
  initialData?: InitiativeRecord | null;
  defaultType?: InitiativeType;
}

export const AddInitiativeModal: React.FC<AddInitiativeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  defaultType = 'performed',
}) => {
  const [type, setType] = useState<InitiativeType>(defaultType);
  const [challengingArea, setChallengingArea] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [impactOutcome, setImpactOutcome] = useState<string>('');
  const [attachments, setAttachments] = useState<InitiativeProofFile[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setChallengingArea(initialData.challengingArea || '');
      setCategory(initialData.category || '');
      setName(initialData.name || '');
      setImpactOutcome(initialData.impactOutcome || '');
      setAttachments(initialData.attachments || []);
    } else {
      setType(defaultType);
      setChallengingArea('');
      setCategory('');
      setName('');
      setImpactOutcome('');
      setAttachments([]);
    }
    setError('');
  }, [initialData, defaultType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengingArea.trim()) {
      setError('Please provide the Challenging Area (Earlier Procedure)');
      return;
    }
    if (!category.trim()) {
      setError('Please provide the Category / Domain');
      return;
    }
    if (!name.trim()) {
      setError('Please provide the Initiative / Project Name');
      return;
    }
    if (!impactOutcome.trim()) {
      setError('Please provide the Impact / Outcome / Status');
      return;
    }

    onSave({
      id: initialData?.id,
      type,
      challengingArea: challengingArea.trim(),
      category: category.trim(),
      name: name.trim(),
      impactOutcome: impactOutcome.trim(),
      attachments,
      itemNumber: initialData?.itemNumber,
    });

    // Reset fields & close
    setChallengingArea('');
    setCategory('');
    setName('');
    setImpactOutcome('');
    setAttachments([]);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-none border-2 border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-blue-600 flex items-center justify-center text-white font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-wide text-white uppercase">
                {initialData ? 'Edit Initiative / Project Entry' : '+ Add New Initiative / Project'}
              </h3>
              <p className="text-xs text-slate-300">
                Process Improvement & Digital Transformation Registry (pr.pdf)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-none transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border-l-4 border-rose-600 p-3 text-xs text-rose-800 flex items-center gap-2 rounded-none">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Select Type */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Select Type <span className="text-rose-600">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('performed')}
                className={`py-2.5 px-3 rounded-none text-xs font-black border text-left flex items-center justify-between transition-all cursor-pointer ${
                  type === 'performed'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                    : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Performed Initiative (Sub-Box 1)</span>
                {type === 'performed' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                type="button"
                onClick={() => setType('upcoming')}
                className={`py-2.5 px-3 rounded-none text-xs font-black border text-left flex items-center justify-between transition-all cursor-pointer ${
                  type === 'upcoming'
                    ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-xs'
                    : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>In-Progress & Upcoming Project (Sub-Box 2)</span>
                {type === 'upcoming' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
              </button>
            </div>
          </div>

          {/* 2. Challenging Area (Earlier Procedure) */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Challenging Area (Earlier Procedure) <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              value={challengingArea}
              onChange={(e) => setChallengingArea(e.target.value)}
              placeholder="e.g. Communication & Responsiveness Gap: Lack of sample traceability, delay & incomplete QA/QC/PD response..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-none focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
              required
            />
          </div>

          {/* 3. Category / Domain */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Category / Domain <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Traceability & Visibility, Quality Assurance, Alternate Source Development..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-none focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
              required
            />
          </div>

          {/* 4. Initiative / Project Name */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Initiative / Project Name <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Centralized Tracking System (Google Spreadsheet) or Single Source Alternate Working..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-none focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-bold"
              required
            />
          </div>

          {/* 5. Impact / Outcome / Status */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Impact / Outcome / Status <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={3}
              value={impactOutcome}
              onChange={(e) => setImpactOutcome(e.target.value)}
              placeholder="e.g. Real-time traceability, visibility, and elimination of response delays for submitted samples..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-none focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
              required
            />
          </div>

          {/* 6. ATTACH PROOF FILES (IMAGE, VIDEO, PPT) SECTION */}
          <div className="pt-2 border-t border-slate-200">
            <ProofUploader
              attachments={attachments}
              onChange={setAttachments}
              label="Attach Proof Files (Image, Video, PPT / Presentation)"
            />
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-none border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="py-2 px-6 rounded-none bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{initialData ? 'Save Changes' : 'Submit & Insert on Top'}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
