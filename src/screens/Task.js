import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, deleteTask} from '../redux/slices/taskSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Task() {
  const [task, setTask] = useState('');
  const taskList = useSelector(state => state.task.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim().length === 0) return;

    dispatch(addTask(task));
    setTask('');
  };

  const handleDelete = index => {
    dispatch(deleteTask(index));
  };

  const renderItem = ({item, index}) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>
        {index + 1}. {item}
      </Text>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleDelete(index)}>
        <Ionicons name="trash" color="red" size={20} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 My Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter a task..."
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.taskList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#777',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  taskList: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {},
  emptyText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    marginTop: 30,
  },
});
