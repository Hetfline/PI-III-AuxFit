import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

export type TabType = 'home' | 'workout' | 'chat' | 'diet' | 'profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  
  const tabsConfig = [
    {
      id: 'home' as TabType,
      icon: require('../assets/icons/bottomTabBar/iconsDisabled/home.svg'),
    },
    {
      id: 'workout' as TabType,
      icon: require('../assets/icons/bottomTabBar/iconsDisabled/workout.svg'),
    },
    {
      id: 'chat' as TabType,
      icon: require('../assets/icons/bottomTabBar/iconsDisabled/chat.svg'),
    },
    {
      id: 'diet' as TabType,
      icon: require('../assets/icons/bottomTabBar/iconsDisabled/diet.svg'),
    },
    {
      id: 'profile' as TabType,
      icon: require('../assets/icons/bottomTabBar/iconsDisabled/profile.svg'),
    },
  ];

  const handleTabPress = (tabId: TabType) => {
    onTabChange(tabId);
  };

  const renderTabItem = (tab: { id: TabType; icon: any }) => {
    // Verifica se esta aba é a aba ativa
    const isActive = tab.id === activeTab;
    
    return (
      <TouchableOpacity
        key={tab.id}
        style={[
          styles.tabItem,
          isActive && styles.activeTabItem
        ]}
        onPress={() => handleTabPress(tab.id)}
        activeOpacity={ACTIVE_OPACITY}
      >
        {/* Container do ícone - usado para fazer o círculo ao redor do ícone ativo */}
        <View style={[
          styles.iconContainer,                    // Estilo base do container
          isActive && styles.activeIconContainer   // Se ativa, adiciona o círculo brilhante
        ]}>
          {/* O ícone em si */}
          <Image
            source={tab.icon}    // Carrega a imagem do ícone
            style={[
              styles.tabIcon,                // Estilo base do ícone
              isActive && styles.activeTabIcon // Se ativa, muda a cor
            ]}
            resizeMode="contain"   // Faz o ícone caber sem distorcer
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundOverlay} />
      
      {/* 
        OPCIONAL: Imagem de fundo
        Se você quiser usar uma imagem de fundo em vez de cor sólida,
        descomente o código abaixo e adicione a imagem em assets/images/
      */}
      {/* 
      <Image
        source={require('../../assets/images/tab-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      */}
      
      {/* Container que organiza todas as abas em uma linha horizontal */}
      <View style={styles.tabsContainer}>
        {/* 
          .map() percorre cada aba da configuração e cria um botão para ela
          Para cada aba em tabsConfig, chama renderTabItem para criar o botão
        */}
        {tabsConfig.map(renderTabItem)}
      </View>
    </View>
  );
};

const TAB_BAR_HEIGHT = 85;        // Altura da barra (em pixels)
const ICON_SIZE = 26;             // Tamanho dos ícones (em pixels)
const ICON_CONTAINER_SIZE = 50;   // Tamanho do círculo ao redor do ícone ativo
const ACTIVE_OPACITY = 0.8;       // Transparência quando o botão é pressionado (0-1)

// ========================================
// ESTILOS DO COMPONENTE
// ========================================

const styles = StyleSheet.create({
  /**
   * container: Estilo principal da barra de navegação
   * PARA MUDAR A ALTURA: altere TAB_BAR_HEIGHT acima
   */
  container: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'transparent', // Transparente para mostrar o overlay
    position: 'relative',
  },
  
  /**
   * backgroundOverlay: Cria o fundo escuro semitransparente da barra
   * PARA MUDAR A COR DE FUNDO: altere backgroundColor aqui
   * PARA MUDAR A COR DA BORDA: altere borderTopColor
   */
  backgroundOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(13, 13, 13, 0.95)', // Fundo escuro (quase preto)
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 255, 247, 0.15)', // Borda superior cyan clara
  },
  
  /**
   * backgroundImage: Estilo para imagem de fundo (se usar)
   * Comentado por padrão - descomente se quiser usar imagem
   */
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8, // Deixa a imagem um pouco transparente
  },
  
  /**
   * tabsContainer: Container que organiza as abas em linha horizontal
   * justify-content: 'space-around' distribui as abas uniformemente
   */
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',        // Coloca as abas lado a lado
    alignItems: 'center',        // Centraliza verticalmente
    justifyContent: 'space-around', // Distribui uniformemente
    paddingHorizontal: 12,       // Espaçamento das bordas
    paddingVertical: 10,         // Espaçamento superior/inferior
    zIndex: 1,                   // Garante que fica por cima do background
  },
  
  /**
   * tabItem: Estilo de cada botão de aba
   * flex: 1 faz cada aba ocupar o mesmo espaço
   */
  tabItem: {
    flex: 1,                     // Cada aba ocupa espaço igual
    alignItems: 'center',        // Centraliza o ícone horizontalmente
    justifyContent: 'center',    // Centraliza o ícone verticalmente
    paddingVertical: 5,          // Espaçamento interno vertical
  },
  
  /**
   * activeTabItem: Estilo adicional para a aba ativa
   * Atualmente vazio - você pode adicionar animações aqui se quiser
   */
  activeTabItem: {
    // Adicione estilos extras para a aba ativa aqui se necessário
  },
  
  /**
   * iconContainer: Container ao redor do ícone (para fazer o círculo)
   * PARA MUDAR O TAMANHO DO CÍRCULO: altere ICON_CONTAINER_SIZE
   */
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ICON_CONTAINER_SIZE / 2, // Faz ficar redondo
    backgroundColor: 'transparent',         // Transparente por padrão
  },
  
  /**
   * activeIconContainer: Estilo do círculo quando a aba está ativa
   * PARA MUDAR A COR DO CÍRCULO ATIVO: altere backgroundColor
   * PARA MUDAR A COR DA BORDA: altere borderColor
   * PARA MUDAR O BRILHO: altere shadowColor e shadowOpacity
   */
  activeIconContainer: {
    backgroundColor: 'rgba(0, 255, 247, 0.1)', // Fundo cyan claro
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.3)',     // Borda cyan
    // Efeito de brilho (glow)
    shadowColor: '#00FFF7',      // Cor do brilho
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,          // Intensidade do brilho
    shadowRadius: 8,             // Tamanho do brilho
    elevation: 5,                // Sombra no Android
  },
  
  /**
   * tabIcon: Estilo dos ícones
   * PARA MUDAR O TAMANHO DOS ÍCONES: altere ICON_SIZE
   * PARA MUDAR A COR DOS ÍCONES INATIVOS: altere tintColor
   */
  tabIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    tintColor: '#666666', // Cor cinza para ícones inativos
  },
  
  /**
   * activeTabIcon: Estilo do ícone quando a aba está ativa
   * PARA MUDAR A COR DO ÍCONE ATIVO: altere tintColor
   */
  activeTabIcon: {
    tintColor: '#00FFF7', // Cor cyan para ícone ativo (mesmo tema do app)
  },
});

// Exporta o componente para ser usado em outros arquivos
export default BottomTabBar;