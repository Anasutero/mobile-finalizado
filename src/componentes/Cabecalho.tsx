import { StyleSheet, View, Text } from 'react-native'

//campo que pode ficar vazio , acrescentar uma ? na frente.
interface CabecaclhoProps{
  titulo:string;
  subtitulo?:string;
}

export const Cabecalho = ({titulo, subtitulo}: CabecaclhoProps) => {
  return (
    <View style={estilos.conteiner}>
      <Text style={estilos.texto}>{titulo}</Text>
      { subtitulo ? <Text style={estilos.texto}>{subtitulo}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    backgroundColor: '#f72585',
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%'
  },
  texto: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
  }
});

