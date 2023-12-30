// TaskFormModal.tsx
import React from 'react';
import Modal from 'react-modal';
import TaskForm from './TaskForm';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const modalStyle: any = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      width: '500px',
      margin: 'auto',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      height: '95%'
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Form Modal"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className='w-full max-w-md mx-auto p-4'>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md absolute top-2 right-2"
          onClick={onClose}
        >
          Close
        </button>
        <TaskForm onSubmit={onSubmit} />
      </div>
    </Modal>
  );
};

export default TaskFormModal;
