import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from "../screens/Store";
import { fetchContacts } from "../utility/api";
import ContactListItem from "../components/ContactListItem";

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const loadContacts = async () => {
      dispatch(fetchContactsLoading());
      try {
        const contacts = await fetchContacts();
        dispatch(fetchContactsSuccess(contacts));
      } catch (e) {
        dispatch(fetchContactsError());
      }
    };

    loadContacts();
  }, [dispatch]);

  // Filter contacts by name or phone number
  const filteredContacts = contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or phone number"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={filteredContacts}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default Contacts;
