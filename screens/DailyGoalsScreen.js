import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../styles';

const dummyHabits = [
  { id: '1', title: 'Drink Water', completed: true },
  { id: '2', title: 'Read for 30 Minutes', completed: false },
  { id: '3', title: 'Morning Run', completed: true },
  { id: '4', title: '10 Minute Meditation', completed: false },
];

export default function HomeScreen() {
  const [habits, setHabits] = useState(dummyHabits);

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

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        {allComplete ? 'Good Job!' : 'Today\'s Habits'}
      </Text>
      <Text style={globalStyles.subtitle}>
        {allComplete ? 'You’ve done all your tasks for the day!' : 'Tap to check off completed tasks'}
      </Text>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}