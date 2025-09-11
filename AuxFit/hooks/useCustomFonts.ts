import { useFontes } from 'expo-font';

export function useCustomFonts() {
    const [fontsLoaded] = useFonts( {
        // importa só o Varieble Normal
        Montserrat: require('../../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    });
    
    return fontsLoaded;
}