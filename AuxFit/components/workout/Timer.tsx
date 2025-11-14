import React, { useEffect, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Texts } from '@/constants/Styles'; 

interface TimerProps {
    timeInSeconds: number;
    isRunning: boolean;
    // * "Essa linha de código é a forma correta de usar TypeScript para descrever uma função que altera o estado no React". Palavras do Gemini, eu não entendi nada de como funciona, mas se tirar essa linha não roda :P
    setTimeInSeconds: Dispatch<SetStateAction<number>>;
}

export default function Timer({ timeInSeconds, isRunning, setTimeInSeconds }: TimerProps) {

    // --- Lógica do Timer ---
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                // Incrementa o tempo em 1 segundo
                setTimeInSeconds((prev: number) => prev + 1);
            }, 1000);
        } else if (interval) {
            clearInterval(interval); 
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, setTimeInSeconds]); 

    // --- Função de Formatação (HH:MM:SS) ---
    const formatTime = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Função auxiliar para padding
        const pad = (num: number): string => num.toString().padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return (
        <View style={styles.containerTimerIcon}>
            <Text style={[Texts.title, { color: Colors.secondary }]}>
                {formatTime(timeInSeconds)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTimerIcon: {
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
});
