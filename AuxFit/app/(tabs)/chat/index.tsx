import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import InputField from "@/components/universal/InputField";

// * Interface para o objeto de mensagem
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Olá! Eu sou seu assistente AuxFit 👋", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
    };

    // Adiciona a mensagem do usuário e rola para o final
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simular resposta da IA (temporário)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: "Entendi! 💪", sender: "bot" },
      ]);
    }, 800);
  };

  // Renderiza cada item de mensagem na FlatList
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userMsg : styles.botMsg,
      ]}
    >
      <Text
        style={[
          Texts.body,
          item.sender === "user" ? styles.userText : styles.botText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.bg }]}>
      <Background />

      <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.keyboardAvoidingView}
        // Tente aumentar este valor no iOS para compensar a SafeArea
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        {/* Cabeçalho e Título */}
        <View style={styles.header}>
          <Text style={[Texts.title, { color: Colors.text }]}>🤖 Chat IA</Text>
          <Text style={[Texts.subtitle, { color: Colors.text }]}>
            Seu assistente fitness inteligente
          </Text>
        </View>

        {/* Lista de Mensagens */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          // Garante que a FlatList comece a renderização no final
          inverted={false}
        />
        
        <View style={styles.inputContainer}>

          <InputField
            placeholder="Digite sua mensagem..."
            placeholderTextColor={Colors.subtext}
            value={inputText}
            onChangeText={setInputText}
            onIconPress={handleSend}
            onSubmitEditing={handleSend} // Permite enviar com o Enter/Done
            returnKeyType="send"
            message
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    paddingHorizontal: Spacing.md, // Aplicando o padding horizontal aqui
  },
  header: {
    paddingVertical: Spacing.lg,
    alignItems: "center",
  },
  flatListContent: {
    paddingBottom: Spacing.md, // Espaço no final da lista
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 20,
    padding: Spacing.sm,
    marginVertical: Spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary, // Cor Primária
    // Ajustando a borda do lado do usuário
    borderTopRightRadius: 5,
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: Colors.bgLight, // Cor de fundo clara para bot
    // Ajustando a cor do texto do bot
    borderTopLeftRadius: 5,
  },
  userText: {
    color: Colors.bg, // Texto branco sobre cor primária
  },
  botText: {
    color: Colors.text, // Texto escuro sobre fundo claro
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.sm,
    backgroundColor: Colors.bg, // Fundo do input container para cobrir o conteúdo ao subir
  },
});
