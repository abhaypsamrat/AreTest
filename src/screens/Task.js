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
import {addTask, deleteTask, updateTask} from '../redux/slices/taskSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Task() {
  const [task, setTask] = useState('');
  const taskList = useSelector(state => state.task.tasks);
  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleAddTask = () => {
    if (task.trim().length === 0) return;

    dispatch(addTask(task));
    setTask('');
  };

  const handleDelete = index => {
    dispatch(deleteTask(index));
  };

  const handleStartEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditedText(currentText);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() === '') return;
    dispatch(updateTask({index: editingIndex, newText: editedText}));
    setEditingIndex(null);
    setEditedText('');
  };

  const renderItem = ({item, index}) => (
    <View style={styles.taskItem}>
      <View style={styles.taskTextContainer}>
        {editingIndex === index ? (
          <TextInput
            value={editedText}
            onChangeText={setEditedText}
            style={styles.input}
            autoFocus
            multiline
          />
        ) : (
          <Text style={styles.taskText}>
            {index + 1}. {item}
          </Text>
        )}
      </View>

      <View style={styles.iconGroup}>
        {editingIndex === index ? (
          <>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleSaveEdit}>
              <Ionicons name="checkmark-sharp" color="#4CAF50" size={22} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setEditingIndex(null);
                setEditedText('');
              }}>
              <Ionicons name="close" color="#FF4C4C" size={22} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleStartEdit(index, item)}>
              <Ionicons name="pencil" color="#1E90FF" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDelete(index)}>
              <Ionicons name="trash" color="#FF4C4C" size={20} />
            </TouchableOpacity>
          </>
        )}
      </View>
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
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#777',
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
    marginLeft: 5,
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
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    marginTop: 30,
  },
});
