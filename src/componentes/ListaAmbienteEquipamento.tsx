import {View, Text, FlatList, StyleSheet} from 'react-native'
import {AmbienteEquipamento} from './AmbienteEquipamento'

//tudo oq ta aqui e props
interface AmbienteEquipamentoProps{
    codigo:string,
    descricao: string;
    statusOperacional:string;
    instrucoesSeguranca:string;
    contatoResponsavel:string;
    latitude:string;
    longitude: string;
}

interface ListaAmbienteEquipamentoProps{
    colecao: AmbienteEquipamentoProps[];
    remover:(codigo: string) => void;
}


//colecao: e um vetor de ambientes.
export const ListaAmbienteEquipamento = ({colecao, remover}:ListaAmbienteEquipamentoProps) => {

    return(
        <View style={estilos.conteiner}>
  
            <FlatList 
                data={colecao}
                keyExtractor={item => item.codigo}
                renderItem={ ( { item } ) => (
                    <AmbienteEquipamento 
                        descricao={item.descricao}
                        statusOperacional={item.statusOperacional}
                        instrucoesSeguranca={item.instrucoesSeguranca}
                        contatoResponsavel={item.contatoResponsavel}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        excluir={ () => remover(item.codigo) }
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={estilos.texto}>
                        Nenhum ambiente ou equipamento armazenado.
                    </Text>
                )}                
            />

        </View>
    )
}


const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    texto: {
        color: '#fff',
        textAlign: 'center'
    }
})