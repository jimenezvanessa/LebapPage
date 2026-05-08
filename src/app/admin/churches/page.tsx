'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface Church {
  _id?: string;
  name: string;
  location: string;
  pastor: string;
  description: string;
  image: string;
}

export default function ChurchesAdmin() {
  const [churches, setChurches] = useState<Church[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChurch, setEditingChurch] = useState<Church | null>(null);
  const [formData, setFormData] = useState<Church>({ name: '', location: '', pastor: '', description: '', image: '' });

  useEffect(() => { fetchChurches(); }, []);

  const fetchChurches = async () => {
    try {
      const res = await fetch('/api/churches');
      const data = await res.json();
      setChurches(data);
    } catch (error) { console.error('Failed to fetch:', error); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/churches';
      const method = editingChurch?._id ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingChurch?._id ? { ...formData, _id: editingChurch._id } : formData) });
      setIsModalOpen(false); setEditingChurch(null); setFormData({ name: '', location: '', pastor: '', description: '', image: '' }); fetchChurches();
    } catch (error) { console.error('Failed to save:', error); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this church?')) return;
    try { await fetch(`/api/churches?id=${id}`, { method: 'DELETE' }); fetchChurches(); } catch (error) { console.error('Failed to delete:', error); }
  };

  const openEdit = (church: Church) => { setEditingChurch(church); setFormData(church); setIsModalOpen(true); };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading text-primary font-bold">Sister Churches</h1>
          <p className="text-gray-600 mt-2">Manage sister churches</p>
        </div>
        <button onClick={() => { setIsModalOpen(true); setEditingChurch(null); setFormData({ name: '', location: '', pastor: '', description: '', image: '' }); }} className="flex items-center space-x-2 bg-gold text-primary px-4 py-2 rounded-lg hover:bg-gold-light">
          <Plus size={20} /><span>Add Church</span>
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {churches.map((church, index) => (
          <motion.div key={church._id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200">{church.image ? <img src={church.image} alt={church.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><MapPin size={40} /></div>}</div>
            <div className="p-4">
              <h3 className="text-lg font-heading text-primary font-semibold">{church.name}</h3>
              <p className="text-gold text-sm">{church.location}</p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{church.description}</p>
              <p className="text-gray-500 text-xs mt-2">Pastor: {church.pastor}</p>
              <div className="flex space-x-2 mt-4">
                <button onClick={() => openEdit(church)} className="p-2 text-primary hover:bg-gray-100 rounded-lg"><Pencil size={18} /></button>
                <button onClick={() => church._id && handleDelete(church._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-heading text-primary font-bold mb-4">{editingChurch ? 'Edit' : 'Add'} Church</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-gray-700 font-medium mb-2">Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" required /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Location</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Pastor</label><input type="text" value={formData.pastor} onChange={(e) => setFormData({ ...formData, pastor: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" /></div>
              <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} />
              <div className="flex space-x-4 pt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingChurch(null); }} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-gold text-primary rounded-lg hover:bg-gold-light">{editingChurch ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}