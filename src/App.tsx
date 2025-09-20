import React from 'react';
import CustomerIdForm from './components/CustomerIdForm.tsx';

const App = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              CloudZone Customer ID Manager
            </h1>
          </div>
          <CustomerIdForm />
        </div>
      </div>
    </div>
  );
}

export default App;
