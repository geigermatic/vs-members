import { FC } from 'react';

interface AssistModalProps {
  isOpen: boolean;
  memberId?: string;
  onClose: () => void;
}

const AssistModal: FC<AssistModalProps> = ({ isOpen, memberId, onClose }) => {
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900">
                Assist Member
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
              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-3 py-2 bg-slate-50 text-slate-700 rounded text-sm hover:bg-slate-100">
                    Schedule Call
                  </button>
                  <button className="px-3 py-2 bg-slate-50 text-slate-700 rounded text-sm hover:bg-slate-100">
                    Send Message
                  </button>
                  <button className="px-3 py-2 bg-slate-50 text-slate-700 rounded text-sm hover:bg-slate-100">
                    Review Profile
                  </button>
                  <button className="px-3 py-2 bg-slate-50 text-slate-700 rounded text-sm hover:bg-slate-100">
                    Update Status
                  </button>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">Add Note</h4>
                <textarea
                  rows={3}
                  className="w-full rounded-md border-slate-200 text-sm"
                  placeholder="Enter notes about the assistance provided..."
                />
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
                Save & Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistModal; 