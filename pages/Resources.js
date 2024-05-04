import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, ScrollView, Linking, Pressable, Appearance, useColorScheme, RefreshControl, ActivityIndicator, Share } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons'; 

import { styles } from '../styling/Resources';
import { ColorTheme } from '../styling/ColorTheme';

import { db } from '../scripting/firebase';
import { get, ref, set } from 'firebase/database'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Resources({ route, navigation }) {

    const textTheme = useColorScheme() == 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const cardTheme = useColorScheme() == 'dark' ? ColorTheme.cardDark : ColorTheme.cardLight;
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const refresh = () => {
        setLoading(true);
        const fetchArticles = async () => {
            try {
                const publishedSnapshot = await get(ref(db, 'published'));
                if (publishedSnapshot.exists()) {
                    const publishedData = publishedSnapshot.val();
                    const articlePromises = Object.entries(publishedData).map(async ([key, value]) => {
                        if (value) {
                            const articleSnapshot = await get(ref(db, 'articles/' + key));
                            if (articleSnapshot.exists()) {
                                return articleSnapshot.val();
                            } else {
                                console.log("No data available for article with key:", key);
                            }
                        }
                    });
                    const fetchedArticles = await Promise.all(articlePromises);
                    setArticles(fetchedArticles.filter(article => article)); // Filter out any undefined values
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }

    useEffect(() => {
        setLoading(true);
        const fetchArticles = async () => {
            try {
                const publishedSnapshot = await get(ref(db, 'published'));
                if (publishedSnapshot.exists()) {
                    const publishedData = publishedSnapshot.val();
                    const articlePromises = Object.entries(publishedData).map(async ([key, value]) => {
                        if (value) {
                            const articleSnapshot = await get(ref(db, 'articles/' + key));
                            if (articleSnapshot.exists()) {
                                return articleSnapshot.val();
                            } else {
                                console.log("No data available for article with key:", key);
                            }
                        }
                    });
                    const fetchedArticles = await Promise.all(articlePromises);
                    setArticles(fetchedArticles.filter(article => article)); // Filter out any undefined values
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            {loading ? <ActivityIndicator size="large" color="#037bfc" /> : (
                <ScrollView 
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => refresh()}
                        />
                    }
                >
                    
                    <View style={styles.header}>
                        <Text style={[styles.greet, textTheme]}>Resources</Text>
                        <Text style={[styles.subheader, textTheme]}>Suggested For You</Text>
                    </View>

                    <Pressable 
                        style={[styles.topRec, cardTheme]}
                        onPress={() => navigation.navigate('ResourceArticle', { key: articles[0].key })}
                    >
                        <View style={styles.topRecImageContainer}>
                            <Image
                                source={{uri: articles[0].image}}
                                style={styles.topRecImage}
                                placeholder={blurhash}
                            />
                        </View>
                        <Text style={[styles.topRecTitle, textTheme]}>{articles[0].title}</Text>
                        <Text style={[styles.topRecDescription, textTheme]}>
                            {articles[0].subtitle}
                        </Text>
                    </Pressable>

                    <View style={styles.cards}>
                        <Pressable
                            style={[styles.card, cardTheme]}
                            onPress={() => navigation.navigate('ResourceArticle', { key: articles[1].key })}
                        >
                            <View style={styles.cardImageContainer}>
                                <Image
                                    source={{uri: articles[1].image}}
                                    style={styles.cardImage}
                                    placeholder={blurhash}
                                />
                            </View>
                            <Text style={[styles.cardTitle, textTheme]}>{articles[1].title}</Text>
                            <Text style={[styles.cardDate, textTheme]}>{formatDate(articles[1].created)}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.card, cardTheme]}
                            onPress={() => navigation.navigate('ResourceArticle', { key: articles[2].key })}
                        >
                            <View style={styles.cardImageContainer}>
                                <Image
                                    source={{uri: articles[2].image}}
                                    style={styles.cardImage}
                                    placeholder={blurhash}
                                />
                            </View>
                            <Text style={[styles.cardTitle, textTheme]}>{articles[2].title}</Text>
                            <Text style={[styles.cardDate, textTheme]}>{formatDate(articles[2].created)}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.card, cardTheme]}
                            onPress={() => navigation.navigate('ResourceArticle', { key: articles[3].key })}
                        >
                            <View style={styles.cardImageContainer}>
                                <Image
                                    source={{uri: articles[3].image}}
                                    style={styles.cardImage}
                                    placeholder={blurhash}
                                />
                            </View>
                            <Text style={[styles.cardTitle, textTheme]}>{articles[3].title}</Text>
                            <Text style={[styles.cardDate, textTheme]}>{formatDate(articles[3].created)}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.card, cardTheme]}
                            onPress={() => navigation.navigate('ResourceArticle', { key: articles[4].key })}
                        >
                            <View style={styles.cardImageContainer}>
                                <Image
                                    source={{uri: articles[4].image}}
                                    style={styles.cardImage}
                                    placeholder={blurhash}
                                />
                            </View>
                            <Text style={[styles.cardTitle, textTheme]}>{articles[4].title}</Text>
                            <Text style={[styles.cardDate, textTheme]}>{formatDate(articles[4].created)}</Text>
                        </Pressable>
                    </View>

                    <Text style={[styles.linksHeader, textTheme]}>Recommended Organizations</Text>
                    <View style={styles.links}>
                        <Pressable style={styles.link} onPress={() => Linking.openURL('https://www.adl.org/')}>
                            <Text style={[styles.linkText, textTheme]}>Anti-Defamation League</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => Linking.openURL('https://ajc.org/')}>
                            <Text style={[styles.linkText, textTheme]}>American Jewish Committee</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => Linking.openURL('https://jewbelong.com/')}>
                            <Text style={[styles.linkText, textTheme]}>Jewbelong</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => Linking.openURL('https://stopantisemitism.org/')}>
                            <Text style={[styles.linkText, textTheme]}>Stop Antisemitism</Text>
                        </Pressable>
                    </View>

                    <View style={styles.break}></View>

                </ScrollView>
            )}
        </SafeAreaView>
    );

}