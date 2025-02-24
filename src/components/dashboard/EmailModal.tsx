import { FC, useState } from 'react';

interface EmailModalProps {
  isOpen: boolean;
  memberId?: string;
  onClose: () => void;
}

const EmailModal: FC<EmailModalProps> = ({ isOpen, memberId, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  // Mock email templates - replace with actual templates later
  const templates = [
    { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to Labor Credit Union!' },
    { id: 'followup', name: 'Follow-up', subject: 'Following up on your recent activity' },
    { id: 'review', name: 'Review Request', subject: 'Quick review of your account' },
    { id: 'custom', name: 'Custom Email', subject: '' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900">
                Send Email
              </h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="space-y-4">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full rounded-md border-slate-200 text-sm"
                >
                  <option value="">Select a template...</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Line */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border-slate-200 text-sm"
                  placeholder="Enter email subject..."
                  value={templates.find(t => t.id === selectedTemplate)?.subject || ''}
                />
              </div>

              {/* Email Content */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full rounded-md border-slate-200 text-sm"
                  placeholder="Enter your message..."
                />
              </div>

              {/* Preview Section */}
              <div className="bg-slate-50 rounded-md p-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Preview</h4>
                <div className="text-sm text-slate-600">
                  Template preview will appear here...
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal; 