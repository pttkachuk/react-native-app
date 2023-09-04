import { Image, View, Text, StyleSheet } from "react-native";
import moment from "moment";
import "moment/locale/uk";
import React from "react";
import Test from "../images/forest.jpg";

const CommentComponent = () => {
  const date = new Date().getTime();
  return (
    <View style={styles.container}>
      <Image source={Test} />
      <View style={styles.comContainerontainer}>
        <Text style={styles.text}>Коментар...</Text>
        <Text style={styles.date}>
          {moment(date).locale("uk").format("DD MMMM, YYYY | HH:mm")}
        </Text>
      </View>
    </View>
  );
};

export default CommentComponent;
const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 16, marginBottom: 24 },
  comContainer: {
    flexShrink: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#00000008",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  text: {
    marginBottom: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  date: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
    textAlign: "right",
  },
});
