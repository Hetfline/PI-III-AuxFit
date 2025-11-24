import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import InputField from "@/components/universal/InputField";
import Markdown from "react-native-markdown-display";
import { MaterialIcons } from "@expo/vector-icons";

// * Interface para o objeto de mensagem
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}
const N8N_URL = "http://192.168.89.122:5678/webhook-test/gerar-treino";

async function sendMessageToBot(message: string, sessionId: string) {
  try {
    const response = await fetch(N8N_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Olá! Eu sou seu assistente AuxFit 👋", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const flatListRef = React.useRef<FlatList<Message>>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: false });
  }, []);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsLoading(true);

    setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const botResponse = await sendMessageToBot(userMessage, "user123");

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: botResponse,
          sender: "bot",
        },
      ]);
      
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

    } catch (error) {
      Alert.alert(
        "Erro de Conexão",
        "Não foi possível conectar ao assistente. Verifique se o n8n está rodando e se o IP está correto."
      );
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Desculpe, ocorreu um erro ao processar sua mensagem. 😔",
          sender: "bot",
        },
      ]);
      
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userMsg : styles.botMsg,
      ]}
    >
      {/* Container pra quando o bot mandar a mensagem */}
      {item.sender === "bot" ? (
        <Markdown
          style={{
            body: {
              color: Colors.text,
              fontSize: Texts.body.fontSize,
              fontFamily: Texts.body.fontFamily,
            },
            strong: {
              fontWeight: "bold",
              color: Colors.text,
            },
            paragraph: {
              marginTop: 0,
              marginBottom: 8,
              flexShrink: 1,
            },
            text: {
              flexWrap: 'wrap',
            }
          }}
        >
          {item.text}
        </Markdown>
      ) : (
        <Text style={[Texts.body, styles.userText, styles.messageTextContent]}> 
          {item.text}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.bg }]}>
      <Background />

      <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <View style={styles.header}>
          <MaterialIcons name="smart-toy" size={24} color={Colors.text} />
          <Text style={[Texts.title, { color: Colors.text }]}>AuxBot</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          inverted={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <View style={styles.inputContainer}>
          <InputField
            placeholder={isLoading ? "Aguardando resposta..." : "Digite sua mensagem..."}
            placeholderTextColor={Colors.subtext}
            value={inputText}
            onChangeText={setInputText}
            onIconPress={handleSend}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            editable={!isLoading}
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
    paddingHorizontal: Spacing.md,
  },
  header: {
    paddingVertical: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    gap: Spacing.sm
  },
  flatListContent: {
    paddingBottom: Spacing.md,
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
    // 💡 Adicionado flexShrink para a bolha
    flexShrink: 1, 
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
    borderTopRightRadius: 5,
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: Colors.bgLight,
    borderTopLeftRadius: 5,
  },
  userText: {
    color: Colors.bg,
  },
  botText: { // Este estilo não está sendo usado diretamente no Markdown, mas mantido.
    color: Colors.text,
  },
  // 💡 Novo estilo para garantir a quebra de palavras dentro do Text
  messageTextContent: {
    flexShrink: 1, // Permite que o texto encolha e quebre
    // wordBreak: 'break-word', // Mais relevante para web, mas pode ser adicionado
    // overflow: 'hidden', // Geralmente não necessário com flexShrink 
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.sm,
    backgroundColor: Colors.bg,
  },
});