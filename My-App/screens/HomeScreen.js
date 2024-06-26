import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import appleLogo from '../assets/apple.png';
import spotifyLogo from '../assets/spotify.png';
import exchangeLogo from '../assets/moneyTransfer.png';
import shoppingCartLogo from '../assets/grocery.png';

const Footer = ({ navigation, isDarkTheme }) => {
  const route = useRoute();
  const currentRoute = route.name;

  const getIconColor = (screen) => {
    return currentRoute === screen ? '#007bff' : (isDarkTheme ? '#fff' : '#000');
  };

  const icons = [
    { name: 'Home', icon: 'home', screen: 'Home', image: require('../assets/home.png') },
    { name: 'My Card', icon: 'credit-card', screen: 'Cards', image: require('../assets/myCards.png') },
    { name: 'Statistics', icon: 'bar-chart', screen: 'Stats', image: require('../assets/statictics.png') },
    { name: 'Settings', icon: 'cog', screen: 'Settings', image: require('../assets/settings.png') },
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isDarkTheme } = useContext(ThemeContext);

  const actionLogos = {
    Sent: require('../assets/send.png'),
    Receive: require('../assets/recieve.png'),
    Loan: require('../assets/loan.png'),
    Topup: require('../assets/topUp.png'),
  };

  const transactions = [
    { name: 'Apple Store', category: 'Entertainment', amount: '- $5,99', logo: appleLogo },
    { name: 'Spotify', category: 'Music', amount: '- $12,99', logo: spotifyLogo },
    { name: 'Money Transfer', category: 'Transaction', amount: '$300', logo: exchangeLogo, },
    { name: 'Grocery', category: 'Shopping', amount: '- $88', logo: shoppingCartLogo },
  ];

  const getTransactionLogoStyle = (name) => {
    return isDarkTheme && name !== 'Spotify' && name !== 'Grocery' ? { tintColor: '#fff' } : {};
  };

  return (
    <ScrollView style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image style={styles.profileImage} source={require('../assets/profile.png')} />
          <View>
            <Text style={[styles.welcomeText, isDarkTheme && styles.darkText]}>Welcome back,</Text>
            <Text style={[styles.userName, isDarkTheme && styles.darkText]}>Wornor Believe</Text>
          </View>
        </View>
        <Icon name="search" size={24} color={isDarkTheme ? '#fff' : '#000'} />
      </View>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={require('../assets/Card.png')} />
      </View>
      <View style={styles.actions}>
        {['Sent', 'Receive', 'Loan', 'Topup'].map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <Image source={actionLogos[action]} style={[styles.actionLogo, isDarkTheme && { tintColor: '#fff' }]} />
            <Text style={[styles.actionText, isDarkTheme && styles.darkText]}>{action}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.transactions}>
        <View style={styles.transactionHeader}>
          <Text style={[styles.transactionTitle, isDarkTheme && styles.darkText]}>Transaction</Text>
          <TouchableOpacity>
            <Text style={[styles.sellAll, isDarkTheme]}>Sell All</Text>
          </TouchableOpacity>
        </View>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transaction}>
            <Image source={transaction.logo} style={[styles.transactionLogo, getTransactionLogoStyle(transaction.name)]} />
            <View style={styles.transactionDetails}>
              <Text style={[styles.transactionName, isDarkTheme && styles.darkText]}>{transaction.name}</Text>
              <Text style={[styles.transactionCategory, isDarkTheme && styles.darkText]}>{transaction.category}</Text>
            </View>
            <Text style={[styles.transactionAmount, transaction.positive && styles.positiveAmount, isDarkTheme && styles.darkText]}>
              {transaction.amount}
            </Text>
          </View>
        ))}
      </View>

      <Footer navigation={navigation} isDarkTheme={isDarkTheme} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    marginTop: 40,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 15,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: '#888',
  },
  darkText: {
    color: '#fff',
  },
  userName: {
    fontSize: 18,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLogo: {
    height: 24,
    marginBottom: 5,
  },
  actionText: {
    color: '#007bff',
    fontSize: 15,
  },
  transactions: {
    padding: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  sellAll: {
    color: '#007bff',
    fontSize: 14,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  transactionLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontSize: 16,
    color: '#333',
  },
  transactionCategory: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#333',
  },
  positiveAmount: {
    color: '#28a745',
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

export default HomeScreen;
