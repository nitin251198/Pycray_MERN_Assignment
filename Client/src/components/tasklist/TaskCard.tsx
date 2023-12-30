// TaskCard.tsx
import React from 'react';

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  editTask: () => void;
  deleteTask: () => Promise<void>;
  viewDetails: () => void; // Ensure this property is present
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, status, dueDate, editTask, deleteTask, viewDetails }) => {
    const getStatusColor = () => {
        switch (status) {
          case 'pending':
            return 'bg-yellow-500';
          case 'completed':
            return 'bg-green-500';
          case 'expired':
            return 'bg-red-500';
          default:
            return 'bg-gray-500';
        }};
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${getStatusColor()}`}>
          {status}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {new Date(dueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}
        </span>
      </div>
      <div className="px-6 py-4 space-y-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
          onClick={editTask}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full"
          onClick={deleteTask}
        >
          Delete
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full"
          onClick={viewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
