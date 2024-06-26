import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import homeIcon from '../assets/home.png';
import cardsIcon from '../assets/myCards.png';
import statsIcon from '../assets/statictics.png';
import settingsIcon from '../assets/settings.png';

const Footer = ({ navigation, isDarkTheme }) => {
  const route = useRoute();
  const currentRoute = route.name;

  const getIconColor = (screen) => {
    return currentRoute === screen ? '#007bff' : (isDarkTheme ? '#fff' : '#000');
  };

  const icons = [
    { name: 'Home', screen: 'Home', image: homeIcon },
    { name: 'My Card', screen: 'Cards', image: cardsIcon },
    { name: 'Statistics', screen: 'Stats', image: statsIcon },
    { name: 'Settings', screen: 'Settings', image: settingsIcon },
  ];

  return (
    <View style={[styles.footer, isDarkTheme && styles.darkFooter]}>
      {icons.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.screen)}
          style={styles.iconContainer}
        >
          <Image source={item.image} style={styles.iconImage} />
          <Text style={[styles.iconLabel, { color: getIconColor(item.screen) }]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={[styles.contentContainer, isDarkTheme && styles.darkContentContainer]}>
        <Text style={[styles.title, isDarkTheme && styles.darkText]}>Settings</Text>
        {['Language', 'My Profile', 'Contact Us', 'Change Password', 'Privacy Policy'].map((item, index) => (
          <View key={index} style={styles.setting}>
            <Text style={[styles.settingText, isDarkTheme && styles.darkText]}>{item}</Text>
          </View>
        ))}
        <View style={styles.set}>
          <Text style={[styles.settingText, isDarkTheme && styles.darkText]}>Theme</Text>
          <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
      </View>
      
      <Footer navigation={navigation} isDarkTheme={isDarkTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    marginTop: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 15,
    color: '#333',
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  set: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f2f5',
  }, 
  darkFooter: {
    backgroundColor: '#222',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default SettingsScreen;
