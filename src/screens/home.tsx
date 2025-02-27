import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAPIContext } from "../context/apiContext";
import { capitalizeFirstLetter, formatDate, navigate } from "../utils/helper";
import { AppRoutes } from "../utils/constants";
import { colors } from "../assets/colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utils/dimentions";
import CommonHeader from "../components/commonHeader";
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const { getTaskList, apiloader } = useAPIContext();

  const [taskList, setTaskList] = useState<DataItem[]>();

  const getData = async () => {
    let data = await getTaskList();
    if (data?.data?.length) {
      let modifiedArr = data?.data?.map((e: DataItem) => {
        return { ...e, seemore: false };
      }) as any[];
      setTaskList(modifiedArr);
    }
  };
  
const navigation=useNavigation()
  useEffect(()=>{
    const unsubscribe=navigation.addListener('focus',()=>{
      getData();
    })
    return unsubscribe
  },[])

  const toggleExpand = (id: string) => {
    // Animate the layout change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let result = taskList?.map((e) => {
      if (e._id === id) {
        if (e?.seemore) return { ...e, seemore: false };
        else return { ...e, seemore: true };
      } else return { ...e, seemore: false };
    });
    setTaskList(result);
  };
  return (
    <View style={{ flex: 1 }}>
      <CommonHeader title="Task List" flag={true} logout={true}/>
      {apiloader ? (
        <ActivityIndicator color={colors.primary} size={"large"} />
      ) : (
        <FlatList
          decelerationRate={"normal"}
          refreshControl={
            <RefreshControl
              refreshing={apiloader}
              onRefresh={() => {
                getData();
              }}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={taskList}
          contentContainerStyle={{ padding: moderateScale(10) }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                style={[
                  styles.card,
                  {
                    marginBottom:
                      index === taskList?.length - 1
                        ? verticalScale(70)
                        : verticalScale(10),
                  },
                ]}
                onPress={()=>navigate(AppRoutes.edit,item)}
              >
                <View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <View style={styles.circle}>
                    <View style={styles.innercircle}></View>
                  </View>
                  <View
                    style={[
                      {
                        paddingLeft: 10,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <Text style={[styles.title]}>
                      {capitalizeFirstLetter(item?.title)}
                    </Text>

                    <Text
                      style={[
                        styles.description,
                        {
                          width: horizontalScale(260),
                        },
                      ]}
                    >
                      {item?.seemore
                        ? item?.description
                        : item?.description?.length > 100
                        ? item?.description?.substring(0, 100)
                        : item?.description}
                    </Text>
                    {item?.description?.length > 100 && (
                      <TouchableOpacity onPress={() => toggleExpand(item?._id)}>
                        <Text style={styles.seeMore}>
                          {item?.seemore ? "See less" : "...See more"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <Text
                  style={[
                    {
                      fontSize: moderateScale(10),
                      color: colors.dateColor,
                      textAlign: "right",
                    },
                  ]}
                >
                  {formatDate(item?.createdAt)}
                </Text>
              </Pressable>
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyView />;
          }}
        />
      )}
    </View>
  );
};

export default Home;
const EmptyView = () => {
  return (
    <View style={[styles.container]}>
      <Text
        style={{
          color: colors.primary,
          fontSize: moderateScale(15),
        }}
      >
        No Result Found!
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seeMore: {
    color: colors.primary,
    marginTop: 4,
    fontSize: moderateScale(10),
    paddingHorizontal: 5,
  },
  description: {
    fontSize: moderateScale(11),
    color: colors.dateColor,
    flexShrink: 1,
    width: horizontalScale(280),
    paddingHorizontal: 5,
  },
  title: {
    fontSize: moderateScale(14),
    color: colors.dateColor,
    flexShrink: 1, // Shrink text within its container
    width: horizontalScale(280), // Make sure it respects container width
    paddingHorizontal: 5,
    fontWeight: "700",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: verticalScale(10),
    padding: moderateScale(10),
    flexDirection: "column",
    elevation: 2,
  },
  circle: {
    height: moderateScale(20),
    width: moderateScale(20),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  innercircle: {
    height: moderateScale(5),
    width: moderateScale(5),
    backgroundColor: colors.white,
    borderRadius: moderateScale(2.5),
    justifyContent: "center",
    alignItems: "center",
  },
});
