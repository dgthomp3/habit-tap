import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles';

const dummyHabits = [
  { id: '1', title: 'Drink Water', completed: true },
  { id: '2', title: 'Read for 30 Minutes', completed: false },
  { id: '3', title: 'Morning Run', completed: true },
  { id: '4', title: '10 Minute Meditation', completed: false },
];

export default function DailyGoalsScreen() {
  const [habits, setHabits] = useState(dummyHabits);
  const [newHabit, setNewHabit] = useState('');
  const [showInput, setShowInput] = useState(false);

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const renderHabit = ({ item }) => (
    <TouchableOpacity
      style={[
        globalStyles.habitItem,
        item.completed && { backgroundColor: colors.primary },
      ]}
      onPress={() => toggleHabit(item.id)}
    >
      <Text style={{ color: item.completed ? '#fff' : colors.text }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const allComplete = habits.every((h) => h.completed);
  const percent = Math.round(
    (habits.filter((h) => h.completed).length / habits.length) * 100
  );

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: colors.primary }]}>
      <Text style={[globalStyles.title, { color: '#fff', textAlign: 'center', marginTop: 16 }]}>
        {allComplete ? 'Good Job!' : "Today's Habits"}
      </Text>
      <Text style={[globalStyles.subtitle, { color: '#E0F2E0', textAlign: 'center', marginBottom: 24 }]}>
        {allComplete
          ? 'You\'ve Done All your Task For the Day!'
          : 'Tap to check off completed tasks'}
      </Text>

      <View style={[globalStyles.card, { backgroundColor: '#fff', borderRadius: 24 }]}>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={renderHabit}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
        {showInput && (
          <View style={{ marginTop: 16 }}>
            <Text style={{ marginBottom: 6, fontWeight: '600', color: colors.text }}>
              Add New Habit
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[globalStyles.input, { flex: 1, marginRight: 8 }]}
                placeholder="e.g., Stretch for 5 min"
                value={newHabit}
                onChangeText={setNewHabit}
              />
              <TouchableOpacity
                style={globalStyles.iconButton}
                onPress={() => {
                  if (!newHabit.trim()) return;
                  setHabits((prev) => [
                    ...prev,
                    {
                      id: (Date.now()).toString(),
                      title: newHabit.trim(),
                      completed: false,
                    },
                  ]);
                  setNewHabit('');
                  setShowInput(false);
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )};
      </View>

      <View style={localStyles.progressCard}>
        <Text style={localStyles.progressText}>Today's Tasks</Text>
        <Text style={localStyles.percent}>{percent}% Complete</Text>
      </View>

      <TouchableOpacity
        style={localStyles.fab}
        onPress={() => setShowInput(!showInput)}
      >
        <Text style={localStyles.fabText}>{showInput ? 'X' : '+'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  progressCard: {
    backgroundColor: '#EAF6EA',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16, // ← add this
    marginBottom: 16,
  },  
  progressText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
  },
  percent: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    marginTop: -2,
  },
});