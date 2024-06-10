import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../componentes/AuthContext';

export const FormularioUsuario: React.FC = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();
    const { token } = useAuth(); // Usando o contexto de autenticação

    const fazerCadastro = async () => {
        try {
            // Fazer a requisição de cadastro
            const response = await axios.post(
                'http://10.0.2.2:8000/api/create_user/',
                {
                    username: usuario,
                    password: senha
                }
            );

            // Se o cadastro for bem-sucedido, navegar para a tela inicial
            navigation.navigate('rotasTab');
        } catch (error) {
            // Se houver um erro no cadastro, você pode exibir uma mensagem de erro
            console.error('Erro de cadastro:', error);
        }
    };

    return (
        <View style={estilos.conteiner}>
            <View style={estilos.conteinerCampos}>
                <TextInput
                    style={estilos.campo}
                    placeholder="Usuário"
                    placeholderTextColor="#01233c"
                    keyboardType="default"
                    onChangeText={setUsuario}
                    value={usuario}
                />
                <TextInput
                    style={estilos.campo}
                    placeholder="Senha"
                    placeholderTextColor="#01233c"
                    secureTextEntry={true}
                    onChangeText={setSenha}
                    value={senha}
                />
            </View>
            <TouchableOpacity style={estilos.botao} onPress={fazerCadastro}>
                <Feather name="user-plus" size={24} color="#dee2e6" />
            </TouchableOpacity>
        </View>
    );
};

const estilos = StyleSheet.create({
    conteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff', // Cor de fundo branca para o container principal
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Sombra no Android
    },
    conteinerCampos: {
        flex: 1,
    },
    campo: {
        height: 50,
        backgroundColor: '#f9f9f9', // Fundo claro para os campos de texto
        color: '#333333',
        marginVertical: 5,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#dddddd', // Cor da borda clara
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1, // Sombra no Android
    },
    botao: {
        width: 50,
        height: 50, // Ajusta a altura do botão
        marginStart: 10,
        backgroundColor: '#000000', // Cor de fundo azul para o botão
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25, // Botão redondo
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Sombra no Android
    },
    icone: {
        color: '#ffffff', // Cor do ícone branca
    },
});