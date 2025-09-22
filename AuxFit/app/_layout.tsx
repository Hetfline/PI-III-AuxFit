import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import {Colors, Spacing, Texts} from "@/constants/Styles";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
    MontserratLightItalic: require("@/assets/fonts/Montserrat-LightItalic.ttf"),
    ...FontAwesome.font,
  });

   // Estado de autenticação fictício. Em produção, use um Context ou Redux.
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav isAuthenticated={isAuthenticated} />;
}

// Função com os props de autentificação EM PRODUÇÃO
function RootLayoutNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Stack>
      {/* Se não está autenticado, redirecione para a tela de login */}
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <>
          {/* Se está autenticado, renderize as tabs */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> {/* o valor original entre os parênteses é (app)*/}
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </>
      )}
    </Stack>
  );
}
