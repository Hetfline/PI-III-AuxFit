import { StyleSheet } from "react-native";

export const Colors = {
  bg: "hsl(230, 10%, 5%)",
  bgMedium: "hsl(220, 15%, 12%)",
  bgLight: "hsl(220, 15%, 18%)",
  text: "hsl(0, 0%, 95%)",
  subtext: "hsl(0, 0%, 60%)",
  primary: "hsl(151, 100%, 45%)",
  secondary: "hsl(207, 90%, 54%)",
  accent: "hsl(18, 100%, 60%)",
  border: "hsl(0, 0%, 30%)",
  correct: "hsl(122, 39%, 53%)",
  incorrect: "hsl(4, 90%, 58%)",
  warning: "hsl(36, 100%, 50%)",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 48,
  xxl: 64,
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
    fontSize: 28,
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
