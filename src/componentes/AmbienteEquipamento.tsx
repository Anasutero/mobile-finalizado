import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { Feather } from '@expo/vector-icons'

//type script:serve para definir os tipos
interface AmbienteEquipamentoProps {
    descricao: string;
    statusOperacional:string;
    instrucoesSeguranca:string;
    contatoResponsavel:string;
    latitude:string;
    longitude: string;
    excluir: () => void
}


export const AmbienteEquipamento = ({descricao, 
                                     statusOperacional, 
                                     instrucoesSeguranca, 
                                     contatoResponsavel,
                                     latitude,
                                     longitude, 
                                     excluir}: AmbienteEquipamentoProps) => {
    return(
        <View style={estilos.conteiner}>

            <View style={estilos.conteinerUsuario}>
                <Text style={estilos.texto}>Descrição: {descricao}</Text>
                <Text style={estilos.texto}>Status: {statusOperacional}</Text>
                <Text style={estilos.texto}>Segurança: {instrucoesSeguranca}</Text>
                <Text style={estilos.texto}>Responsável: {contatoResponsavel}</Text>
                <Text style={estilos.texto}>Latitude: {latitude}</Text>
                <Text style={estilos.texto}>Longitude: {longitude}</Text>
            </View>

            <TouchableOpacity 
                style={estilos.botao}
                onPress={excluir}
            >
                <Text>
                    <Feather 
                        name="user-minus" 
                        size={24} 
                        color='#dee2e6' 
                    />                
                </Text>
            </TouchableOpacity>            

        </View>
    )
}


const estilos = StyleSheet.create({
    conteiner: {
        flexDirection: 'row',
        margin: 5,
        borderRadius: 5,
    },
    conteinerUsuario: {
        flex: 1,
        paddingStart: 10,
        paddingVertical: 10,
        backgroundColor: '#dee2e6',
        borderRadius: 5,
    },    
    texto: {
        color: '#010228',
        fontSize: 16,
        fontWeight: '500'
    },
    botao: {
        width: 60,
        marginStart: 10,
        backgroundColor: '#f72585',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    
})