'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Clock } from 'lucide-react';

interface HistoryEvent {
  _id?: string;
  year: string;
  title: string;
  description: string;
  image: string;
}

export default function HistoryAdmin() {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<HistoryEvent | null>(null);
  const [formData, setFormData] = useState<HistoryEvent>({ year: '', title: '', description: '', image: '' });

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try { const res = await fetch('/api/history'); const data = await res.json(); setEvents(data); } catch (error) { console.error('Failed:', error); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingEvent?._id ? 'PUT' : 'POST';
      await fetch('/api/history', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingEvent?._id ? { ...formData, _id: editingEvent._id } : formData) });
      setIsModalOpen(false); setEditingEvent(null); setFormData({ year: '', title: '', description: '', image: '' }); fetchHistory();
    } catch (error) { console.error('Failed:', error); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try { await fetch(`/api/history?id=${id}`, { method: 'DELETE' }); fetchHistory(); } catch (error) { console.error('Failed:', error); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-heading text-primary font-bold">Church History</h1><p className="text-gray-600 mt-2">Manage historical milestones</p></div>
        <button onClick={() => { setIsModalOpen(true); setEditingEvent(null); setFormData({ year: '', title: '', description: '', image: '' }); }} className="flex items-center space-x-2 bg-gold text-primary px-4 py-2 rounded-lg hover:bg-gold-light"><Plus size={20} /><span>Add Event</span></button>
      </motion.div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div key={event._id || index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="bg-gold text-primary px-4 py-2 rounded-full font-bold">{event.year}</span>
              <div>
                <h3 className="text-lg font-heading text-primary font-semibold">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => { setEditingEvent(event); setFormData(event); setIsModalOpen(true); }} className="p-2 text-primary hover:bg-gray-100 rounded-lg"><Pencil size={18} /></button>
              <button onClick={() => event._id && handleDelete(event._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-heading text-primary font-bold mb-4">{editingEvent ? 'Edit' : 'Add'} History Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-gray-700 font-medium mb-2">Year</label><input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" required /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" required /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" /></div>
              <div><label className="block text-gray-700 font-medium mb-2">Image URL</label><input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none" /></div>
              <div className="flex space-x-4 pt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingEvent(null); }} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-gold text-primary rounded-lg hover:bg-gold-light">{editingEvent ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}