import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { initDB } from '../database.js';
import {
  createDailyCompletionTable,
  getCompletedDaysForMonth,
} from '../database/dbUtils.js';
import { globalStyles, colors } from '../styles.js';

const getLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function MonthlyCompletionScreen() {
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);

  const today = new Date(); // still local
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  useEffect(() => {
    const loadData = async () => {
      await initDB();
      await createDailyCompletionTable();

      const completedDates = await getCompletedDaysForMonth(
        currentMonth,
        currentYear
      );

      const formatted = {};
      completedDates.forEach((date) => {
        formatted[date] = {
          customStyles: {
            container: {
              backgroundColor: colors.primary,
              borderRadius: 8,
            },
            text: {
              color: '#fff',
              fontWeight: 'bold',
            },
          },
        };
      });

      setMarkedDates(formatted);
      setLoading(false);
    };

    loadData();
  }, [currentMonth, currentYear]);

  if (loading) {
    return (
      <View
        style={[
          globalStyles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={[globalStyles.title, { textAlign: 'center' }]}>
        Monthly Habit Completion
      </Text>

      <Calendar
        markingType="custom"
        markedDates={markedDates}
        theme={{
          todayTextColor: colors.secondary,
          arrowColor: colors.primary,
          textDayFontWeight: '500',
          textDayHeaderFontWeight: '600',
        }}
      />
    </SafeAreaView>
  );
}
