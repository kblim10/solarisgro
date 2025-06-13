'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

interface Template {
  _id: string;
  name: string;
  description: string;
  type: string;
  dataPoints: DataPoint[];
  actions: Action[];
  createdAt: string;
  updatedAt: string;
}

export default function TemplateDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/templates/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Gagal mengambil data template');
        }

        const data = await res.json();
        setTemplate(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [params.id]);

  const handleDelete = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus template ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/templates/${params.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Gagal menghapus template');
      }

      router.push('/templates');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="text-sm text-yellow-700">Template tidak ditemukan</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{template.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{template.description}</p>
        </div>
        <div className="flex space-x-4">
          <Link
            href={`/templates/${template._id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Informasi Template
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tipe</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {template.type}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Dibuat</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(template.createdAt).toLocaleString()}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Terakhir Diupdate</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(template.updatedAt).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Data Points
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {template.dataPoints.map((dataPoint, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {dataPoint.name}
                        {dataPoint.unit && ` (${dataPoint.unit})`}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Tipe: {dataPoint.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${dataPoint.visualization.color}20`,
                          color: dataPoint.visualization.color
                        }}
                      >
                        {dataPoint.visualization.type}
                      </span>
                    </div>
                  </div>
                  {(dataPoint.min !== undefined || dataPoint.max !== undefined) && (
                    <p className="mt-2 text-sm text-gray-500">
                      Range: {dataPoint.min ?? '-'} - {dataPoint.max ?? '-'}
                    </p>
                  )}
                  {dataPoint.enumValues && dataPoint.enumValues.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Nilai yang tersedia:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {dataPoint.enumValues.map((value) => (
                          <span
                            key={value}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {(template.type === 'actuator' || template.type === 'hybrid') && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Actions
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                {template.actions.map((action, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {action.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Tipe: {action.type}
                        </p>
                      </div>
                    </div>
                    {Object.keys(action.parameters).length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Parameter:</p>
                        <div className="mt-1">
                          <pre className="text-xs bg-gray-100 p-2 rounded">
                            {JSON.stringify(action.parameters, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 