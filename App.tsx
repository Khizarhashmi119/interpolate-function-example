import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Page from "./components/Page";

const WORDS = ["Subhan-Allah", "Alhamdulillah", "Allah-u-Akbar"];

export default function App() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.FlatList
        data={WORDS}
        renderItem={({ index, item: word }) => (
          <Page
            key={`${word}-${index}`}
            index={index}
            translateX={translateX}
            word={word}
          />
        )}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
      />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
