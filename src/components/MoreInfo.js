import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  MORE_INFO_TEST_IDS,
  MORE_INFO_TEXT,
} from '../constants/moreInfoConstants';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deleteTask, updateTask} from '../redux/slices/taskSlice';
import {TextInput} from 'react-native-gesture-handler';

export default function MoreInfo() {
  const data = useSelector(state => state?.task?.tasks || []);
  const dispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleStartEdit = (index, currentText) => {
    console.log('lllllllllll', currentText);
    setEditingIndex(index);
    setEditedText(currentText);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() === '') return;
    dispatch(updateTask({index: editingIndex, newText: editedText}));
    setEditingIndex(null);
    setEditedText('');
  };

  const handleDelete = index => {
    dispatch(deleteTask(index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading} testID={MORE_INFO_TEST_IDS.heading}>
        {MORE_INFO_TEXT.heading}
      </Text>

      <ScrollView contentContainerStyle={styles.taskList}>
        {data.length > 0 ? (
          data.map((task, index) => (
            <View key={index} style={styles.taskCard}>
              {editingIndex === index ? (
                <TextInput
                  value={editedText}
                  onChangeText={setEditedText}
                  style={styles.input}
                  autoFocus
                  multiline
                />
              ) : (
                <>
                  <Text style={styles.taskText}>
                    {index + 1}.{''} {task}
                  </Text>
                </>
              )}

              {editingIndex === index ? (
                <>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleSaveEdit}>
                    <Ionicons
                      name="checkmark-sharp"
                      color="#4CAF50"
                      size={22}
                    />
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
                    onPress={() => handleStartEdit(index, task)}>
                    <Ionicons name="pencil" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No tasks available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2f3542',
    marginBottom: 20,
    alignSelf: 'center',
  },
  taskList: {
    paddingBottom: 20,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#777',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#777',
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#2f3542',
    flexShrink: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#a4b0be',
    textAlign: 'center',
    marginTop: 50,
  },
});
