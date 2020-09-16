import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase("UserDatabase.db");

const ViewAllUser = ({ navigation }) => {
    let [listaUsuario, setListaUsuario] = useState([]);
    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT * FROM table_user",
                [],
                function(tx, res){
                    console.log('resultado:', res.rows.length);
                    let novaLista = []
                    for (let i = 0; i < res.rows.length; i++) {
                        novaLista.push(res.rows.item(i));
                    }
                    setListaUsuario(novaLista);
                }
            )
        });
    }, [])

    function listItemSeparator() {
        return (
            <View
                style={{ height: 0.2, width: '100%', backgroundColor: '#808080'}}
            />
        )
    }

    function listItemRender(item){
        return (
            <View
                key={item.user_id}
                style={{ backgroundColor: 'white', padding: 20 }}
            >
                <Text>ID: { item.user_id }</Text>
                <Text>Nome: { item.user_name }</Text>
                <Text>Email: { item.user_email }</Text>
                <Text>Numero: { item.user_number }</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={listaUsuario}
                        ItemSeparatorComponent={listItemSeparator}
                        KeyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemRender(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ViewAllUser;