import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Book Tracker</Text>
        <Text style={styles.subtitle}>
          Manage your books and track your reading progress.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#b71c1c', // Latar belakang merah gelap
  },
  card: {
    backgroundColor: '#d32f2f', // Warna kartu merah medium
    borderRadius: 20,
    padding: 25,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c62828', // Border merah gelap
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcdd2', // Warna teks merah muda terang
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(255, 205, 210, 0.4)', // Bayangan merah muda terang
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffcdd2', // Warna teks merah muda terang
    lineHeight: 24,
    marginTop: 10,
  },
});

export default HomeScreen;
