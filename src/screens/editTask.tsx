import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import CommonHeader from "../components/commonHeader";
import { Button, TextInput } from "react-native-paper";
import { moderateScale, verticalScale } from "../utils/dimentions";
import { colors } from "../assets/colors";
import { useAPIContext } from "../context/apiContext";

const EditTask = ({ route }: { route: any }) => {
  const [detail, setDetail] = React.useState<DataItem>();

  useEffect(() => {
    if (route.params) {
      setDetail(route.params);
    }
  }, [route]);
  const { deleteTask, updateList, apiloader, createTaskList } = useAPIContext();
  return (
    <View style={{ flex: 1 }}>
      <CommonHeader title="Edit Your Task" flag={false} logout={false}/>
      <View style={styles.container}>
        <TextInput
          label={"Title"}
          mode="flat"
          style={[styles.input1, {}]}
          value={detail?.title}
          onChangeText={(text) => setDetail({ ...detail, title: text })}
          dense
          underlineColor="#000"
          activeUnderlineColor="#000"
          underlineStyle={{ height: 0.5 }}
          textColor={colors.dateColor}
        />
        <TextInput
          label={"Describe Items"}
          mode="flat"
          style={[styles.input2, {}]}
          value={detail?.description}
          onChangeText={(text) => setDetail({ ...detail, description: text })}
          dense
          underlineColor="#000"
          activeUnderlineColor="#000"
          underlineStyle={{ height: 0.5 }}
          textColor={colors.dateColor}
          numberOfLines={10}
        />
      </View>
      {route?.params ? (
        <View style={styles.subcontainer}>
          <Button
            icon="delete"
            mode="contained"
            onPress={() => deleteTask(detail._id)}
            style={{ backgroundColor: colors.primary }}
            disabled={apiloader}
          >
            Delete
          </Button>
          <Button
            icon="update"
            mode="contained"
            onPress={() =>
              updateList({
                id: detail._id,
                title: detail.title,
                description: detail.description,
              })
            }
            style={{ backgroundColor: colors.primary }}
            disabled={apiloader}
          >
            Update
          </Button>
        </View>
      ) : (
        <View style={styles.subcontainer}>
          <Button
            // icon="a"
            mode="contained"
            onPress={() =>
              createTaskList({
                title: detail.title,
                description: detail.description,
              })
            }
            style={{ backgroundColor: colors.primary }}
            disabled={apiloader}
            loading={apiloader}
          >
            CREATE TASK
          </Button>
        </View>
      )}
    </View>
  );
};

export default EditTask;
const styles = StyleSheet.create({
  subcontainer: {
    flex: 0.3,
    padding: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input2: {
    paddingLeft: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    fontSize: moderateScale(16),
    backgroundColor: "#d2e3f3",
    color: colors.dateColor,
    paddingVertical: 4,
    paddingRight: 20,
    height: verticalScale(150),
    marginTop: 20,
    textAlign: "left",
  },
  input1: {
    paddingLeft: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    fontSize: moderateScale(16),
    backgroundColor: "#d2e3f3",
    color: colors.dateColor,
    paddingVertical: 4,
    paddingRight: 20,
    height: verticalScale(50),
    marginTop: 20,
    textAlign: "left",
  },
  container: {
    flex: 0.7,
    padding: moderateScale(10),
    // justifyContent: "flex-start",
    // alignItems: "center",
    // flexDirection: "column",
  },
});
