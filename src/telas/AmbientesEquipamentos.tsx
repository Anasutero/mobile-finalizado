import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Cabecalho } from '../componentes/Cabecalho'
import { FormularioAmbienteEquipamento } from '../componentes/FormularioAmbienteEquipamento'
import { ListaAmbienteEquipamento } from "../componentes/ListaAmbienteEquipamento"
import uuid from 'react-native-uuid'

//tipagem com typeScript.

interface AmbienteEquipamentoProps {
    codigo: string;
    descricao: string;
    statusOperacional:string;
    instrucoesSeguranca:string;
    contatoResponsavel:string;
    latitude:string;
    longitude: string;
}

export const AmbientesEquipamentos = () => { 

    const [ambientesEquipamentos, setAmbientesEquipamentos] = useState<AmbienteEquipamentoProps[]>([])

    const adicionarAmbienteEquipamento = (descricao: string, 
                                          statusOperacional:string, 
                                          instrucoesSeguranca:string, 
                                          contatoResponsavel:string,
                                          latitude:string,
                                          longitude:string) => {

        let novoAmbienteEquipamento: AmbienteEquipamentoProps = {
            codigo:String(uuid.v4()) ,
            descricao: descricao,
            statusOperacional: statusOperacional,
            instrucoesSeguranca: instrucoesSeguranca,
            contatoResponsavel: contatoResponsavel,
            latitude: latitude,
            longitude: longitude
        } 

        setAmbientesEquipamentos([...ambientesEquipamentos, novoAmbienteEquipamento])
    }


    const removerAmbienteEquipamento = (codigo:string) => {

        setAmbientesEquipamentos( ambientesEquipamentos.filter(
            ambienteEquipamento => ambienteEquipamento.codigo !== codigo
        ) )
    }

    return(
        <View style={estilos.conteiner}>

            <Cabecalho 
                titulo="Cadastro de ambientes ou equipamentos"
            />

            <FormularioAmbienteEquipamento 
                adicionar={adicionarAmbienteEquipamento}
            />  

            <ListaAmbienteEquipamento 
                colecao={ambientesEquipamentos}
                remover={removerAmbienteEquipamento}
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