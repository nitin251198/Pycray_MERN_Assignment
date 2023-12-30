// TaskList.tsx
import React, { useState, useEffect } from 'react';
import TaskFormModal from './TaskFormModal';
import TaskDetailsModal from './TaskDeatilModal';
import { getAllTasks, addNewTask, updateTask, deleteTask } from '../../service/index';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import toast from 'react-hot-toast';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<Task | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const fetchAllTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const addTask = async (newTask: Task) => {
    try {
      const response = await addNewTask(newTask);
      setTasks([...tasks, response.data]);
      toast.success('Successfully Added the New Task');
    } catch (error) {
      toast.error('Error occured while addig the new task');
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (editedTask: any) => {
    try {
      const response = await updateTask(editedTask);
      const updatedTasks = tasks.map((task) => (task._id === editedTask._id ? response.data : task));
      setTasks(updatedTasks);
      setEditingTask(null);
      toast.success('Task Updated Successfully');
    } catch (error) {
      toast.error('Error occured while updating the Task');
      console.error('Error updating task:', error);
    }
  };

  const deleteTaskById = async (task: any) => {
    try {
      let taskId = task._id;
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      setEditingTask(null);
      toast.success('Task deleted successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  const openDetailsModal = (task: Task) => {
    setSelectedTaskDetails(task);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="w-full p-4">
      <div className="ml-auto max-w-max">
          <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700">
            Filter by Priority:
          </label>
          <select
            name="priorityFilter"
            value={priorityFilter || ''}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      <button style={{ width: "300px" }}
        className="bg-blue-500 text-white mx-auto block px-4 py-2 rounded-md mb-4"
        onClick={() => setIsTaskFormModalOpen(true)}
      >
        + Add New Task
      </button>

      <TaskFormModal
        isOpen={isTaskFormModalOpen}
        onClose={() => {
          setIsTaskFormModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={(task) => {
          if (editingTask) {
            editTask({ ...editingTask, ...task });
          } else {
            addTask(task);
          }
          setIsTaskFormModalOpen(false);
        }}
      />

      <ul className="mt-4 flex items-start justify-center max-w-7xl flex-wrap mx-auto gap-10">
        {tasks
        .filter((task) => (priorityFilter ? task.priority === priorityFilter : true))
        .map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
            dueDate={task.dueDate}
            editTask={() => setEditingTask(task)}
            deleteTask={() => deleteTaskById(task)}
            viewDetails={() => openDetailsModal(task)}
          />
        ))}
      </ul>

      {editingTask && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Edit Task</h2>
          <TaskForm onSubmit={editTask} initialValues={editingTask} />
        </div>
      )}

      {selectedTaskDetails && (
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          taskDetails={selectedTaskDetails}
        />
      )}
    </div>
  );
};

export default TaskList;
