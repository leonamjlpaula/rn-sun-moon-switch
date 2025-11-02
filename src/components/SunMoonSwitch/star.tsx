import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  AnimatedStyle,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { DAY_BACKGROUND, NIGHT_BACKGROUND } from "./constants";

export const Star = ({
  size,
  top,
  left,
  transition,
}: {
  size: number;
  top: number;
  left: number;
  transition: SharedValue<number>;
}) => {
  const backgroundAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      transition.value,
      [0, 1],
      [DAY_BACKGROUND, NIGHT_BACKGROUND]
    ),
  }));

  const container = useMemo<ViewStyle>(
    () => ({
      width: size,
      height: size,
      position: "absolute",
      top,
      left,
      backgroundColor: "white",
      overflow: "hidden",
    }),
    []
  );

  const circle1 = useMemo<AnimatedStyle<ViewStyle>>(
    () => ({
      width: size,
      height: size,
      position: "absolute",
      top: -size / 2,
      left: -size / 2,
      borderRadius: size / 2,
    }),
    []
  );
  const circle2 = useMemo<AnimatedStyle<ViewStyle>>(
    () => ({
      width: size,
      height: size,
      position: "absolute",
      top: -size / 2,
      right: -size / 2,
      borderRadius: size / 2,
    }),
    []
  );
  const circle3 = useMemo<AnimatedStyle<ViewStyle>>(
    () => ({
      width: size,
      height: size,
      position: "absolute",
      bottom: -size / 2,
      left: -size / 2,
      borderRadius: size / 2,
    }),
    []
  );
  const circle4 = useMemo<AnimatedStyle<ViewStyle>>(
    () => ({
      width: size,
      height: size,
      position: "absolute",
      bottom: -size / 2,
      right: -size / 2,
      borderRadius: size / 2,
    }),
    []
  );

  return (
    <View style={container}>
      <Animated.View style={[circle1, backgroundAnimation]} />
      <Animated.View style={[circle2, backgroundAnimation]} />
      <Animated.View style={[circle3, backgroundAnimation]} />
      <Animated.View style={[circle4, backgroundAnimation]} />
    </View>
  );
};
