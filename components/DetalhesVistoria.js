// Detalhes.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetalhesVistoria({ route }) {
    const { vistoria } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modelo: {vistoria.modelo}</Text>
            <Text>Data: {vistoria.data.toDate().toLocaleDateString()}</Text>
            <Text>Local: {vistoria.local}</Text>
            <Text>Responsável: {vistoria.responsavel}</Text>
            <Text>Aprovado: {vistoria.aprovado ? 'Sim' : 'Não'}</Text>
            <Text>Observações: {vistoria.observacoes}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
