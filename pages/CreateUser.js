import React, { useState } from 'react';
import { View, SafeAreaView, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase("UserDatabase.db");

const CreateUser = ({ navigation }) => {
    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [userNumber, setUserNumber] = useState('');

    let criar_usuario = () => {
        console.log(userName, userEmail, userNumber);
        if(!userName){
            alert('Preencha o Nome');
            return;
        }
        if(!userEmail){
            alert('Preencha o Email');
            return;
        }
        if(!userNumber){
            alert('Preencha o Numero');
            return;
        }
        db.transaction(function (txn) {
            txn.executeSql(
                "INSERT INTO table_user (user_name, user_email, user_number) VALUES (?, ?, ?)",
                [userName, userEmail, userNumber],
                (tx, res) => {
                    console.log('Resultados:', res.rowsAffected);
                    if (res.rowsAffected > 0){
                        Alert.alert(
                            'Sucesso',
                            'Contato registrado com sucesso',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.navigate('HomeScreen')
                                }
                            ],
                            {cancelable: false }
                        )
                    } else{
                        alert('Falha ao registrar o contato.')
                    }
                },
                function (error){
                    console.log(error);
                }
            )
        });
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between'}}
                        >
                            <MyTextInput
                                placeholder="Nome"
                                onChangeText={(userName) => setUserName(userName)}
                                style={{ padding: 10 }}
                            />
                            <MyTextInput
                                placeholder="Email"
                                onChangeText={(userEmail) => setUserEmail(userEmail)}
                                style={{ padding: 10 }}
                            />
                            <MyTextInput
                                placeholder="Numero"
                                onChangeText={(userNumber) => setUserNumber(userNumber)}
                                keyboardType="numeric"
                                maxLength={12}
                                style={{ padding: 10 }}
                            />
                            <MyButton
                                title="Criar"
                                onClick={criar_usuario}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CreateUser;