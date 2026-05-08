'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, User } from 'lucide-react';

interface Pastor {
  _id?: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  isLead: boolean;
}

export default function PastorsAdmin() {
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPastor, setEditingPastor] = useState<Pastor | null>(null);
  const [formData, setFormData] = useState<Pastor>({ name: '', position: '', bio: '', image: '', isLead: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPastors(); }, []);

  const fetchPastors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pastors');
      const data = await res.json();
      setPastors(data);
    } catch (error) {
      console.error('Failed to fetch pastors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingPastor?._id ? 'PUT' : 'POST';
      await fetch('/api/pastors', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingPastor?._id ? { ...formData, _id: editingPastor._id } : formData) });
      setIsModalOpen(false); setEditingPastor(null); setFormData({ name: '', position: '', bio: '', image: '', isLead: false }); fetchPastors();
    } catch (error) { console.error('Failed:', error); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this pastor?')) return;
    try { await fetch(`/api/pastors?id=${id}`, { method: 'DELETE' }); fetchPastors(); } catch (error) { console.error('Failed:', error); }
  };

  const openEdit = (pastor: Pastor) => { setEditingPastor(pastor); setFormData(pastor); setIsModalOpen(true); };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-heading text-primary font-bold">Pastors</h1><p className="text-gray-600 mt-2">Manage church pastors</p></div>
        <button onClick={() => { setIsModalOpen(true); setEditingPastor(null); setFormData({ name: '', position: '', bio: '', image: '', isLead: false }); }} className="flex items-center space-x-2 bg-gold text-primary px-4 py-2 rounded-lg hover:bg-gold-light"><Plus size={20} /><span>Add Pastor</span></button>
      </motion.div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastors.map((pastor, index) => (
            <motion.div key={pastor._id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-square bg-gray-200">{pastor.image ? <img src={pastor.image} alt={pastor.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={40} /></div>}</div>
              <div className="p-4">
                <div className="flex justify-between items-start"><div><h3 className="text-lg font-heading text-primary font-semibold">{pastor.name}</h3><p className="text-gold text-sm">{pastor.position}</p></div>{pastor.isLead && <span className="bg-gold text-primary text-xs px-2 py-1 rounded-full">Lead</span>}</div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{pastor.bio}</p>
                <div className="flex space-x-2 mt-4"><button onClick={() => openEdit(pastor)} className="p-2 text-primary hover:bg-gray-100 rounded-lg"><Pencil size={18} /></button><button onClick={() => pastor._id && handleDelete(pastor._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-heading text-primary font-bold mb-4">{editingPastor ? 'Edit' : 'Add'} Pastor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-gray-700 font-medium mb-2">Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" required /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Position</label><input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" required /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Bio</label><textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Image URL</label><input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none text-sm" /></div>
              {formData.image && <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />}
              <div className="flex items-center"><input type="checkbox" id="isLead" checked={formData.isLead} onChange={(e) => setFormData({ ...formData, isLead: e.target.checked })} className="w-4 h-4 text-gold" /><label htmlFor="isLead" className="ml-2 text-gray-700">Lead Pastor</label></div>
              <div className="flex space-x-4 pt-4"><button type="button" onClick={() => { setIsModalOpen(false); setEditingPastor(null); }} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="flex-1 px-4 py-2 bg-gold text-primary rounded-lg hover:bg-gold-light">{editingPastor ? 'Update' : 'Add'}</button></div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}