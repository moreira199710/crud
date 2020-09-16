import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import MyButton from '../components/MyButton';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase("UserDatabase.db");

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res){
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0){
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(50), user_email VARCHAR(70), user_namber INT(12))',
                            []
                        );
                    }
                },
                function (error){
                    console.log(error);
                }
            )
        });
    },[]);
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <MyButton
                    title="Criar"
                    onClick={ () => navigation.navigate('Criar') }
                />
                <MyButton
                    title="Deletar"
                    onClick={ () => navigation.navigate('Deletar') }
                />
                <MyButton
                    title="Atualizar"
                    onClick={ () => navigation.navigate('Atualizar') }
                />
                <MyButton
                    title="Visualizar Todos"
                    onClick={ () => navigation.navigate('VisualizarTodos') }
                />
                <MyButton
                    title="Visualizar"
                    onClick={ () => navigation.navigate('Visualizar') }
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;