import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const inputRef = useRef(null);

  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newTask = { id: String(Date.now()), title: trimmed, note: note.trim() };
    setTasks((t) => [newTask, ...t]);
    setTitle('');
    setNote('');
    inputRef.current && inputRef.current.blur();
  };

  const removeTask = (id) => {
    setTasks((t) => t.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.task}
      onPress={() => removeTask(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      {item.note ? <Text style={styles.taskNote}>{item.note}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Pendientes de hoy</Text>
          <Text style={styles.subtitle}>Toca una tarea para marcarla como completada</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Título de la tarea"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Apuntes o detalles (opcional)"
            value={note}
            onChangeText={setNote}
            onSubmitEditing={addTask}
            returnKeyType="done"
            multiline
          />
          <TouchableOpacity style={styles.addBtn} onPress={addTask}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No hay tareas — añade una 😄</Text>}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 30 },
  header: { marginBottom: 20},
  title: { fontSize: 22, fontWeight: '700', marginBottom: 5 },
  subtitle: { fontSize: 12, color: '#666' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  input: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  addBtn: {
    marginLeft: 8,
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  addBtnText: { fontSize: 28, lineHeight: 28 },
  list: { paddingTop: 16 },
  task: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    marginBottom: 10,
  },
  taskTitle: { fontSize: 16, fontWeight: '600' },
  taskNote: { fontSize: 14, color: '#555', marginTop: 4 },
  empty: { textAlign: 'center', color: '#999', marginTop: 20 },
});
