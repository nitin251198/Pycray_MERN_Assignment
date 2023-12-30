// TaskDetailsModal.tsx
import React from 'react';
import Modal from 'react-modal';

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskDetails: any;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isOpen, onClose, taskDetails }) => {
  const modalStyle: any = {
    content: {
      width: '500px', // Set the width to 500px
      margin: 'auto', // Center the modal horizontally
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Details Modal"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className='w-full max-w-xl mx-auto'>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md absolute top-2 right-2"
          onClick={onClose}
        >
          Close
        </button>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2"> Tilte: {taskDetails.title}</h2>
          <p className="text-gray-700 text-base mb-4"> Description: {taskDetails.description}</p>
          <div className="flex items-center mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Priority: {taskDetails.priority}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Status: {taskDetails.status}
            </span>
          </div>
          <p className="text-gray-700 text-base">Due Date: {new Date(taskDetails.dueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}</p>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
