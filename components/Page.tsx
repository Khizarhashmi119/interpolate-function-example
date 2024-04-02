import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type PageProps = {
  index: number;
  word: string;
  translateX: SharedValue<number>;
};

const { height, width } = Dimensions.get("screen");
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = (props) => {
  const { index, translateX, word } = props;

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const textContainerAnimatedStyles = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      borderRadius,
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const textAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, -0],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      translateX.value,
      inputRange,
      [200, 0, -200],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(99, 99, 252, 0.${index + 2})` },
      ]}
    >
      <Animated.View
        style={[styles.textContainer, textContainerAnimatedStyles]}
      >
        <Animated.Text style={[styles.text, textAnimatedStyles]}>
          {word}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height,
    justifyContent: "center",
    width,
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: "#6363fc",
    height: SIZE,
    justifyContent: "center",
    overflow: "hidden",
    width: SIZE,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
