// TaskForm.tsx
import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (task: any) => void;
  initialValues?: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Priority:
        </label>
        <select
          name="priority"
          value={formData.priority || ''}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate || ''}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status:
        </label>
        <select
          name="status"
          value={formData.status || ''}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
