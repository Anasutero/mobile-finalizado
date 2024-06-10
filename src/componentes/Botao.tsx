import { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'


interface BotaoProps{
  texto:string;
}

export const Botao = ({texto}: BotaoProps) => {

  // State
  const [cliques, setCliques] = useState(0)

  // Funcioanlidade do componente
  const contarCliques = () => {
    setCliques(cliques + 1)
    console.log(cliques)
  }

  // Estrutura
  return (
    <TouchableOpacity 
      style={estilos.conteiner}
      onPress={contarCliques}
    >
      <Text style={estilos.texto}>{texto} ({cliques})</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    backgroundColor: '#f72585',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 150,
    marginTop: 24,    
    marginStart: 24,    
    borderRadius: 12,
    borderColor: '#ffb3c6',
    borderWidth: 1
  },
  texto: {
    color: '#fff',
    fontSize: 20,
  }
});

