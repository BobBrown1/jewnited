import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, ScrollView, TextInput, Platform, Button, Image, useColorScheme, Appearance, KeyboardAvoidingView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-root-toast';

import { styles } from '../styling/Report';
import { ColorTheme } from '../styling/ColorTheme';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth, storage} from '../scripting/firebase';
import { ref, set, push, onValue } from 'firebase/database';
import { onAuthStateChanged } from "firebase/auth";
import { ref as sRef, uploadBytes, put, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

export default function Report() {

    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState('');
    const [people, setPeople] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState(auth.currentUser ? auth.currentUser.uid : null);

    const [type , setType] = useState(null);
    const [open, setOpen] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled && result.size > 5000000 && result.type !== 'video') {
            alert('Image size must be less than 5MB.');
            return;
        } else if (!result.canceled && result.size > 50000000 && result.type === 'video') {
            alert('Video size must be less than 50MB.');
            return;
        }
        
        if (!result.canceled) {
            setImages([...images, result]);
        }
    };

    const uploadToFirebase = async (uri, folder, name, onProgress) => {
        const fetchResponse = await fetch(uri);
        const theBlob = await fetchResponse.blob();
      
        const imageRef = sRef(storage, `reports/${folder}/${name}`);
      
        const uploadTask = uploadBytesResumable(imageRef, theBlob);
      
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              onProgress && onProgress(progress);
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log(error);
              reject(error);
            },
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve({
                downloadUrl,
                metadata: uploadTask.snapshot.metadata,
              });
            }
          );
        });
      };

    const submit = () => {
        if (location == "" || description == "" || type == null) {
            alert('Please fill out all required fields.');
            return;
        }

        if (user == null) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user.uid);
                } else {
                    alert('You must be logged in to submit a report.');
                    return;
                }
            });
        }

        const upload = async () => {
            if (location == "" || description == "" || type == null) {
                alert('Please fill out all required fields.');
                return;
            }

            setDate(new Date());
            setLocation('');
            setPeople('');
            setDescription('');
            setType(null);
            setImages([]);

            const imageLinks = [];

            const data = {
                date: date.toDateString(),
                location: location,
                user: user,
                people: people,
                description: description,
                type: type,
            };

            const _id = push(ref(db, 'reports')).key;

            await Promise.all(
                images.map(async (image) => {
                    const response = await uploadToFirebase(
                        image.assets[0].uri,
                        _id,
                        image.assets[0].uri.split('/').pop(),
                        (progress) => {}
                    );
                    imageLinks.push(response.downloadUrl);
                })
            );

            data.images = imageLinks;

            set(ref(db, `reports/${_id}`), data).then(() => {
                Toast.show('Report submitted successfully.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: '#037bfc',
                    textColor: '#ffffff',
                    opacity: 1,
                });
            });
        };

        upload();
    }

    const inputTheme = useColorScheme() === 'dark' ? ColorTheme.inputDark : ColorTheme.inputLight;
    const textTheme = useColorScheme() === 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} >

                <KeyboardAvoidingView behavior="position">

                    <View style={[styles.header, textTheme]}>
                        <Text style={[styles.headerText, textTheme]}>Report</Text>
                        <Text style={[styles.subHeader, textTheme]}>Use this form to report antisemitic incidents. Be sure to include as much detail and evidence as possible.</Text>
                    </View>

                    <View style={styles.form}>

                        <Text style={[styles.label, textTheme]}>Type of Incident*</Text>
                        <View style={styles.picker}>
                            <DropDownPicker
                                items={[
                                    {label: 'Physical Assault', value: 'Physical Assault'},
                                    {label: 'Harassment', value: 'Harassment'},
                                    {label: 'Vandalism/Property Damage', value: 'Vandalism/Property Damage'},
                                    {label: 'Discrimination', value: 'Discrimination'},
                                    {label: 'Online Hate', value: 'Online Hate'},
                                    {label: 'Hate Speech', value: 'Hate Speech'},
                                    {label: 'Other', value: 'Other'},
                                ]}
                                open={open}
                                setOpen={setOpen}
                                value={type}
                                setValue={setType}
                                placeholder='Select Type of Incident'

                                theme={useColorScheme() === 'dark' ? 'DARK' : 'LIGHT'}
                                multiple={true}
                                mode='BADGE'
                                listMode='SCROLLVIEW'
                                badgeDotColors={['#f00', '#0f0']}
                            />
                        </View>


                        <View style={styles.date}>
                            <Text style={[styles.label, {marginTop: 0}, textTheme]}>Date of Incident*</Text>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChange}
                                display="default"
                            />
                        </View>

                        <Text style={[styles.label, textTheme]}>Location*</Text>
                        <TextInput 
                            style={[styles.input, inputTheme, textTheme ]}
                            placeholder="Location of Incident"
                            value={location}
                            onChangeText={(e) => setLocation(e)}
                        />

                        <Text style={[styles.label, textTheme]}>People Involved</Text>
                        <TextInput 
                            style={[styles.input, inputTheme, textTheme]}
                            placeholder="People Involved"
                            value={people}
                            onChangeText={(e) => setPeople(e)}
                        />

                        <Text style={[styles.label, textTheme]}>Description*</Text>
                        <TextInput 
                            style={[styles.input, {height: 120}, inputTheme, textTheme]}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Description of Incident"
                            value={description}
                            onChangeText={(e) => setDescription(e)}
                        />

                        <View style={[styles.date, {marginTop: 10, marginBottom: 0}]}>
                            <Text style={[styles.label, {marginTop: 0}, textTheme]}>Evidence</Text>
                            <Button title='Choose Image' onPress={pickImage} />
                        </View>

                        <View style={[styles.chosenImages, {marginVertical: images.length > 0 ? 10 : 5}]}>
                            { images.length > 0 && (
                                images.map((image, index) => (
                                    <Pressable key={index} onPress={() => {
                                        setImages(images.filter((_, i) => i !== index));
                                    }}>
                                        {image.assets[0].type === 'image' ? (
                                            <Image source={{uri: image.assets[0].uri}} style={styles.image} />
                                            ) : (
                                            <View style={[styles.image, {backgroundColor: 'gray'}]}>
                                                <Text style={{color: 'white', textAlign: 'center', marginTop: 40}}>Video</Text>
                                            </View>
                                            )
                                        }
                                    </Pressable>
                                ))
                            ) }
                        </View>


                        <Pressable
                            onPress={submit}
                            style={styles.submit}
                        >
                            <Text style={{color: 'white'}}>Submit</Text>
                        </Pressable>

                        <Toast>Your report has been submitted.</Toast>

                    </View>

                    <View style={styles.break}></View>
                
                </KeyboardAvoidingView>

            </ScrollView>
        </SafeAreaView>
    );
    
}