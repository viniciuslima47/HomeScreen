import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const dark = '#000000';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function HomeScreen() {

  const [search, setSearch] = useState('');

  return (

    <View style={styles.header}>
      <View style={styles.userInfosWrapper}>
        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 20, color: '#fff', }}>Welcome</Text>
        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#ffffffee', }}>José Martinez</Text>
        <Image
          style={styles.user_picture}
          source={{ uri: 'https://ignicaodigital.com.br/wp-content/uploads/2016/05/Qual-eCC81-o-Perfil-do-Empreendedor.jpg' }}
        />
        
      </View>
      <View style={styles.searchWrapper}>

        <TextInput
          style={styles.searchbar}
          value={search}
          placeholder="Search Doctor"
          placeholderTextColor="rgba(0, 0, 0, 0.56)"
          onChangeText={setSearch}
          autoCapitalize="none"
        />

        <Ionicons
          name="search"
          size={20}
          color="#6669f3"
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
}


// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    backgroundColor: '#6669f3',
    padding: 35,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  userInfosWrapper: {
    width: '100%',
    marginVertical: 8,
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  searchWrapper: {
    width: '100%',
    marginVertical: 8,
    position: 'relative',
  },

  searchbar: {
    backgroundColor: '#fff',
    padding: 12,
    paddingRight: 40,
    borderRadius: 8,
  },

  searchIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -12,
  },

  user_picture: {
    width: 50,
    height: 50,
    marginBottom: 20,
    borderRadius: 25,
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

