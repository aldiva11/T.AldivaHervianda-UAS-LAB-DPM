import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Portal, Dialog, Paragraph, Button as PaperButton } from "react-native-paper";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/api";
import { setAuthToken } from "../utils/auth";
import { AuthResponse, ApiError } from "../types";

type RootStackParamList = {
	MainTabs: undefined;
	Register: undefined;
};

const LoginScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [dialogMessage, setDialogMessage] = useState("");

	const handleLogin = async () => {
		if (!username || !password) {
			setDialogMessage("Please fill in all fields");
			setVisible(true);
			return;
		}

		setLoading(true);
		try {
			const response = (await login(username, password)) as AuthResponse;
			await setAuthToken(response.data.token);
			navigation.reset({
				index: 0,
				routes: [{ name: "MainTabs" }],
			});
		} catch (error : any) {
			const apiError = error as ApiError;
			const errorMessage = apiError.data?.message || "Something went wrong";
			const errors = apiError.data?.errors;
			console.log("Error details:", errors);
			const passwordError = errors?.password;
			const usernameError = errors?.username;
			setDialogMessage(
				passwordError ? `${errorMessage}: ${passwordError}` :
					usernameError ? `${errorMessage}: ${usernameError}` :
						errorMessage
			);
			setVisible(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<Input
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<Input
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button
				title={loading ? "Logging in..." : "Login"}
				onPress={handleLogin}
				disabled={loading}
			/>
			<TouchableOpacity
				style={styles.registerLink}
				onPress={() => navigation.navigate("Register")}
			>
				<Text style={styles.registerText}>Don't have an account? Register</Text>
			</TouchableOpacity>
			<Portal>
				<Dialog visible={visible} onDismiss={() => setVisible(false)}>
					<Dialog.Title>Error</Dialog.Title>
					<Dialog.Content>
						<Paragraph>{dialogMessage}</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<PaperButton onPress={() => setVisible(false)}>OK</PaperButton>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#b71c1c", // Latar belakang merah pekat
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#f5f5f5", // Warna putih terang untuk judul
    marginBottom: 40,
    textAlign: "center",
    textTransform: "uppercase", // Huruf kapital
    letterSpacing: 3, // Jarak antar huruf
    textShadowColor: "#8e0000", // Bayangan merah gelap
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    height: 50,
    borderColor: "#d32f2f", // Warna merah untuk border input
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#e53935", // Background merah cerah
    color: "#ffffff", // Teks putih
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonContainer: {
    backgroundColor: "#c62828", // Warna merah pekat untuk tombol
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#ffffff", // Teks putih
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  registerLink: {
    marginTop: 25,
    alignItems: "center",
  },
  registerText: {
    color: "#f48fb1", // Warna merah pastel untuk link register
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  dialog: {
    backgroundColor: "#8e0000", // Dialog merah gelap
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  dialogTitle: {
    color: "#f5f5f5", // Warna putih terang untuk judul dialog
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  dialogMessage: {
    color: "#ffffff", // Warna teks dialog putih
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  dialogButton: {
    backgroundColor: "#d32f2f", // Tombol dialog merah cerah
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default LoginScreen;