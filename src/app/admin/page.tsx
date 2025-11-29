'use client';

import { useState, useEffect } from 'react';
import { Save, ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Invalid password');
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(JSON.stringify(json, null, 2));
    } catch (err) {
      setMessage('Failed to load data');
    }
  };

  const saveData = async () => {
    setSaving(true);
    setMessage('');
    try {
      JSON.parse(data); // Validate JSON
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      setMessage('Saved successfully!');
    } catch (err) {
      setMessage('Invalid JSON or failed to save');
    }
    setSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Lock className="text-blue-600 dark:text-blue-400" size={28} />
              </div>
              <h1 className="text-2xl font-bold">Admin Access</h1>
              <p className="text-gray-500 mt-2">Enter password to edit portfolio</p>
            </div>

            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </form>

            <Link 
              href="/" 
              className="block text-center mt-4 text-gray-500 hover:text-blue-600"
            >
              <ArrowLeft size={14} className="inline mr-1" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Portfolio Data</h1>
          <div className="flex gap-3">
            <Link href="/" className="btn btn-secondary">
              View Site
            </Link>
            <button onClick={saveData} disabled={saving} className="btn btn-primary">
              <Save size={16} />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {message}
          </div>
        )}

        <div className="card">
          <p className="text-sm text-gray-500 mb-4">
            Edit the JSON below. Be careful with the structure!
          </p>
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="font-mono text-sm"
            rows={30}
            style={{ minHeight: '500px' }}
          />
        </div>
      </div>
    </div>
  );
}
