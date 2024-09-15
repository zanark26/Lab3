import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from "../screens/Store";
import { fetchContacts } from "../utility/api";
import ContactListItem from "../components/ContactListItem";
import {Profile} from "../screens/Profile";
import {Routers} from "../screens/Routers";

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state);

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

  const contactSorted = contacts
    .slice()
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
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactSorted}
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
});

export default Contacts;