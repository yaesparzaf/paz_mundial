// expo install expo-web-browser expo-auth-session expo-random
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
    // Asegúrate de que esta URI coincida exactamente con una de las URIs autorizadas en tu configuración de Google Cloud
    native: "https://auth.expo.io/@yamildespertar/paz_mundial",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "133476762148-9ct1ei1d60sgdbf2beask2fihbbqvrm6.apps.googleusercontent.com",
    iosClientId:
      "133476762148-5ec612ukt96ohs88frg5emcaila6hff7.apps.googleusercontent.com",
    expoClientId:
      "133476762148-5ec612ukt96ohs88frg5emcaila6hff7.apps.googleusercontent.com",
    redirectUri,
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    console.log("REDIRECT_URI:", redirectUri);
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button
        title={accessToken ? "Get User Data" : "Login"}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ useProxy: false, showInRecents: true });
              }
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});
