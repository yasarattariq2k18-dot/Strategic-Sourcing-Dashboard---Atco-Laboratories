import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ArrowUpDown,
  FileSpreadsheet,
  Layers,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Image as ImageIcon,
  Video as VideoIcon,
  Presentation,
  Paperclip,
  Eye,
  UploadCloud,
} from 'lucide-react';
import { InitiativeRecord, InitiativeType, InitiativeProofFile } from '../types';
import { INITIAL_INITIATIVES_DATA } from '../data/initiativesData';
import { AddInitiativeModal } from './AddInitiativeModal';
import { ProofMediaViewerModal } from './ProofMediaViewerModal';
import { detectFileType, formatFileSize } from './ProofUploader';

const LOCAL_STORAGE_KEY = 'atco_process_improvement_initiatives_v2';

export interface ProcessImprovementSectionProps {
  initialTab?: 'performed' | 'upcoming' | 'both';
  onClose?: () => void;
  isModal?: boolean;
}

export const ProcessImprovementSection: React.FC<ProcessImprovementSectionProps> = ({
  initialTab = 'performed',
  onClose,
  isModal = false,
}) => {
  // 1. State for Initiatives
  const [initiatives, setInitiatives] = useState<InitiativeRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge baseline sample attachments if item doesn't have any yet
          return parsed.map((item: InitiativeRecord) => {
            const defaultMatch = INITIAL_INITIATIVES_DATA.find((d) => d.id === item.id);
            if ((!item.attachments || item.attachments.length === 0) && defaultMatch?.attachments?.length) {
              return { ...item, attachments: defaultMatch.attachments };
            }
            return item;
          });
        }
      }
    } catch (e) {
      console.error('Error loading stored initiatives', e);
    }
    return INITIAL_INITIATIVES_DATA;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initiatives));
    } catch (e) {
      console.error('Error saving initiatives', e);
    }
  }, [initiatives]);

  // 2. Active View Tab: 'performed' | 'upcoming' | 'both'
  const [activeTab, setActiveTab] = useState<'performed' | 'upcoming' | 'both'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // 3. Modal State for "+ Add New Initiative / Project"
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingModalRecord, setEditingModalRecord] = useState<InitiativeRecord | null>(null);

  // 4. Inline Edit State
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineEditForm, setInlineEditForm] = useState<{
    challengingArea: string;
    category: string;
    name: string;
    impactOutcome: string;
  }>({
    challengingArea: '',
    category: '',
    name: '',
    impactOutcome: '',
  });

  // 5. Proof Media Viewer Modal State
  const [viewerModalState, setViewerModalState] = useState<{
    isOpen: boolean;
    initiative: InitiativeRecord | null;
    initialIndex: number;
  }>({
    isOpen: false,
    initiative: null,
    initialIndex: 0,
  });

  const handleUpdateAttachments = (initiativeId: string, attachments: InitiativeProofFile[]) => {
    setInitiatives((prev) =>
      prev.map((item) =>
        item.id === initiativeId
          ? { ...item, attachments, updatedAt: new Date().toISOString().split('T')[0] }
          : item
      )
    );
    setViewerModalState((prev) =>
      prev.initiative && prev.initiative.id === initiativeId
        ? { ...prev, initiative: { ...prev.initiative, attachments } }
        : prev
    );
  };

  const handleDirectFileUpload = async (initiativeId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const target = initiatives.find((it) => it.id === initiativeId);
    if (!target) return;

    const newAttachments: InitiativeProofFile[] = [...(target.attachments || [])];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const detected = detectFileType(file);
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newAttachments.push({
          id: `proof-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          fileType: detected,
          mimeType: file.type || 'application/octet-stream',
          sizeFormatted: formatFileSize(file.size),
          dataUrl,
          uploadedAt: new Date().toISOString().split('T')[0],
        });
      } catch (err) {
        console.error('Failed reading file:', err);
      }
    }

    handleUpdateAttachments(initiativeId, newAttachments);
  };

  // Unique categories for filter
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    initiatives.forEach((item) => {
      if (item.category) cats.add(item.category.trim());
    });
    return Array.from(cats).sort();
  }, [initiatives]);

  // Counts
  const performedCount = useMemo(
    () => initiatives.filter((i) => i.type === 'performed').length,
    [initiatives]
  );
  const upcomingCount = useMemo(
    () => initiatives.filter((i) => i.type === 'upcoming').length,
    [initiatives]
  );

  // Filtered initiatives
  const filterList = (items: InitiativeRecord[]) => {
    return items.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category.trim() !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inChall = (item.challengingArea || '').toLowerCase().includes(q);
        const inCat = (item.category || '').toLowerCase().includes(q);
        const inName = (item.name || '').toLowerCase().includes(q);
        const inImpact = (item.impactOutcome || '').toLowerCase().includes(q);
        return inChall || inCat || inName || inImpact;
      }
      return true;
    });
  };

  const performedList = useMemo(
    () => filterList(initiatives.filter((i) => i.type === 'performed')),
    [initiatives, searchQuery, selectedCategory]
  );

  const upcomingList = useMemo(
    () => filterList(initiatives.filter((i) => i.type === 'upcoming')),
    [initiatives, searchQuery, selectedCategory]
  );

  // Handlers for Add / Insert
  const handleSaveModal = (recordData: Omit<InitiativeRecord, 'id'> & { id?: string }) => {
    if (recordData.id) {
      // Edit existing
      setInitiatives((prev) =>
        prev.map((item) =>
          item.id === recordData.id
            ? {
                ...item,
                type: recordData.type,
                challengingArea: recordData.challengingArea,
                category: recordData.category,
                name: recordData.name,
                impactOutcome: recordData.impactOutcome,
                attachments:
                  recordData.attachments !== undefined
                    ? recordData.attachments
                    : item.attachments,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : item
        )
      );
    } else {
      // SUBMIT: IMMEDIATELY INSERT AS AN ADDITIONAL ROW ON TOP (Unshift)
      const newEntry: InitiativeRecord = {
        id: `init-${Date.now()}`,
        type: recordData.type,
        itemNumber: recordData.type === 'performed' ? performedCount + 1 : upcomingCount + 1,
        challengingArea: recordData.challengingArea,
        category: recordData.category,
        name: recordData.name,
        impactOutcome: recordData.impactOutcome,
        attachments: recordData.attachments || [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };

      // Unshift to the top of the array
      setInitiatives((prev) => [newEntry, ...prev]);

      // Automatically switch to the tab that contains the newly inserted entry so user sees it right away
      if (activeTab !== 'both' && activeTab !== recordData.type) {
        setActiveTab(recordData.type);
      }
    }
    setEditingModalRecord(null);
  };

  // Inline editing handlers
  const handleStartInlineEdit = (item: InitiativeRecord) => {
    setInlineEditingId(item.id);
    setInlineEditForm({
      challengingArea: item.challengingArea,
      category: item.category,
      name: item.name,
      impactOutcome: item.impactOutcome,
    });
  };

  const handleSaveInlineEdit = (id: string) => {
    if (!inlineEditForm.name.trim()) return;
    setInitiatives((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              challengingArea: inlineEditForm.challengingArea.trim(),
              category: inlineEditForm.category.trim(),
              name: inlineEditForm.name.trim(),
              impactOutcome: inlineEditForm.impactOutcome.trim(),
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : item
      )
    );
    setInlineEditingId(null);
  };

  const handleCancelInlineEdit = () => {
    setInlineEditingId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete initiative:\n"${name}"?`)) {
      setInitiatives((prev) => prev.filter((item) => item.id !== id));
      if (inlineEditingId === id) {
        setInlineEditingId(null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'Reset all Process Improvement & Digitalization initiatives back to the original 15 PDF baseline items?'
      )
    ) {
      setInitiatives(INITIAL_INITIATIVES_DATA);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setInlineEditingId(null);
    }
  };

  // Render Table for a Sub-Box
  const renderTable = (
    items: InitiativeRecord[],
    subBoxTitle: string,
    badgeColor: string,
    subBoxType: InitiativeType
  ) => {
    return (
      <div className="bg-white border border-slate-300 rounded-none shadow-xs overflow-hidden">
        {/* Sub-Box Header */}
        <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-none ${badgeColor} inline-block`} />
            <h4 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase">
              {subBoxTitle}
            </h4>
            <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700">
              {items.length} {items.length === 1 ? 'Initiative' : 'Initiatives'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingModalRecord(null);
              setIsAddModalOpen(true);
            }}
            className="self-start sm:self-auto py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-none border border-blue-500 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add to {subBoxType === 'performed' ? 'Performed' : 'Upcoming'}</span>
          </button>
        </div>

        {/* Table / Records View */}
        {items.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-50">
            <p className="text-xs font-medium">No matching initiatives found in this sub-box.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="mt-2 text-xs text-blue-600 font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-black border-b border-slate-300 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3 border-r border-slate-200 w-12 text-center">#</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 w-1/4 min-w-[200px]">
                    Challenging Area (Earlier Procedure)
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-200 w-40 min-w-[140px]">
                    Category / Domain
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-200 w-1/5 min-w-[180px]">
                    Initiative / Project Name
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-200 w-1/4 min-w-[200px]">
                    Impact / Outcome / Status
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-200 w-52 min-w-[190px]">
                    <div className="flex items-center justify-between gap-1">
                      <span>Proof / Evidence</span>
                      <span className="text-[9px] font-black px-1 py-0.2 bg-blue-100 text-blue-900 border border-blue-200">
                        Image • Video • PPT
                      </span>
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {items.map((item, idx) => {
                  const isEditing = inlineEditingId === item.id;

                  if (isEditing) {
                    return (
                      <tr key={item.id} className="bg-blue-50/50 border-l-4 border-blue-600">
                        <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-200 align-top">
                          {idx + 1}
                        </td>

                        {/* Challenging Area Input */}
                        <td className="py-2 px-3 border-r border-slate-200 align-top">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Earlier Procedure
                          </label>
                          <textarea
                            rows={3}
                            value={inlineEditForm.challengingArea}
                            onChange={(e) =>
                              setInlineEditForm({ ...inlineEditForm, challengingArea: e.target.value })
                            }
                            className="w-full text-xs p-1.5 border border-blue-400 bg-white rounded-none focus:outline-hidden text-slate-900"
                          />
                        </td>

                        {/* Category Input */}
                        <td className="py-2 px-3 border-r border-slate-200 align-top">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Domain
                          </label>
                          <input
                            type="text"
                            value={inlineEditForm.category}
                            onChange={(e) =>
                              setInlineEditForm({ ...inlineEditForm, category: e.target.value })
                            }
                            className="w-full text-xs p-1.5 border border-blue-400 bg-white rounded-none focus:outline-hidden text-slate-900 font-semibold"
                          />
                        </td>

                        {/* Name Input */}
                        <td className="py-2 px-3 border-r border-slate-200 align-top">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Initiative Name
                          </label>
                          <input
                            type="text"
                            value={inlineEditForm.name}
                            onChange={(e) =>
                              setInlineEditForm({ ...inlineEditForm, name: e.target.value })
                            }
                            className="w-full text-xs p-1.5 border border-blue-400 bg-white rounded-none focus:outline-hidden text-slate-900 font-bold"
                          />
                        </td>

                        {/* Impact Input */}
                        <td className="py-2 px-3 border-r border-slate-200 align-top">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Impact & Status
                          </label>
                          <textarea
                            rows={3}
                            value={inlineEditForm.impactOutcome}
                            onChange={(e) =>
                              setInlineEditForm({ ...inlineEditForm, impactOutcome: e.target.value })
                            }
                            className="w-full text-xs p-1.5 border border-blue-400 bg-white rounded-none focus:outline-hidden text-slate-900"
                          />
                        </td>

                        {/* Attachments during Inline Edit */}
                        <td className="py-2 px-3 border-r border-slate-200 align-top">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Attached Proofs ({item.attachments?.length || 0})
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setViewerModalState({
                                isOpen: true,
                                initiative: item,
                                initialIndex: 0,
                              })
                            }
                            className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs rounded-none transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                            <span>Manage Proofs</span>
                          </button>
                        </td>

                        {/* Inline Actions */}
                        <td className="py-2 px-3 text-center align-top space-y-1.5">
                          <button
                            type="button"
                            onClick={() => handleSaveInlineEdit(item.id)}
                            className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-none transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelInlineEdit}
                            className="w-full py-1 px-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-none transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors group border-b border-slate-200"
                    >
                      {/* Index */}
                      <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-200 align-top">
                        <span className="inline-block w-6 h-6 leading-6 bg-slate-100 text-slate-700 font-mono text-[11px] rounded-none">
                          {idx + 1}
                        </span>
                      </td>

                      {/* Challenging Area (Earlier Procedure) */}
                      <td className="py-3 px-3 border-r border-slate-200 align-top">
                        <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line text-xs">
                          {item.challengingArea}
                        </p>
                      </td>

                      {/* Category / Domain */}
                      <td className="py-3 px-3 border-r border-slate-200 align-top">
                        <span className="inline-flex items-center px-2 py-1 bg-slate-100 border border-slate-300 text-slate-800 font-bold text-[11px] rounded-none shadow-2xs">
                          {item.category}
                        </span>
                      </td>

                      {/* Initiative / Project Name */}
                      <td className="py-3 px-3 border-r border-slate-200 align-top">
                        <h5 className="font-black text-slate-900 text-xs leading-snug tracking-tight">
                          {item.name}
                        </h5>
                        {item.updatedAt && (
                          <span className="text-[10px] text-slate-400 block mt-1">
                            Updated: {item.updatedAt}
                          </span>
                        )}
                      </td>

                      {/* Impact / Outcome / Status */}
                      <td className="py-3 px-3 border-r border-slate-200 align-top">
                        <div className="bg-emerald-50/60 border-l-2 border-emerald-500 p-2 text-emerald-950 font-medium leading-relaxed text-xs">
                          {item.impactOutcome}
                        </div>
                      </td>

                      {/* Proof / Evidence (Image, Video, PPT) */}
                      <td className="py-3 px-3 border-r border-slate-200 align-top">
                        {item.attachments && item.attachments.length > 0 ? (
                          <div className="space-y-1.5">
                            {/* Thumbnails & Badges */}
                            <div className="flex items-center flex-wrap gap-1">
                              {item.attachments.map((proof, pIdx) => {
                                return (
                                  <button
                                    key={proof.id}
                                    type="button"
                                    onClick={() =>
                                      setViewerModalState({
                                        isOpen: true,
                                        initiative: item,
                                        initialIndex: pIdx,
                                      })
                                    }
                                    title={`Click to view ${proof.name} (${proof.fileType})`}
                                    className={`group flex items-center gap-1 px-1.5 py-0.5 border text-[10px] font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                                      proof.fileType === 'image'
                                        ? 'bg-blue-50/90 hover:bg-blue-100 border-blue-300 text-blue-900'
                                        : proof.fileType === 'video'
                                        ? 'bg-purple-50/90 hover:bg-purple-100 border-purple-300 text-purple-900'
                                        : 'bg-amber-50/90 hover:bg-amber-100 border-amber-300 text-amber-900'
                                    }`}
                                  >
                                    {proof.fileType === 'image' ? (
                                      <ImageIcon className="w-3 h-3 text-blue-600 shrink-0" />
                                    ) : proof.fileType === 'video' ? (
                                      <VideoIcon className="w-3 h-3 text-purple-600 shrink-0" />
                                    ) : (
                                      <Presentation className="w-3 h-3 text-amber-600 shrink-0" />
                                    )}
                                    <span className="max-w-[85px] truncate">{proof.name}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* View & Upload Actions */}
                            <div className="flex items-center gap-2 pt-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setViewerModalState({
                                    isOpen: true,
                                    initiative: item,
                                    initialIndex: 0,
                                  })
                                }
                                className="text-[10px] font-black text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                <span>View All ({item.attachments.length})</span>
                              </button>

                              <label
                                className="text-[10px] font-black text-slate-700 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                                title="Attach more Image/Video/PPT proof files"
                              >
                                <UploadCloud className="w-3 h-3 text-blue-600" />
                                <span>+ Upload</span>
                                <input
                                  type="file"
                                  multiple
                                  accept="*/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    handleDirectFileUpload(item.id, e.target.files);
                                    e.target.value = '';
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        ) : (
                          /* Empty Proof Uploader Trigger */
                          <div className="flex flex-col gap-1">
                            <label
                              className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-dashed border-slate-300 hover:border-blue-400 text-[11px] font-black transition-all cursor-pointer rounded-none"
                              title="Click to upload proof file (Image, Video, PPT, PDF, or any format)"
                            >
                              <UploadCloud className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>+ Upload Proof</span>
                              <input
                                type="file"
                                multiple
                                accept="*/*"
                                className="hidden"
                                onChange={(e) => {
                                  handleDirectFileUpload(item.id, e.target.files);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                            <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 font-medium">
                              <span>Image</span>
                              <span>•</span>
                              <span>Video</span>
                              <span>•</span>
                              <span>PPT</span>
                              <span>•</span>
                              <span>Any</span>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Actions: Proof Viewer, Edit, Delete */}
                      <td className="py-3 px-3 text-center align-top">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setViewerModalState({
                                isOpen: true,
                                initiative: item,
                                initialIndex: 0,
                              })
                            }
                            title="Open Proof & Evidence Hub (Image/Video/PPT)"
                            className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 rounded-none transition-colors cursor-pointer relative"
                          >
                            <Paperclip className="w-3.5 h-3.5" />
                            {item.attachments && item.attachments.length > 0 && (
                              <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-0.5 bg-blue-600 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                                {item.attachments.length}
                              </span>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStartInlineEdit(item)}
                            title="Inline Edit"
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-none transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.name)}
                            title="Delete Entry"
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-none transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id="process-improvement"
      className={`bg-white border-2 border-slate-800 rounded-none shadow-md overflow-hidden ${
        isModal ? 'flex flex-col h-full max-h-[90vh]' : ''
      }`}
    >
      {/* 4th Section Main Banner Header */}
      <div className="bg-slate-950 text-white px-5 py-4 border-b-2 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider rounded-none">
              4th Section
            </span>
            <span className="text-xs text-blue-400 font-bold tracking-wide">
              Strategic Sourcing Transformation Hub • pr.pdf
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase">
            PROCESS IMPROVEMENT & DIGITAL TRANSFORMATION INITIATIVES
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational traceability, automated QA/stability triggers, single-source mitigation, and digital development milestones.
          </p>
        </div>

        {/* Top Section Actions: "+ Add New Initiative / Project", Baseline Reset, and Close */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEditingModalRecord(null);
              setIsAddModalOpen(true);
            }}
            className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-none border border-blue-500 transition-all flex items-center gap-2 shadow-xs cursor-pointer hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Initiative / Project</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            title="Reset to default 15 items from pr.pdf"
            className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-none border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset PDF Baseline</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-none border border-rose-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Close window"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Sub-Box Tabs + Search + Category Filter */}
      <div className="bg-slate-100 p-4 border-b border-slate-300 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
        {/* Two Distinct Sub-Boxes / Tabs Switcher */}
        <div className="flex items-center flex-wrap gap-1.5">
          {/* Sub-Box 1 Tab: PERFORMED INITIATIVES */}
          <button
            type="button"
            onClick={() => setActiveTab('performed')}
            className={`py-2 px-3 text-xs font-black rounded-none border transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'performed'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>PERFORMED INITIATIVES</span>
            <span
              className={`px-1.5 py-0.2 text-[10px] font-black ${
                activeTab === 'performed' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-800'
              }`}
            >
              {performedCount}
            </span>
          </button>

          {/* Sub-Box 2 Tab: IN-PROGRESS INITIATIVES */}
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-3 text-xs font-black rounded-none border transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border-slate-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>IN-PROGRESS INITIATIVES</span>
            <span
              className={`px-1.5 py-0.2 text-[10px] font-black ${
                activeTab === 'upcoming' ? 'bg-purple-900 text-white' : 'bg-slate-200 text-slate-800'
              }`}
            >
              {upcomingCount}
            </span>
          </button>

          {/* Both Sub-Boxes Side-by-Side Mode */}
          <button
            type="button"
            onClick={() => setActiveTab('both')}
            className={`py-2 px-3 text-xs font-black rounded-none border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'both'
                ? 'bg-slate-900 text-white border-slate-950 shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200 border-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>View Both Sub-Boxes</span>
          </button>
        </div>

        {/* Search and Category Slicers */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search initiatives, impact, procedure..."
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-blue-600 text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs py-2 px-2.5 bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-blue-600 text-slate-800 font-bold"
            >
              <option value="ALL">All Categories / Domains ({allCategories.length})</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area Rendering Selected Sub-Box(es) */}
      <div className={`p-4 sm:p-5 bg-slate-50 space-y-6 ${isModal ? 'overflow-y-auto flex-1' : ''}`}>
        {/* SUB-BOX 1: PERFORMED */}
        {(activeTab === 'performed' || activeTab === 'both') && (
          <div>
            {renderTable(
              performedList,
              'PROCESS IMPROVEMENT & DIGITALIZATION INITIATIVES (PERFORMED)',
              'bg-blue-600',
              'performed'
            )}
          </div>
        )}

        {/* SUB-BOX 2: IN-PROGRESS & UPCOMING */}
        {(activeTab === 'upcoming' || activeTab === 'both') && (
          <div>
            {renderTable(
              upcomingList,
              'PROCESS IMPROVEMENT & DIGITALIZATION INITIATIVES (IN-PROGRESS & UPCOMING PROJECTS)',
              'bg-purple-600',
              'upcoming'
            )}
          </div>
        )}
      </div>

      {/* 4th Section Footer Quick Summary */}
      <div className="bg-slate-100 px-5 py-3 border-t border-slate-300 text-slate-600 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800">Summary Status:</span>
          <span>
            {performedCount} Performed Initiatives • {upcomingCount} In-Progress/Upcoming Projects
          </span>
        </div>
        <div className="text-[11px] text-slate-500">
          Click <span className="font-bold text-slate-700">Edit</span> on any entry to modify fields inline or click <span className="font-bold text-blue-600">+ Add New Initiative</span> to insert rows on top.
        </div>
      </div>

      {/* Modal for Adding or Editing an Initiative */}
      <AddInitiativeModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingModalRecord(null);
        }}
        onSave={handleSaveModal}
        initialData={editingModalRecord}
        defaultType={activeTab === 'upcoming' ? 'upcoming' : 'performed'}
      />

      {/* Proof Media Viewer & Hub Modal for Image, Video, and PPT */}
      <ProofMediaViewerModal
        isOpen={viewerModalState.isOpen}
        onClose={() =>
          setViewerModalState({
            isOpen: false,
            initiative: null,
            initialIndex: 0,
          })
        }
        initiative={viewerModalState.initiative}
        initialIndex={viewerModalState.initialIndex}
        onUpdateAttachments={handleUpdateAttachments}
      />
    </div>
  );
};
