import React, { useState } from 'react';
import { View, SafeAreaView, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase("UserDatabase.db");

const DeleteUser = ({ navigation }) => {
    let [userId, setUserId] = useState('');
    function deletar_usuario (){
        console.log(userId);
        db.transaction((tx) =>{
            tx.executeSql(
                'DELETE FROM table_user WHERE user_id = ?',
                [userId],
                (tx, results) => {
                    console.log(results.rowsAffected);
                    if (results.rowsAffected > 0){
                        Alert.alert(
                            'Sucesso',
                            'Contato deletado com sucesso',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.navigate('HomeScreen')
                                }
                            ],
                            { cancelable: false }
                        )
                    } else {
                        alert('Erro ao deletar')
                    }
                }
            )
        })
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
                                placeholder="Procure um ID"
                                onChangeText={(userId) => setUserId(userId)}
                                keyBoardType="numeric"
                                style={{ padding: 10 }}
                            />
                            <MyButton
                                title="Deletar"
                                onClick={deletar_usuario}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DeleteUser;