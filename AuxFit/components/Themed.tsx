/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText} from "react-native";

import {Colors, Spacing, Texts} from "@/constants/Styles";

export type TextProps = DefaultText["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = Colors.text;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
