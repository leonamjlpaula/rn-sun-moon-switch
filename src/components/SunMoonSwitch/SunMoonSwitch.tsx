import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  Easing,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";
import { Clouds } from "./clouds";
import {
  BORDER_WIDTH,
  DAY_BACKGROUND,
  NIGHT_BACKGROUND,
  WIDTH,
} from "./constants";
import { SunMoon } from "./sunMoon";
import { Star } from "./star";
import { SunMoonSwitchProps } from "./SunMoonSwitch.types";

const SunMoonSwitch: React.FC<SunMoonSwitchProps> = ({
  value,
  onValueChange,
  defaultValue = true,
  dayBackgroundColor = DAY_BACKGROUND,
  nightBackgroundColor = NIGHT_BACKGROUND,
  animationDuration = 1500,
  disabled = false,
  width = WIDTH,
  style,
  testID,
}) => {
  // Support both controlled and uncontrolled modes
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const isDay = isControlled ? value : internalValue;

  const transition = useSharedValue(isDay ? 0 : 1);

  // Calculate dimensions based on width (maintain aspect ratio)
  const componentWidth = width;
  const componentHeight = useMemo(() => {
    // Original aspect ratio is WIDTH:HEIGHT (180:60 = 3:1)
    return width / 3;
  }, [width]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: componentWidth,
          height: componentHeight,
          alignItems: "center",
          borderRadius: componentHeight / 2,
          overflow: "hidden",
          borderWidth: BORDER_WIDTH,
          borderColor: "#AAA",
          opacity: disabled ? 0.5 : 1,
        },
        starsContainer: {
          position: "absolute",
          width: componentWidth,
          height: componentHeight,
        },
      }),
    [componentWidth, componentHeight, disabled]
  );

  const timingConfig = useMemo(
    () => ({
      duration: animationDuration,
      easing: Easing.inOut(Easing.cubic),
    }),
    [animationDuration]
  );

  useEffect(() => {
    if (isDay) transition.value = withTiming(0, timingConfig);
    else transition.value = withTiming(1, timingConfig);
  }, [isDay, timingConfig]);

  const backgroundAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      transition.value,
      [0, 1],
      [dayBackgroundColor, nightBackgroundColor]
    ),
  }));

  const yTranslateAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          transition.value,
          [0, 1],
          [-componentHeight, 0]
        ),
      },
    ],
  }));

  const handlePress = () => {
    if (disabled) return;

    const newValue = !isDay;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onValueChange?.(newValue);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      testID={testID}
      style={style}
    >
      <Animated.View style={[styles.container, backgroundAnimation]}>
        <Animated.View style={[styles.starsContainer, yTranslateAnimation]}>
          <Star
            size={0.2 * componentHeight}
            top={0.33 * componentHeight}
            left={0.2 * componentWidth}
            transition={transition}
          />
          <Star
            size={0.083 * componentHeight}
            top={0.1667 * componentHeight}
            left={0.155 * componentWidth}
            transition={transition}
          />
          <Star
            size={0.083 * componentHeight}
            top={0.5 * componentHeight}
            left={0.278 * componentWidth}
            transition={transition}
          />
          <Star
            size={0.133 * componentHeight}
            top={0.667 * componentHeight}
            left={0.278 * componentWidth}
            transition={transition}
          />
          <Star
            size={0.133 * componentHeight}
            top={0.25 * componentHeight}
            left={0.444 * componentWidth}
            transition={transition}
          />
        </Animated.View>
        <Clouds transition={transition} />
        <SunMoon transition={transition} />
      </Animated.View>
    </Pressable>
  );
};

export default SunMoonSwitch;
