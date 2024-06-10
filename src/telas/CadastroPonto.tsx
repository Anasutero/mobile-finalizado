import { View, StyleSheet } from "react-native"
import { Cabecalho } from "../componentes/Cabecalho"
import { FormPonto } from "../componentes/Cabecalho"
import 'react-native-get-random-values'

export const CadPonto = () => {

    return (
            <View style={styles.container}>
                <Cabecalho titulo = "Cadastro"/>
                <FormPonto />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})