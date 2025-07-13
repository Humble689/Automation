import React from 'react';

function TaskList({ tasks }) {
  return (
    <div>
      <h2>Tasks</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Payload</th>
            <th>Schedule</th>
            <th>Status</th>
            <th>Logs</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.type}</td>
              <td><pre>{JSON.stringify(task.payload, null, 1)}</pre></td>
              <td>{task.schedule}</td>
              <td>{task.status}</td>
              <td><pre>{task.logs}</pre></td>
              <td>{task.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;