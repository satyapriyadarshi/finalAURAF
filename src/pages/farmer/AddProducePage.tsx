import { useState } from 'react';
import { Sprout, IndianRupee, Upload, ArrowLeft, Info } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MarketInfoCard } from '@/components/ui/MarketInfoCard';
import { categories, productGrades, units } from '@/data/mockData';

export function AddProducePage() {
  const { navigate, addProduct, showToast, user } = useApp();
  const [form, setForm] = useState({
    name: '',
    category: 'Vegetables' as const,
    quantity: '',
    unit: 'kg' as const,
    sellingPrice: '',
    harvestDate: '',
    grade: 'Grade A' as const,
    availableFrom: '',
    location: user?.location ?? '',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.sellingPrice) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    addProduct({
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity),
      unit: form.unit,
      sellingPrice: Number(form.sellingPrice),
      harvestDate: form.harvestDate || new Date().toISOString().slice(0, 10),
      grade: form.grade,
      availableFrom: form.availableFrom || new Date().toISOString().slice(0, 10),
      location: form.location,
      distance: Math.floor(Math.random() * 30) + 5,
      image: form.image,
    });
    showToast('Produce successfully listed.', 'success');
    navigate({ name: 'myProduce' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <button onClick={() => navigate({ name: 'farmerDashboard' })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add Produce</h1>
        <p className="text-sm text-gray-500 mt-1">List your harvest for buyers to discover</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-5 space-y-4">
        <div>
          <label className="label">Produce Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Fresh Tomato"
            className="input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as typeof form.category })}
              className="input"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.emoji} {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Quality / Grade</label>
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value as typeof form.grade })}
              className="input"
            >
              {productGrades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Quantity *</label>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="500"
              className="input"
            />
          </div>
          <div>
            <label className="label">Unit</label>
            <select
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value as typeof form.unit })}
              className="input"
            >
              {units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Your Selling Price (₹/kg) *</label>
          <div className="relative">
            <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="number"
              value={form.sellingPrice}
              onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
              placeholder="32"
              className="input pl-11"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5">Set the price you want to receive for your produce.</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-brand-600 font-medium">
            <Info className="w-3.5 h-3.5" />
            You decide your selling price.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Harvest Date</label>
            <input
              type="date"
              value={form.harvestDate}
              onChange={(e) => setForm({ ...form, harvestDate: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="label">Available From</label>
            <input
              type="date"
              value={form.availableFrom}
              onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Nashik, Maharashtra"
            className="input"
          />
        </div>

        <div>
          <label className="label">Upload Product Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-brand-400 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Tap to upload an image</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">A default image will be used if none is uploaded.</p>
        </div>

        <button type="submit" className="btn-primary w-full py-3.5 text-base">
          <Sprout className="w-4.5 h-4.5" />
          List Produce
        </button>
      </form>

      <MarketInfoCard priceLow={30} priceHigh={34} productName={form.name || 'Your produce'} />
    </div>
  );
}
