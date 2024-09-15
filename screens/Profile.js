import React, { useState, useEffect } from "react";
import { StyleSheet, View, Linking } from "react-native"; // Import Linking
import { fetchRandomContact } from "../utility/api";
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from "../utility/colors";

const Profile = ({ route }) => {
  const [setContact] = useState({});

  useEffect(() => {
    fetchRandomContact().then(
      contact => setContact(contact)
    );
  }, []);

  const { contact } = route.params;
  const { avatar, name, email, phone, cell } = contact;

  // Function to handle phone number press
  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`); // Opens the phone dialer with the number prefilled
  };

  // Function to handle email press
  const handleEmailPress = (emailAddress) => {
    Linking.openURL(`mailto:${emailAddress}`); // Opens the default mail app with the email address prefilled
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem
          icon="mail"
          title="Email"
          subtitle={email}
          onPress={() => handleEmailPress(email)} // Opens the email app when pressed
        />
        <DetailListItem
          icon="phone"
          title="Work"
          subtitle={phone}
          onPress={() => handlePhonePress(phone)} // Dial the work phone number when pressed
        />
        <DetailListItem
          icon="smartphone"
          title="Personal"
          subtitle={cell}
          onPress={() => handlePhonePress(cell)} // Dial the personal phone number when pressed
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});
