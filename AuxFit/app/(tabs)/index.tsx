// Essa é a tela Home. Como a Home do app não terá subtelas, o arquivo index pode ser a própria Home, ao invés de criar uma subpasta dentro da pasta "tabs"

import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import Texts from '@/constants/Texts';

export default function TabOneScreen() {
  
  return (
    
    <View style={styles.container}>
      <Text style={Texts.title}>LOGIN</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
