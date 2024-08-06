import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from '../db/firebase';

const Card = ({ testess }) => (
    <View style={styles.card}>
        <Text style={styles.title}>Nome: {testess.nome}</Text>
    </View>
);

export default function Tasks() {
    const [teste, setTeste] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "teste"), (snapshot) => {
            const testesArray = [];
            snapshot.forEach((doc) => {
                testesArray.push({ id: doc.id, ...doc.data() });
            });
            setTeste(testesArray);
        }, (error) => {
            console.error("Erro ao buscar os testes: ", error);
        });

        // Limpeza ao desmontar o componente
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {teste.map((teste, index) => (
                    <Card key={index} testess={teste} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    }
});
