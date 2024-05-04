import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, ScrollView, ActivityIndicator, useColorScheme, Appearance, Pressable, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';

import { ColorTheme } from '../styling/ColorTheme';
import { styles } from '../styling/Home';
import { useFonts } from 'expo-font';
import { db } from '../scripting/firebase';
import { get, ref, set } from 'firebase/database';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({route, navigation}) {

    const [imagesLoaded, setImagesLoaded] = useState(true);
    const [topStory, setTopStory] = useState({}); 
    const [topPost, setTopPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([
        {
            key: "-Nv9plQNPsForqHtPKBl",
            title: "The History of Antisemitism",
            image: require('../assets/images/antisemitism-1.jpeg'),
        },
        {
            key: "-Nv5F-bgjcNKDvSrX09V",
            title: "Antisemitism in the Modern World",
            image: require('../assets/images/antisemitism-3.jpeg'),
        },
        {
            key: "-Nv9p4kel_ptIYH9N6cR",
            title: "What You Can Do to Combat Antisemitism",
            image: require('../assets/images/antisemitism-2.webp'),
        }
    ]);

    const [fontsLoaded, fontError] = useFonts({
        'Open-Sans': require('../assets/fonts/Open_Sans/static/OpenSans-Regular.ttf'),
        'Madimi-One': require('../assets/fonts/Madimi_One/MadimiOne-Regular.ttf'),
    });

    const cardTheme = useColorScheme() === 'dark' ? ColorTheme.cardDark : ColorTheme.cardLight;
    const textTheme = useColorScheme() === 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    if (!fontsLoaded || !imagesLoaded || fontError) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    const fetchTopStory = async () => {
        try {
            const postRef = ref(db, 'reports');
            const postSnapshot = await get(postRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const posts = snapshot.val();
                    const postKeys = Object.keys(posts);
                    const postsWithImages = postKeys.filter(key => posts[key].images !== undefined);
                    const postsWithoutImages = postKeys.filter(key => posts[key].images === undefined);

                    const topStoryKey = postsWithImages[Math.floor(Math.random() * postsWithImages.length)];
                    const topStory = posts[topStoryKey];

                    const topPostKey = postsWithoutImages[Math.floor(Math.random() * postsWithoutImages.length)];
                    const topPost = posts[topPostKey];

                    setTopStory(topStory);
                    setTopPost(topPost);
                    setLoading(false);
                } else {
                    console.log("No data available");
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const refresh = () => {
        setLoading(true);
        fetchTopStory();
    }

    useEffect(() => {
        fetchTopStory();
    }, []);

    const trimDescription = (description) => {
        if (description.length > 150) {
            return description.substring(0, 150) + '...';
        } else {
            return description;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView 
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={refresh} />
                    }
                >
                    <View style={styles.header}>
                        <Text style={[styles.greet, textTheme]}>For You</Text>
                    </View>

                    <Pressable style={[styles.topStory, cardTheme]} onPress={() => navigation.navigate('HomePost', { post: topStory })} >
                        <View style={styles.topStoryImageContainer}>
                            {topStory.images[0].includes('.mp4') || topStory.images[0].includes('.mov') ? (
                                <Video
                                    source={{uri: topStory.images[0]}}
                                    style={styles.topStoryImage}
                                    resizeMode={ResizeMode.COVER}
                                    shouldPlay={true}
                                    isLooping={true}
                                    usePoster={true} 
                                    volume={0.0}
                                    posterSource={require('../assets/images/loading.jpeg')}
                                />
                            ) : (
                                <Image source={{uri: topStory.images[0]}} style={styles.topStoryImage} placeholder={blurhash} />
                            )}
                        </View>
                        <Text style={[styles.topStoryTitle, textTheme]}>{topStory.type[0]} - {topStory.location}</Text>
                        <Text style={[styles.topStoryDate, textTheme]}>{topStory.date} · {
                            topStory.type.map((type, index) => {
                                return index === topStory.type.length - 1 ? type : type + ', ';
                            })
                        }</Text>
                    </Pressable>

                    <Pressable style={[styles.topPost, cardTheme]} onPress={() => navigation.navigate('HomePost', { post: topPost })} >
                        <Text style={styles.topPostHeader}>Report {topPost.user !== undefined ? "by " + topPost.user : "on " + topPost.date}</Text>
                        <Text style={[styles.topPostTitle, textTheme]}>{topPost.location}</Text>
                        <Text style={[styles.topPostText, textTheme]}>
                            {trimDescription(topPost.description)}
                        </Text>
                    </Pressable>

                    <Text style={[styles.counter, textTheme]}>Antisemitic Incidents</Text>
                    <View style={styles.dashboard}>
                        <View style={[styles.card, cardTheme]}>
                            <Text style={[styles.cardNumber, textTheme]}>4</Text>
                            <Text style={[styles.cardText, textTheme]}>Today</Text>
                        </View>
                        <View style={[styles.card, cardTheme]}>
                            <Text style={[styles.cardNumber, textTheme]}>12</Text>
                            <Text style={[styles.cardText, textTheme]}>This Week</Text>
                        </View>
                        <Pressable style={styles.reportCard} onPress={() => navigation.navigate('Report')}>
                            <Text style={styles.reportCardText}>Report An Incident</Text>
                        </Pressable>
                    </View>

                    <Text style={[styles.counter, textTheme]}>Recommended Reading</Text>
                    <View style={styles.recommendedReading}>
                        <Pressable style={[styles.recommendedReadingCard, cardTheme]} onPress={() => navigation.navigate('HomeArticle', { key: articles[0].key })}>    
                            <View style={styles.recommendedReadingImageContainer}>
                                <Image source={articles[0].image} style={styles.recommendedReadingImage} />
                            </View>
                            <View style={styles.recommendedReadingText}>
                                <Text style={[styles.recommendedReadingTitle, textTheme]}>{articles[0].title}</Text>
                            </View>
                        </Pressable>
                        <Pressable style={[styles.recommendedReadingCard, cardTheme]} onPress={() => navigation.navigate('HomeArticle', { key: articles[1].key })}>    
                            <View style={styles.recommendedReadingImageContainer}>
                                <Image source={articles[1].image} style={styles.recommendedReadingImage} />
                            </View>
                            <View style={styles.recommendedReadingText}>
                                <Text style={[styles.recommendedReadingTitle, textTheme]}>{articles[1].title}</Text>
                            </View>
                        </Pressable>
                        <Pressable style={[styles.recommendedReadingCard, cardTheme]} onPress={() => navigation.navigate("HomeArticle", { key: articles[2].key })}>    
                            <View style={styles.recommendedReadingImageContainer}>
                                <Image source={articles[2].image} style={styles.recommendedReadingImage} />
                            </View>
                            <View style={styles.recommendedReadingText}>
                                <Text style={[styles.recommendedReadingTitle, textTheme]}>{articles[2].title}</Text>
                            </View>
                        </Pressable>
                    </View>

                    <View style={styles.break}></View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}