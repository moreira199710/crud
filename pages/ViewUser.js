import React, { useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase("UserDatabase.db");

const ViewUser = ({ navigation }) => {
    let [UsuarioProcurado, setUsuarioProcurado] = useState('');
    let [usuarioDados, setUsuarioDados] = useState({});

    function procurar_usuario() {
        console.log(UsuarioProcurado);
        setUsuarioDados({});
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT * FROM table_user WHERE user_id = ?",
                [UsuarioProcurado],
                function(tx, res) {
                    console.log('resultados:', res.rows.length);
                    if (res.rows.length) {
                        setUsuarioDados(res.rows.item(0));
                    } else{
                        alert('Contato nao encontrado');
                    }
                }
            )
        });
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <MyTextInput
                        placeholder="Digite um ID"
                        onChangeText={setUsuarioProcurado}
                        style={{ padding: 10 }}
                    />

                    <MyButton
                        title="Procurar Contato"
                        onClick={procurar_usuario}
                    />
                    <View
                        style={{
                            marginHorizontal: 35,
                            marginTop: 10,
                        }}
                    >
                        <Text>ID: { usuarioDados.user_id }</Text>
                        <Text>Nome: { usuarioDados.user_name }</Text>
                        <Text>Email: { usuarioDados.user_email }</Text>
                        <Text>Numero: { usuarioDados.user_numero }</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ViewUser;