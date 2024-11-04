// Filename: App.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [students, setStudents] = useState([]);

    // Fetch students when the app loads
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const handleSubmit = async () => {
        if (name && email && age) {
            const newStudent = { name, email, age };
            try {
                const response = await axios.post('http://localhost:8000/api/students', newStudent);
                setStudents((prevStudents) => [...prevStudents, response.data]); // Update state with the new student
                setName('');
                setEmail('');
                setAge('');
                console.log('Success!')
            } catch (error) {
                console.error('Error adding student:', error);
                Alert.alert('Error', 'Failed to register student');
            }
        } else {
            Alert.alert('Error', 'Please fill all fields');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Registration TESt</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <Button title="Register Student" onPress={handleSubmit} />

            <FlatList
                data={students}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.studentItem}>
                        <Text>{item.name} - {item.email} - {item.age}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    studentItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default App;
