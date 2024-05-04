import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView, View, Text, Button, ScrollView, Appearance, useColorScheme, ActivityIndicator, Pressable, RefreshControl, Dimensions, Share} from 'react-native';
import { Image } from 'expo-image';
import {ColorTheme} from '../styling/ColorTheme';
import { styles } from '../styling/Tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carousel from 'react-native-reanimated-carousel';
import DropDownPicker from 'react-native-dropdown-picker';
import { Video, ResizeMode } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; 

import { useActionSheet } from '@expo/react-native-action-sheet';

import { db, storage } from '../scripting/firebase';
import { get, ref, forEach, set } from 'firebase/database';
import { getDownloadURL, ref as sRef } from 'firebase/storage';

export default function Tracker() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="PostsHome" component={PostFeed} options={{
                headerShown: false,
                headerTitle: 'Reports'
            }} />
            <Stack.Screen name="Report" component={Post} options={{
                headerTitle: 'Report',
                headerRight: () => (
                    <FontAwesome 
                        name="share-alt"
                        size={24}
                        color={useColorScheme() === 'dark' ? 'white' : 'black'} 
                    />
                ),
                headerStyle: {
                    backgroundColor: useColorScheme() === 'dark' ? '#121212' : '#ffffff',
                },
                headerTintColor: useColorScheme() === 'dark' ? 'white' : 'black',
            }} />
        </Stack.Navigator>
    );
}

