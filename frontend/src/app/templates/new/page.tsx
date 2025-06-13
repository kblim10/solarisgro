'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DataPoint {
  name: string;
  type: string;
  unit: string;
  min?: number;
  max?: number;
  enumValues?: string[];
  visualization: {
    type: string;
    color: string;
  };
}

interface Action {
  name: string;
  type: string;
  parameters: Record<string, any>;
}

export default function NewTemplate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'sensor',
    dataPoints: [] as DataPoint[],
    actions: [] as Action[]
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Gagal membuat template');
      }

      router.push('/templates');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addDataPoint = () => {
    setFormData({
      ...formData,
      dataPoints: [
        ...formData.dataPoints,
        {
          name: '',
          type: 'number',
          unit: '',
          visualization: {
            type: 'line',
            color: '#3B82F6'
          }
        }
      ]
    });
  };

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newDataPoints = [...formData.dataPoints];
    newDataPoints[index] = {
      ...newDataPoints[index],
      [field]: value
    };
    setFormData({
      ...formData,
      dataPoints: newDataPoints
    });
  };

  const removeDataPoint = (index: number) => {
    setFormData({
      ...formData,
      dataPoints: formData.dataPoints.filter((_, i) => i !== index)
    });
  };

  const addAction = () => {
    setFormData({
      ...formData,
      actions: [
        ...formData.actions,
        {
          name: '',
          type: 'toggle',
          parameters: {}
        }
      ]
    });
  };

  const updateAction = (index: number, field: string, value: any) => {
    const newActions = [...formData.actions];
    newActions[index] = {
      ...newActions[index],
      [field]: value
    };
    setFormData({
      ...formData,
      actions: newActions
    });
  };

  const removeAction = (index: number) => {
    setFormData({
      ...formData,
      actions: formData.actions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Template Baru
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Buat template baru untuk perangkat IoT Anda.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-6">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nama Template
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Tipe
                  </label>
                  <select
                    name="type"
                    id="type"
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="sensor">Sensor</option>
                    <option value="actuator">Actuator</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Data Points
                    </label>
                    <button
                      type="button"
                      onClick={addDataPoint}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      Tambah Data Point
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    {formData.dataPoints.map((dataPoint, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Nama"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={dataPoint.name}
                            onChange={(e) => updateDataPoint(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <select
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={dataPoint.type}
                            onChange={(e) => updateDataPoint(index, 'type', e.target.value)}
                          >
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="string">String</option>
                            <option value="enum">Enum</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Unit"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={dataPoint.unit}
                            onChange={(e) => updateDataPoint(index, 'unit', e.target.value)}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDataPoint(index)}
                          className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {(formData.type === 'actuator' || formData.type === 'hybrid') && (
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Actions
                      </label>
                      <button
                        type="button"
                        onClick={addAction}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      >
                        Tambah Action
                      </button>
                    </div>
                    <div className="mt-4 space-y-4">
                      {formData.actions.map((action, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Nama Action"
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={action.name}
                              onChange={(e) => updateAction(index, 'name', e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <select
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={action.type}
                              onChange={(e) => updateAction(index, 'type', e.target.value)}
                            >
                              <option value="toggle">Toggle</option>
                              <option value="slider">Slider</option>
                              <option value="input">Input</option>
                              <option value="select">Select</option>
                            </select>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAction(index)}
                            className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 