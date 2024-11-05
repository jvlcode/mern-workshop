import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const App = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    return (
        <View>
            <Text>Student Registration</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <Button title="Register Student" onPress={() => {}} />
        </View>
    );
};

export default App;
