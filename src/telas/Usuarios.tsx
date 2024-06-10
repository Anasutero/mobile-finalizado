import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Cabecalho } from '../componentes/Cabecalho'
import { FormularioUsuario } from '../componentes/FormularioUsuario'
import { ListaUsuarios } from "../componentes/ListaUsuarios"
import uuid from 'react-native-uuid'

interface UsuarioProps{
    codigo:string;
    nome:string;
     email:string;
     telefone:string;
     usuario:string;
     senha:string;
}


export const Usuarios = () => { 

    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([])

    const adicionarUsuario = (nome:string, 
        email:string, 
        telefone:string, 
        usuario:string, 
        senha:string) => {

        let novoUsuario: UsuarioProps = {
            codigo: String(uuid.v4()),
            nome: nome,
            email: email,
            telefone: telefone,
            usuario: usuario,
            senha: senha
        } 

        setUsuarios([...usuarios, novoUsuario])
    }


    const removerUsuario = (codigo:string) => {

        setUsuarios( usuarios.filter(
            usuario => usuario.codigo !== codigo
        ) )
    }

    return(
        <View style={estilos.conteiner}>

            <Cabecalho 
                titulo="Cadastro de usuários"
            />

            <FormularioUsuario 
                adicionar={adicionarUsuario}
            />  

            <ListaUsuarios 
                colecao={usuarios}
                remover={removerUsuario}
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    conteiner: {
      flex: 1,
      backgroundColor: '#080a0c'
    },
  });