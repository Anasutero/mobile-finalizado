import {View, Text, FlatList, StyleSheet} from 'react-native'
import {Usuario} from './Usuario'

interface UsuarioProps{
    codigo:string;
    nome:string;
     email:string;
     telefone:string;
     usuario:string;
     senha:string;
}

interface ListaUsuariosProps{
    colecao: UsuarioProps[];
    remover:(codigo: string) => void;
}




export const ListaUsuarios = ({colecao, remover}:ListaUsuariosProps) => {

    return(
        <View style={estilos.conteiner}>
  
            <FlatList 
                data={colecao}
                keyExtractor={item => item.codigo}
                renderItem={ ( { item } ) => (
                    <Usuario 
                        nome={item.nome}
                        email={item.email}
                        telefone={item.telefone}
                        usuario={item.usuario}
                        senha={item.senha}
                        excluir={ () => remover(item.codigo) }
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={estilos.texto}>
                        Nenhum usuário armazenado.
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