import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action) {
      state.tasks.splice(action.payload, 1); // remove by index
    },
    updateTask: (state, action) => {
      const {index, newText} = action.payload;
      if (state.tasks[index]) {
        state.tasks[index] = newText;
      }
    },
  },
});

export const {addTask, deleteTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;
