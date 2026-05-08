'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface GalleryItem {
  _id?: string;
  title: string;
  image: string;
  category: string;
}

const categories = ['worship', 'youth', 'children', 'outreach', 'events'];

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<GalleryItem>({ title: '', image: '', category: 'events' });

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = async () => {
    try { const res = await fetch('/api/gallery'); const data = await res.json(); setItems(data); } catch (error) { console.error('Failed:', error); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem?._id ? 'PUT' : 'POST';
      await fetch('/api/gallery', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem?._id ? { ...formData, _id: editingItem._id } : formData) });
      setIsModalOpen(false); setEditingItem(null); setFormData({ title: '', image: '', category: 'events' }); fetchGallery();
    } catch (error) { console.error('Failed:', error); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    try { await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' }); fetchGallery(); } catch (error) { console.error('Failed:', error); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-heading text-primary font-bold">Gallery</h1><p className="text-gray-600 mt-2">Manage church photos</p></div>
        <button onClick={() => { setIsModalOpen(true); setEditingItem(null); setFormData({ title: '', image: '', category: 'events' }); }} className="flex items-center space-x-2 bg-gold text-primary px-4 py-2 rounded-lg hover:bg-gold-light"><Plus size={20} /><span>Add Photo</span></button>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div key={item._id || index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="aspect-square bg-gray-200">{item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><Image size={40} /></div>}</div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-primary truncate">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.category}</p>
              <div className="flex justify-end space-x-1 mt-2">
                <button onClick={() => { setEditingItem(item); setFormData(item); setIsModalOpen(true); }} className="p-1 text-primary hover:bg-gray-100 rounded"><Pencil size={14} /></button>
                <button onClick={() => item._id && handleDelete(item._id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-heading text-primary font-bold mb-4">{editingItem ? 'Edit' : 'Add'} Photo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-gray-700 font-medium mb-2">Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" required /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Category</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none">{categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}</select></div>
              <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} />
              <div className="flex space-x-4 pt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingItem(null); }} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-gold text-primary rounded-lg hover:bg-gold-light">{editingItem ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}