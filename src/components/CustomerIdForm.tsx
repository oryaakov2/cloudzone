import React, { memo, useCallback, useState } from 'react';
import { addCustomerId, checkCustomerId, deleteCustomerId } from '../api/api.ts';

type Status = { state: 'idle' | 'loading' | 'success' | 'error'; message?: string };

type Action = 'add' | 'check' | 'delete'

const CustomerIdForm = () => {

  const [customerId, setCustomerId] = useState('');
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const handleAction = useCallback(async (action: Action) => {
    if (!customerId) {
      setStatus({ state: 'error', message: 'Please enter a valid customer ID.' });
      return;
    }
    setStatus({ state: 'loading' });
    try {
      let res: any;
      if (action === 'add') {
        res = await addCustomerId(customerId.trim());
        setStatus({ state: 'success', message: 'Customer ID added successfully.' });
      }
      else if (action === 'check') {
        res = await checkCustomerId(customerId.trim());
        const exists = res?.exists ?? true;
        setStatus({ state: 'success', message: exists ? 'ID exists in the system.' : 'ID does not exist.' });
      }
      else if (action === 'delete') {
        res = await deleteCustomerId(customerId.trim());
        setStatus({ state: 'success', message: 'Customer ID deleted successfully.' });
      }
    } catch (error: any) {
      const msg = error?.response?.data?.error || 'Unexpected error.';
      setStatus({ state: 'error', message: msg });
    }
  }, [customerId]);

  const isLoading = status.state === 'loading';

  return (
    <form className="bg-white rounded-lg shadow-lg p-8 mb-10" onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer ID Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 items-start">
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value.trim())}
          placeholder="Enter customer ID"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          onClick={() => handleAction('add')}
          className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Add
        </button>
        <button
          onClick={() => handleAction('check')}
          className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Check
        </button>
        <button
          onClick={() => handleAction('delete')}
          className="whitespace-nowrap bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Delete
        </button>
      </div>

      {status.state !== 'idle' && (
        <div
          className={
            'mt-6 px-4 py-3 rounded border ' +
            (status.state === 'success'
              ? 'bg-green-50 text-green-800 border-green-300'
              : status.state === 'loading'
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-red-50 text-red-800 border-red-300')
          }
        >
          {status.state === 'loading' ? 'Processing…' : status.message}
        </div>
      )}
    </form>
  );
};

export default memo(CustomerIdForm);