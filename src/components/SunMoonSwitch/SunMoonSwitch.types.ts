import { ViewStyle } from "react-native";

export interface SunMoonSwitchProps {
  /**
   * Current value of the switch (true = day/light mode, false = night/dark mode)
   * Makes this a controlled component
   */
  value?: boolean;

  /**
   * Callback fired when the switch is pressed
   * @param value - The new value (true for day, false for night)
   */
  onValueChange?: (value: boolean) => void;

  /**
   * Initial value when using as uncontrolled component
   * @default true
   */
  defaultValue?: boolean;

  /**
   * Background color for day/light mode
   * @default "#3686ef"
   */
  dayBackgroundColor?: string;

  /**
   * Background color for night/dark mode
   * @default "#333"
   */
  nightBackgroundColor?: string;

  /**
   * Duration of the animation in milliseconds
   * @default 1500
   */
  animationDuration?: number;

  /**
   * Disable the switch (prevents user interaction)
   * @default false
   */
  disabled?: boolean;

  /**
   * Width of the switch component in pixels
   * Height is automatically calculated to maintain aspect ratio
   * @default 180
   */
  width?: number;

  /**
   * Additional style for the container
   */
  style?: ViewStyle;

  /**
   * Test ID for testing purposes
   */
  testID?: string;
}

