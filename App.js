import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Ionicons, Fontisto, MaterialCommunityIcons, FontAwesome, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const dark = '#000000';

function CategoryCard({ name, icon, type }) {
  return (
    <TouchableOpacity style={styles.categoryCard} activeOpacity={0.5}>
      <View style={styles.iconContainer}>
        {type === 'fontisto' ? (
          <Fontisto name={icon} size={35} color="#6669f3" />
        ) : type === 'materialcommunityicons' ? (
          <MaterialCommunityIcons name={icon} size={40} color="#6669f3" />
        ) : type === 'fontawesome' ? (
          <FontAwesome name={icon} size={40} color="#6669f3" ></FontAwesome>
        ) : (
          <Ionicons name={icon} size={40} color="#6669f3" />
        )}
      </View>
      <Text style={styles.categoryText}>{name}</Text>
    </TouchableOpacity>
  );
}

function TopDoctorsCard({ name, pfp, consultant, stars, reviews }) {

  return (
    <TouchableOpacity style={styles.medicCard} activeOpacity={0.5}>
      <Image
        source={{ uri: pfp }}
        style={styles.doctorImage}
      />
      <View style={styles.doctorInfos}>
        <Text style={styles.doctorName}>{name}</Text>
        <Text style={styles.doctorSpecialty}>Consultant - {consultant}</Text>

        <View style={styles.reviewWrapper}>
          <Text style={styles.ratingText}><Ionicons name='star' size={12} color="#FFD700"></Ionicons> {stars}</Text>
          <Text style={styles.ratingQtd}>({reviews} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function HomeScreen() {
  const [search, setSearch] = useState('');
  const categories = [
    { id: '1', name: 'Consultation', icon: 'people-outline' },
    { id: '2', name: 'Dentist', icon: 'tooth-outline', type: 'materialcommunityicons' },
    { id: '3', name: 'Cardiologist', icon: 'heartbeat', type: 'fontisto' },
    { id: '4', name: 'Hospital', icon: 'hospital-o', type: 'fontawesome' },
    { id: '5', name: 'Emergency', icon: 'medical-outline' },
    { id: '6', name: 'Laboratory', icon: 'flask-outline' },
  ];

  const topDoctors = [
    { id: '1', name: 'Dra. Lívia Teodoro', pfp: 'https://imgs.search.brave.com/oCrEjS806MwdepXRHAAvTuRRQdLggrK2uGQleYlOJ3g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVkaWNhbG9mZmlj/ZXNvZm1hbmhhdHRh/bi5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDEvSm9z/ZXBoaW5lLUp1bGlh/bi1NLkQuLmpwZw', consultant: 'Cardiologist', stars: 5, reviews: 39 },
    { id: '2', name: 'Dr. Gabriel Hoffman', pfp: 'https://imgs.search.brave.com/DqZ8sm8PMiob4S23BvXGh2Y22VuK1aX-FCeXRv6-thw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE0L2Ni/LzUzLzE0Y2I1M2I4/MzI1NzY0ZDhkMzg3/MDA1ZmY4ZTQxNTBj/LmpwZw', consultant: 'Physiotherapy', stars: 4.9, reviews: 36 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

      {/* ========== HEADER =========== */}
      <View style={styles.header}>
        <View style={styles.userInfosWrapper}>
          <View style={styles.userInfos}>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 20, color: '#fff' }}>Welcome</Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#fff' }}>José Martinez</Text>
          </View>
          <Image
            style={styles.user_picture}
            source={{ uri: 'https://ignicaodigital.com.br/wp-content/uploads/2016/05/Qual-eCC81-o-Perfil-do-Empreendedor.jpg' }}
          />
        </View>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchbar}
            placeholder="Search Doctor"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="search" size={20} color="#6669f3" style={styles.searchIcon} />
        </View>
      </View>

      {/* ========== MID CONTENT =========== */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={styles.categoriesHeader}>
          <Text style={styles.titleSection}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.showAllText} activeOpacity={0.5}>Show All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              name={item.name}
              icon={item.icon}
              type={item.type}
            />
          ))}
        </View>

        <View style={[styles.topDoctors, { marginBottom: 15 }]}>
          <Text style={styles.titleSection}>Top doctors</Text>
        </View>

        {topDoctors.map((doc) => (
          <TopDoctorsCard
            key={doc.id}
            name={doc.name}
            pfp={doc.pfp}
            consultant={doc.consultant}
            stars={doc.stars}
            reviews={doc.reviews}
          />
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <SimpleLineIcons name='home' size={28} color={'#fff'} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <AntDesign name='medicine-box' size={28} color={'#fff'} />
          <Text style={[styles.tabText, { color: '#fff' }]}>Doctors</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome name='calendar-o' size={28} color={'#fff'} />
          <Text style={[styles.tabText, { color: '#fff' }]}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <SimpleLineIcons name='user' size={28} color={'#fff'} />
          <Text style={[styles.tabText, { color: '#fff' }]}>Profile</Text>
        </TouchableOpacity>
      </View>

    </View >
  );
}


// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#6669f3',
    padding: 25,
    paddingBottom: 30,
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
    paddingBottom: 20,
  },

  userInfos: {
    left: 78,
    marginTop: 2,
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
    position: 'absolute',
    width: 65,
    height: 65,
    marginBottom: 20,
    left: 1,
    borderRadius: 35,
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
  },

  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },

  titleSection: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    paddingLeft: 10,
    color: '#000',
  },

  showAllText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    paddingRight: 25,
    color: '#000000',
  },

  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 15,
  },

  categoryCard: {
    backgroundColor: '#fff',
    width: '31%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  iconContainer: {
    marginBottom: 25,
  },

  categoryText: {
    position: 'absolute',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#888',
    marginTop: 65,
    textAlign: 'center',
  },

  medicCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
  },

  doctorInfos: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },

  doctorName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },

  doctorSpecialty: {
    fontFamily: 'Poppins_400Regular',
    color: '#000000e3',
    fontSize: 14,
  },

  reviewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },

  ratingText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginLeft: 3,
    marginRight: 5,
  },

  ratingQtd: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#aaa',
  },

  tabBar: {
    backgroundColor: '#6669f3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  tabText: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginTop: 4,
  }
});

