import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [students, setStudents] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://192.168.1.5:8000/api/students');
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
                const response = await axios.post('http://192.168.1.5:8000/api/students', newStudent);
                setStudents((prevStudents) => [...prevStudents, response.data]);
                setName('');
                setEmail('');
                setAge('');
                setSuccessMessage('Student added successfully!');
                setTimeout(() => setSuccessMessage(''), 2000);
            } catch (error) {
                console.error('Error adding student:', error);
                Alert.alert('Error', 'Failed to register student');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Registration</Text>
            
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

            {/* Show success message after a student is added */}
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

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

// Styles to improve the look of the app
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#a2d9ce',  // Light gray background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#f9e79f',  // Green background for inputs
    },
    successMessage: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f5b7b1',  // Light red background
        color: '#a93226',  // Dark red text
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    studentItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',  // White background for each student item
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
});

export default App;