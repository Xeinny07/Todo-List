import { useState } from 'react';

export default function TodoItem({ todo, onDelete, onMarkCompleted, onEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  return (
    <article
      className="bg-white -lg shadow-md p-4 flex flex-col gap-2 border-l-4 border-white-500 focus-within:ring-2 focus-within:ring-yellow-300"
      tabIndex={0}
      aria-labelledby={`todo-${todo.id}`}
    >
      <div className="flex items-center justify-between">
        <h2
          id={`todo-${todo.id}`}
          className={`text-lg font-semibold ${todo.completed ? 'text-black line-through' :  'text-black'}`}
        >
          {todo.title}
        </h2>
        <span
          className={` px-3 py-1 rounded text-sm font-medium ${
          todo.completed 
          ? 'bg-yellow-800 text-white-600' 
          : 'bg-yellow-800 text-white-600'
        }`}
          aria-label={`Todo status: ${todo.completed ? 'Completed' : 'Not completed'}`}
        >
          {todo.completed ? '✅ Completed' : '❌ Not Completed'}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mt-3" aria-label="Todo actions">
        <button
          onClick={() => onMarkCompleted(todo.id)}
          className="bg-yellow-800 text-white px-3 py-1 rounded hover:bg-yellow-600 transition  focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          Mark as {todo.completed ? 'Incomplete' : 'Complete'}
        </button>

        <button
          onClick={() => setShowEditModal(true)}
          className="px-3 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Edit todo"
        >
          Edit
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-3 py-1 rounded bg-orange-600 text-white-300 hover:bg-orange-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Delete todo"
        >
          Delete
        </button>

        <button
          onClick={() => setShowViewModal(true)}
          className="px-3 py-1 rounded bg-yellow-600 text-white-300 hover:bg-yellow-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="View todo details"
        >
          View
        </button>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <div className="bg-white p-6 rounded shadow text-center max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
            <p className="bg-white text-black mb-4">
              Status: {todo.completed ? '✅ Completed' : '❌ Not Completed'}
            </p>
            <button
              onClick={() => setShowViewModal(false)}
              className="bg-yellow-900 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="mb-4 bg-white text-black">Are you sure you want to delete this todo?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onDelete(todo.id);
                  setShowDeleteModal(false);
                }}
                className="bg-yellow-900 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-orange-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-20"
        >
          <div className="bg-white text-black p-6 rounded shadow text-center- max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Edit Todo</h2>
            <label htmlFor="edit-title" className="sr-only">
              Edit title
            </label>
            <input
              id="edit-title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border px-3 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Edit todo title"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onEdit(todo.id, editedTitle);
                  setShowEditModal(false);
                }}
                className="bg-yellow-900 text-white px-4 py-2 rounded [focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-orange-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
