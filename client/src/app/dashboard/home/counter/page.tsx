'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { BASE_URL } from '@/utils/envVariable';
import { toast } from 'react-hot-toast';

interface CounterData {
  couples: number;
  courses: number;
  speakers: number;
  lectures: number;
}

const DEFAULT_STATS: CounterData = {
  couples: 6000,
  courses: 15,
  speakers: 45,
  lectures: 90,
};

export default function CounterDashboardPage() {
  const [formData, setFormData] = useState<CounterData>(DEFAULT_STATS);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  // Fetch current data from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(BASE_URL + '/api/home/counter-stats');
        const json = await res.json();
        if (json.success && json.data) {
          setFormData({
            couples: json.data.couples ?? DEFAULT_STATS.couples,
            courses: json.data.courses ?? DEFAULT_STATS.courses,
            speakers: json.data.speakers ?? DEFAULT_STATS.speakers,
            lectures: json.data.lectures ?? DEFAULT_STATS.lectures,
          });
        }
      } catch (err) {
        console.error('Failed to load stats, falling back to defaults:', err);
      } finally {
        setFetching(false);
      }
    };

    fetchStats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(BASE_URL + '/api/home/counter-stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        toast.success('Counter statistics updated successfully!');
      } else {
        toast.error('Failed to save changes.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating counter data.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icon icon="line-md:loading-loop" className="w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon="lucide:bar-chart-3" className="w-6 h-6 text-blue-600" />
            Manage Counter Statistics
          </CardTitle>
          <CardDescription>
            Update the statistics counters displayed on the public landing page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Couples Counter */}
              <div className="space-y-2">
                <Label htmlFor="couples" className="flex items-center gap-2">
                  <Icon icon="lucide:heart" className="w-4 h-4 text-blue-500" />
                  Couples
                </Label>
                <Input
                  id="couples"
                  name="couples"
                  type="number"
                  value={formData.couples}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Courses Counter */}
              <div className="space-y-2">
                <Label htmlFor="courses" className="flex items-center gap-2">
                  <Icon icon="lucide:book-open" className="w-4 h-4 text-blue-500" />
                  Courses
                </Label>
                <Input
                  id="courses"
                  name="courses"
                  type="number"
                  value={formData.courses}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Speakers Counter */}
              <div className="space-y-2">
                <Label htmlFor="speakers" className="flex items-center gap-2">
                  <Icon icon="lucide:users" className="w-4 h-4 text-blue-500" />
                  Speakers
                </Label>
                <Input
                  id="speakers"
                  name="speakers"
                  type="number"
                  value={formData.speakers}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Lectures Counter */}
              <div className="space-y-2">
                <Label htmlFor="lectures" className="flex items-center gap-2">
                  <Icon icon="lucide:video" className="w-4 h-4 text-blue-500" />
                  Lectures
                </Label>
                <Input
                  id="lectures"
                  name="lectures"
                  type="number"
                  value={formData.lectures}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon icon="line-md:loading-loop" className="w-4 h-4" /> Updating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Icon icon="lucide:save" className="w-4 h-4" /> Save Changes
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}