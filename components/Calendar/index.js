import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import styles from "./styles";
export default function Calendar() {
  const presentDateAndTime = new Date(Date.now());
  const [date, setDate] = useState(presentDateAndTime);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (event.type === "set" && mode === "date") {
      setShow(false);
      setMode("time");
      setShow(true);
    } else {
      setDate(presentDateAndTime);
    }
    if (event.type === "set" && mode === "time") {
      const d = new Date(currentDate);
      alert(
        `year ${d.getDate()}/${
          d.getMonth() + 1
        }/${d.getFullYear()} time-${d.getHours()}:${d.getMinutes()}`
      );
      const trigger = new Date(currentDate);
      trigger.setMinutes(0);
      trigger.setSeconds(0);
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Happy new hour!",
        },
        trigger,
      });
      setDate(presentDateAndTime);
      return;
    }
    setShow(false);
  };
  const showDatepicker = () => {
    setShow(true);
    setMode("date");
  };
  return (
    <View style={styles.container}>
      <View>
        <Button onPress={showDatepicker} title="Show date and Time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
