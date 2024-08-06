import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from '../db/firebase';

const Card = ({ vistoria }) => {
    // Convertendo Timestamp para uma string legível
    const data = vistoria.data.toDate().toLocaleDateString();
    
    if(!vistoria.aprovado){
        return (
            <View style={styles.card}>
                <Text style={styles.title}>Modelo: {vistoria.modelo}</Text>
                <Text>Data: {data}</Text>
                <Text>Local: {vistoria.local}</Text>
                <Text>Responsável: {vistoria.responsavel}</Text>
                <Text>Aprovado: {vistoria.aprovado ? 'Sim' : 'Não'}</Text>
                <Text>Observações: {vistoria.observacoes}</Text>
            </View>
        );
    }
};

export default function Pendentes() {
    const [vistorias, setVistorias] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "vistorias"), (snapshot) => {
            const vistoriasArray = [];
            snapshot.forEach((doc) => {
                vistoriasArray.push({ id: doc.id, ...doc.data() });
            });
            setVistorias(vistoriasArray);
        }, (error) => {
            console.error("Erro ao buscar as vistorias: ", error);
        });

        // Limpeza ao desmontar o componente
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {vistorias.map((vistoria, index) => (
                    <Card key={index} vistoria={vistoria} />
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
