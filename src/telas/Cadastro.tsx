import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cabecalho } from '../componentes/Cabecalho';
import { FormularioUsuario } from '../componentes/FormularioUsuario';


export const Cadastro = () => {
    return (
        <>
            <Cabecalho titulo="Cadastro" />
            <View style={estilos.conteiner}>
                <FormularioUsuario />
            </View>
        </>
    );
};

const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#f72585',
        alignItems: 'center',
        justifyContent: 'center'
    }
});