import React from 'react';
import ReactDOM from 'react-dom';
import TaskListApp from './TaskListApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskListApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
