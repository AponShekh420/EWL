'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { IConference } from '@/types/conference';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BASE_URL } from '@/utils/envVariable';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/conferences';

// Helper to convert Date/ISO string to 'YYYY-MM-THH:mm' for datetime-local input
const formatForInput = (dateStr?: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export default function ConferenceDashboard() {
  const [conferences, setConferences] = useState<IConference[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<IConference>({
    month: '',
    day: '',
    timeInfo: '',
    eventDate: '',
    speaker: '',
    lecture: '',
    readMoreUrl: '#',
  });

  const fetchConferences = async () => {
    try {
      const res = await fetch(BASE_URL + "/api/home/conference/");
      const data = await res.json();
      if (data.success) setConferences(data.data);
    } catch (err) {
      console.error('Failed to fetch conferences', err);
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  const handleOpenModal = (item?: IConference) => {
    if (item && item._id) {
      setEditingId(item._id);
      setFormData({
        ...item,
        eventDate: formatForInput(item.eventDate),
      });
    } else {
      setEditingId(null);
      setFormData({
        month: '',
        day: '',
        timeInfo: '',
        eventDate: '',
        speaker: '',
        lecture: '',
        readMoreUrl: '#',
      });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${BASE_URL}/api/home/conference/${editingId}` : `${BASE_URL}/api/home/conference/`;

    // Convert local datetime to ISO string for backend storage
    const payload = {
      ...formData,
      eventDate: new Date(formData.eventDate).toISOString(),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsOpen(false);
        fetchConferences();
      }
    } catch (err) {
      console.error('Error saving data', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${BASE_URL}/api/home/conference/${id}`, { method: 'DELETE' });
      if (res.ok) fetchConferences();
    } catch (err) {
      console.error('Error deleting event', err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Conferences</h1>
          <p className="text-sm text-gray-500">Add, edit, or delete conference events.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Icon icon="lucide:plus" className="w-4 h-4" />
          Add Event
        </Button>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time Info</TableHead>
              <TableHead>Countdown Target</TableHead>
              <TableHead>Speaker</TableHead>
              <TableHead>Lecture Title</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conferences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No conference events found.
                </TableCell>
              </TableRow>
            ) : (
              conferences.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-semibold">
                    {item.month} {item.day}
                  </TableCell>
                  <TableCell>{item.timeInfo}</TableCell>
                  <TableCell className="text-xs text-gray-600">
                    {item.eventDate ? new Date(item.eventDate).toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-blue-600 font-medium">{item.speaker}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.lecture}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenModal(item)}
                    >
                      <Icon icon="lucide:edit-3" className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => item._id && handleDelete(item._id)}
                    >
                      <Icon icon="lucide:trash-2" className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600">Month</label>
                <Input
                  placeholder="e.g. May"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Day</label>
                <Input
                  placeholder="e.g. 12"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Time Info</label>
              <Input
                placeholder="e.g. Tuesday 3 pm EST"
                value={formData.timeInfo}
                onChange={(e) => setFormData({ ...formData, timeInfo: e.target.value })}
                required
              />
            </div>

            {/* Countdown Target Date Picker */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Event Date & Time (For Countdown Timer)
              </label>
              <Input
                type="datetime-local"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Speaker Name</label>
              <Input
                placeholder="e.g. Sarah Kahan"
                value={formData.speaker}
                onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Lecture / Topic</label>
              <Input
                placeholder="e.g. Q&A Session with Sarah Kahan LCSW"
                value={formData.lecture}
                onChange={(e) => setFormData({ ...formData, lecture: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Read More Link (URL)</label>
              <Input
                placeholder="e.g. https://example.com/details"
                value={formData.readMoreUrl}
                onChange={(e) => setFormData({ ...formData, readMoreUrl: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? 'Update Event' : 'Create Event'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}