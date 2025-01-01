import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { fetchBook, createBook, updateBook } from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Book } from '../types';

const BookDetailScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id?: string } || {};

  useEffect(() => {
    if (id) {
      const loadBook = async () => {
        const book: Book = await fetchBook(id);
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setDescription(book.description);
        setTotalPages(book.totalPages.toString());
      };
      loadBook();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const bookData = { title, author, genre, description, totalPages: parseInt(totalPages, 10) };
      if (id) {
        await updateBook(id, bookData);
      } else {
        await createBook(bookData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Pages"
        value={totalPages}
        onChangeText={setTotalPages}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleSave}>Save</Text>
        </View>
        <View style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText} onPress={() => navigation.goBack()}>Cancel</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b71c1c', // Latar belakang merah pekat
  },
  input: {
    height: 50,
    borderColor: '#d32f2f', // Warna border merah pekat
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#e53935', // Background input merah cerah
    color: '#ffffff', // Warna teks putih
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#c62828', // Warna tombol utama merah pekat
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#c62828',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: '#e53935', // Warna tombol batal merah cerah
    shadowColor: '#e53935',
  },
  buttonText: {
    color: '#ffffff', // Warna teks tombol putih
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default BookDetailScreen;