function PostFeed({ route, navigation }) {
    const textTheme = useColorScheme() == 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const cardTheme = useColorScheme() == 'dark' ? ColorTheme.cardDark : ColorTheme.cardLight;
    const dropTheme = useColorScheme() == 'dark' ? 'DARK' : 'LIGHT';
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const [unfiltered, setUnfiltered] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(0);

    const [type, setType] = useState(null);
    const [filterType, setFilterType] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const { showActionSheetWithOptions } = useActionSheet();

    const fetchPosts = async () => {
        const postRef = ref(db, 'reports');
        const fetched = [];
    
        const snapshot = await get(postRef);
        snapshot.forEach((post) => {
            const report = post.val();
            report.key = post.key;
            
            if (fetched.filter(r => r.key === report.key).length == 0) {
                fetched.push(report);
            }
        }); 

        // Fetch images for each post
        await Promise.all(fetched.map(async (report) => {
            if (report.images !== undefined) {
                const images = report.images.map(async (image) => {
                    return image;
                });
                report.images = await Promise.all(images);
            }
        }));

        setPosts(fetched);
        setUnfiltered(fetched);
        setLoading(false);
    }

    useEffect(() => {
        if (type === null || type.length === 0) {
            setPosts(unfiltered);
            return;
        }
        setLoading(true);
        const filtered = unfiltered.filter(post => {
            return post.type !== undefined && post.type.some(types => type.includes(types));
        });
        setPosts(filtered);
        setLoading(false);
    }, [type]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        
        fetchPosts();
        setType(null);

        setRefreshing(false);
      }, []);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    const trimDescription = (description) => {
        return description.length > 150 ? description.substring(0, 150) + '...' : description;
    }

    const loadMorePosts = () => {
    //    setStart(start + 15);
    }

    useEffect(() => {
        fetchPosts();
    }, [start]);

    const reportAction = (post) => {
        const options = ['Share', 'Report', 'Cancel'];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    Share.share({
                        title: post.location + ' - ' + post.description,
                        message: post.description,
                    });
                } else if (buttonIndex === 1) {
                    // Report
                }
            }
        );
    }

    const width = Dimensions.get('window').width;
    
    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ScrollView contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color="#037bfc" />
                </ScrollView>
            ) : (
                <ScrollView 
                    contentContainerStyle={styles.content}
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                        loadMorePosts();
                        }
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    scrollEventThrottle={400}
                >
                    <View style={styles.header}>
                        <Text style={[styles.greet, textTheme]}>Tracker</Text>
                    </View>

                    <View style={styles.filters}>
                        <DropDownPicker
                            items={[
                                {label: 'Physical Assault', value: 'Physical Assault'},
                                {label: 'Harassment', value: 'Harassment'},
                                {label: 'Vandalism/Property Damage', value: 'Vandalism/Property Damage'},
                                {label: 'Discrimination', value: 'Discrimination'},
                                {label: 'Online Hate', value: 'Online Hate'},
                                {label: 'Hate Speech', value: 'Hate Speech'},

                                {label: 'Other', value: 'Other'}
                            ]}
                            defaultValue={null}
                            placeholder="Filter by Type"

                            open={filterType}
                            setOpen={setFilterType}
                            value={type}
                            setValue={setType}

                            theme={dropTheme}
                            multiple={true}
                            mode='BADGE'
                            listMode='SCROLLVIEW'
                        />
                    </View>

                    <View style={styles.posts}>
                        {posts.map(post => (
                            <Pressable key={post.key} style={[styles.card, cardTheme]} onPress={() => {
                                navigation.navigate('Report', {post: post});
                            }}>
                                <Text style={[styles.cardTitle, textTheme]}>{post.location}</Text>
                                <Text style={[styles.cardBody, textTheme]}>{trimDescription(post.description)}</Text>
                                {post.images !== undefined ? (
                                    <View style={styles.cardImages}>
                                        {post.images.length > 1 ? (
                                            <View style={styles.cardCarouselContainer}>
                                                <Carousel
                                                    width={400}
                                                    height={200}
                                                    data={post.images}
                                                    renderItem={({item}) => {
                                                        if (item.includes('.mp4') || item.includes('.mov')) {
                                                            return <Video source={{uri: item}} style={styles.cardImage} resizeMode={ResizeMode.COVER} />
                                                        } else {
                                                            return <Image source={{uri: item}} style={styles.cardImage} placeholder={blurhash} />
                                                        }                                                    
                                                    }}
                                                />
                                            </View>
                                        ) : (
                                            post.images[0].includes('.mp4') || post.images[0].includes('.mov') ? (
                                               <Video source={{uri: post.images[0]}} style={styles.cardImage} resizeMode={ResizeMode.COVER} usePoster={true} posterSource={require('../assets/images/loading.jpeg')} volume={0.0} isLooping={true} shouldPlay={true} />
                                            ) : (
                                            <Image source={{uri: post.images[0]}} style={styles.cardImage} placeholder={blurhash} />
                                        ))}
                                    </View>
                                ) : null}
                                <View style={styles.cardFooter}>
                                    <Text style={styles.cardDate}>{post.date} · {
                                        post.type !== undefined ? (
                                            post.type.map((type, index) => {
                                                return index === post.type.length - 1 ? type : type + ', ';
                                            })
                                        ) : null}
                                    </Text>
                                    <FontAwesome name="ellipsis-h" size={24} color={textTheme.color} style={styles.cardMore} onPress={() => reportAction(post)} />
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

export function Post({ route, navigation }) {
    const textTheme = useColorScheme() == 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const { post } = route.params;
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const refVideo = useRef(null);
    const [inFullscreen, setInFullsreen] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <FontAwesome 
                    name="share-alt"
                    size={24}
                    color={useColorScheme() === 'dark' ? 'white' : 'black'} 
                    onPress={() => {
                        Share.share({
                            title: post.location + ' - ' + post.description,
                            message: post.description,
                        });
                    }}
                />
            ),
            headerStyle: {
                backgroundColor: useColorScheme() === 'dark' ? '#121212' : '#ffffff',
            },
            headerTintColor: useColorScheme() === 'dark' ? 'white' : 'black',
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.postContent}>
                <Text style={styles.postUser}>Report {post.user !== undefined ? "by " + post.user : "on " + post.date}</Text>
                <Text style={[styles.postTitle, textTheme]}>{post.location}</Text>
                <Text style={[styles.postBody, textTheme]}>{post.description}</Text>
                {post.images !== undefined ? (
                    <View style={styles.postImages}>
                        {post.images.length > 1 ? (
                            <View style={styles.cardCarouselContainer}>
                                <Carousel
                                    width={400}
                                    height={200}
                                    data={post.images}
                                    renderItem={({item}) => (
                                        item.includes('.mp4') || item.includes('.mov') ? (
                                            <Pressable onPress={() => {refVideo.current.presentFullscreenPlayer();}} style={styles.videoPressable}>
                                                <Video source={{uri: item}} style={styles.postImage} resizeMode={ResizeMode.COVER} shouldPlay={true} isLooping={true} usePoster={true} posterSource={require('../assets/images/loading.jpeg')} ref={refVideo} isMuted={true} fullscreenUpdate={() => {
                                                    setInFullsreen(true);
                                                    refVideo.setIsMutedAsync(false);
                                                }} />
                                            </Pressable>
                                        ) : (
                                            <Image source={{uri: item}} style={styles.postImage} placeholder={blurhash} />
                                        )
                                    )}
                                />
                            </View>
                        ) : (
                            post.images[0].includes('.mp4') || post.images[0].includes('.mov') ? (
                                <Pressable onPress={() => {refVideo.current.presentFullscreenPlayer();}} style={styles.videoPressable}>
                                    <Video source={{uri: post.images[0]}} style={styles.postImage} resizeMode={ResizeMode.COVER} shouldPlay={true} isLooping={true} usePoster={true} posterSource={require('../assets/images/loading.jpeg')} ref={refVideo} isMuted={true}  playsInSilentModeIOS={true} fullscreenUpdate={() => {
                                        setInFullsreen(true);
                                        refVideo.setIsMutedAsync(false);
                                     }} />
                                </Pressable>
                                
                            ) : (
                                <Image source={{uri: post.images[0]}} style={styles.postImage} placeholder={blurhash} />
                            )
                        )}
                    </View>
                ) : null
            }
            </ScrollView>
        </SafeAreaView>
    );
}
