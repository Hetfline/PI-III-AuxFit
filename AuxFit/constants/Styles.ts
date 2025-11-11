import { StyleSheet } from "react-native";

export const Colors = {
  bg: "hsla(230, 10%, 8%, 1.0)",
  bgMedium: "hsla(220, 15%, 15%, 1.0)",
  bgLight: "hsla(220, 15%, 25%, 1.0)",
  text: "hsla(0, 0%, 95%, 1.0)",
  subtext: "hsla(0, 0%, 60%, 1.0)",
  primary: "hsla(151, 100%, 45%, 1.0)",
  secondary: "hsla(207, 90%, 54%, 1.0)",
  accent: "hsla(18, 100%, 60%, 1.0)",
  border: "hsla(0, 0%, 30%, 1.0)",
  correct: "hsla(122, 39%, 53%, 1.0)",
  incorrect: "hsla(4, 90%, 58%, 1.0)",
  warning: "hsla(36, 100%, 50%, 1.0)",
  info: "hsla(207, 90%, 54%, 1.0)",
};

export const Spacing = {
  // * Medidas padrão em pt
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 48,
  xxl: 64,

  // * Conversões para px
  // xs: 4 * 1.333,
  // sm: 8 * 1.333,
  // md: 16 * 1.333,
  // lg: 32 * 1.333,
  // xl: 48 * 1.333,
  // xxl: 64 * 1.333,
};

export const Shadows = StyleSheet.create({
  s: {
    backgroundColor: "oklch(0.3 0 264)", // var(--bg-light)
    borderRadius: 16,
    // ---- iOS ----
    shadowColor: "rgba(0, 0, 0, 0.3)", // sombra escura
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // highlight superior (simulação usando borda superior clara)
    borderTopColor: "rgba(255,255,255,0.18)",
    // ---- Android ----
    elevation: 2,
  },
  m: {
    backgroundColor: "oklch(0.3 0 264)",
    borderRadius: 16,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,

    borderTopColor: "rgba(255,255,255,0.3)",
    elevation: 4,
  },
  l: {
    backgroundColor: "oklch(0.3 0 264)",
    borderRadius: 16,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    borderTopColor: "rgba(255,255,255,0.45)",
    elevation: 6,
  },
});

export const Texts = StyleSheet.create({
  title: {
    fontFamily: "MontserratBold",
    fontSize: 22,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: Colors.text,
  },
  body: {
    fontFamily: "MontserratRegular",
    fontSize: 16,
    color: Colors.text,
  },
  bodyBold: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    color: Colors.text,
  },
  subtext: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: Colors.subtext,
  },
  subtextBold: {
    fontFamily: "MontserratBold",
    fontSize: 14,
    color: Colors.subtext,
  },
  navbar: {
    fontFamily: "MontserratBold",
    fontSize: 11,
    color: Colors.text,
  },
  button: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    color: Colors.text,
  },
});
