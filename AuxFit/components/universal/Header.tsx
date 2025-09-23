// * Componente de header de tela. Ele mostra uma seta para retornar à tela anterior, um título, subtítulo e um botão de opções
// TODO adicionar função de abrir opções ao clicar no ícone "more-vert" e adicionar dropdown no título

import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import {useRouter} from 'expo-router'
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

export default function Header(props: any) {
    const router = useRouter() 

  return (
    <View style={styles.wrapper}>
      <View style={styles.containerArrowTitles}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          color={Colors.primary}
          style={{ marginRight: Spacing.md }}
          onPress={() => router.back()} // faz com que independente de onde o componente esteja instanciado, o usuário vai voltar à tela anterior
        />
        <View style={styles.containerTitles}>
          <Text style={Texts.subtitle}>{props.title}</Text>
          <Text style={[Texts.subtext, { color: props.subtitleColor }]}>
            {props.subtitle}
          </Text>
        </View>
      </View>
      <View style={styles.containerTimerIcon}>
        {props.timer && <Text style={[Texts.bodyBold, {marginRight: Spacing.md}]}>00:00</Text>}
        {props.icon && (
          <Pressable>
            <MaterialIcons
              name={props.icon}
              size={32}
              color={props.iconColor}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerArrowTitles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerTitles: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerTimerIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  }
});
