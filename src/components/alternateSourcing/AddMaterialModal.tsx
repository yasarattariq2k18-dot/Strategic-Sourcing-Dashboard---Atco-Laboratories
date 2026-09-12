import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { InquiryMaterialItem } from '../../types';
import { useInquiry } from '../../context/InquiryContext';

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMaterialModal: React.FC<AddMaterialModalProps> = ({ isOpen, onClose }) => {
  const { addMaterialItem } = useInquiry();

  const [formData, setFormData] = useState({
    importOrLocal: 'IMPORT' as 'IMPORT' | 'LOCAL',
    materialCode: '',
    materialName: '',
    annualQty: 1000,
    perLotQty: 250,
    uom: 'KG',
    lastBuyingPriceUSD: 25,
    shipmentMode: 'SEA',
    apiExp: 'API',
    preferMfg: '',
    preferOrigin: 'China / India',
    atcoPreferredOrigin: 'India/Europe',
    approxInitialSampleQty: '200g 1st lot + WS',
    approxTrialSampleQty: '1kg 2nd lot',
    benchmarkPriceUSD: 25,
    activeMfgs: '',
    customDataMfgs: '',
    underDevelopmentStatus: 'Pending Inquiry' as any,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.materialCode || !formData.materialName) {
      alert('Please fill in Material Code and Material Name.');
      return;
    }

    addMaterialItem({
      ...formData,
      annualQty: Number(formData.annualQty),
      perLotQty: Number(formData.perLotQty),
      lastBuyingPriceUSD: Number(formData.lastBuyingPriceUSD),
      benchmarkPriceUSD: Number(formData.lastBuyingPriceUSD || formData.benchmarkPriceUSD),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        <div className="bg-blue-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-200" />
            <h3 className="text-sm font-bold">Add Material Sourcing Inquiry Line Item</h3>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Section 1: Basic info */}
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">
              1. Basic Material Specs
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  IMPORT / LOCAL <span className="text-amber-600 font-bold">🔒 Admin Only</span>
                </label>
                <select
                  value={formData.importOrLocal}
                  onChange={(e) => setFormData({ ...formData, importOrLocal: e.target.value as any })}
                  className="w-full p-2 border border-slate-300 rounded bg-white font-semibold text-slate-900"
                >
                  <option value="IMPORT">IMPORT</option>
                  <option value="LOCAL">LOCAL</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Material Code *</label>
                <input
                  type="text"
                  required
                  value={formData.materialCode}
                  onChange={(e) => setFormData({ ...formData, materialCode: e.target.value })}
                  placeholder="e.g. 111000025"
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Material Name *</label>
                <input
                  type="text"
                  required
                  value={formData.materialName}
                  onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
                  placeholder="e.g. AZITHROMYCIN DIHYDRATE USP"
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Annual Qty</label>
                <input
                  type="number"
                  value={formData.annualQty}
                  onChange={(e) => setFormData({ ...formData, annualQty: Number(e.target.value) })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Per Lot Qty</label>
                <input
                  type="number"
                  value={formData.perLotQty}
                  onChange={(e) => setFormData({ ...formData, perLotQty: Number(e.target.value) })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">UOM</label>
                <input
                  type="text"
                  value={formData.uom}
                  onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white uppercase"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Shipment Mode</label>
                <select
                  value={formData.shipmentMode}
                  onChange={(e) => setFormData({ ...formData, shipmentMode: e.target.value as any })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                >
                  <option value="SEA">SEA</option>
                  <option value="AIR">AIR</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">API / EXP</label>
                <select
                  value={formData.apiExp}
                  onChange={(e) => setFormData({ ...formData, apiExp: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="API">API</option>
                  <option value="EXP">EXP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Reference Makers & Samples */}
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider block text-[10px]">
              2. Target Sources & Sample Requirements
            </span>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Prefer Mfg (For reference only, if you can arrange)
              </label>
              <input
                type="text"
                value={formData.preferMfg}
                onChange={(e) => setFormData({ ...formData, preferMfg: e.target.value })}
                placeholder="e.g. Pfizer (Originator); Sinochem; CSPC"
                className="w-full p-2 border border-slate-300 rounded bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Prefer Origin</label>
                <input
                  type="text"
                  value={formData.preferOrigin}
                  onChange={(e) => setFormData({ ...formData, preferOrigin: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Atco Preferred Origin</label>
                <input
                  type="text"
                  value={formData.atcoPreferredOrigin}
                  onChange={(e) => setFormData({ ...formData, atcoPreferredOrigin: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Initial Sample Qty (1st Lot)</label>
                <input
                  type="text"
                  value={formData.approxInitialSampleQty}
                  onChange={(e) => setFormData({ ...formData, approxInitialSampleQty: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Trial Sample Qty (2nd Lot)</label>
                <input
                  type="text"
                  value={formData.approxTrialSampleQty}
                  onChange={(e) => setFormData({ ...formData, approxTrialSampleQty: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Internal Admin Tracking (Hidden from Indenters) */}
          <div className="border border-amber-300 rounded-lg p-3 bg-amber-50/60 space-y-3">
            <span className="font-bold text-amber-950 uppercase tracking-wider block text-[10px]">
              🔒 3. Internal Admin Only Columns (Hidden from Indenters)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Active MFGs (AVL)</label>
                <input
                  type="text"
                  value={formData.activeMfgs}
                  onChange={(e) => setFormData({ ...formData, activeMfgs: e.target.value })}
                  placeholder="e.g. CSPC Pharma (China)"
                  className="w-full p-1.5 border border-amber-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Custom Data (MFGs / PRAL)</label>
                <input
                  type="text"
                  value={formData.customDataMfgs}
                  onChange={(e) => setFormData({ ...formData, customDataMfgs: e.target.value })}
                  placeholder="e.g. Customs rate: $42.00/KG"
                  className="w-full p-1.5 border border-amber-300 rounded bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Under Development Status</label>
                <select
                  value={formData.underDevelopmentStatus}
                  onChange={(e) => setFormData({ ...formData, underDevelopmentStatus: e.target.value as any })}
                  className="w-full p-1.5 border border-amber-300 rounded bg-white font-medium"
                >
                  <option value="Pending Inquiry">Pending Inquiry</option>
                  <option value="Published">Published</option>
                  <option value="Sample Under Testing">Sample Under Testing</option>
                  <option value="At Stability">At Stability</option>
                  <option value="At PD Priority">At PD Priority</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Last Buying Price in USD ($/UOM) <span className="text-amber-600 font-bold">🔒 Admin Only</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.lastBuyingPriceUSD}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFormData({ ...formData, lastBuyingPriceUSD: val, benchmarkPriceUSD: val });
                  }}
                  className="w-full p-1.5 border border-amber-300 rounded bg-white font-mono font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Benchmark / Reference Cost ($/KG)</label>
              <input
                type="number"
                step="0.01"
                value={formData.benchmarkPriceUSD}
                onChange={(e) => setFormData({ ...formData, benchmarkPriceUSD: Number(e.target.value) })}
                className="w-full p-1.5 border border-amber-300 rounded bg-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs"
            >
              Add Material Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
