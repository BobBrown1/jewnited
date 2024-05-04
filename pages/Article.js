import styles from '../styling/Article';
import { ColorTheme } from '../styling/ColorTheme';
import { useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import Markdown from 'react-native-markdown-display';

import { db } from '../scripting/firebase';
import { get, ref } from 'firebase/database';

export default function Article({ route }) {
    const textTheme = useColorScheme() == 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const cardTheme = useColorScheme() == 'dark' ? ColorTheme.cardDark : ColorTheme.cardLight;
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchArticle = async () => {
            try {
                const articleSnapshot = await get(ref(db, 'articles/' + route.params.key));
                if (articleSnapshot.exists()) {
                    setArticle(articleSnapshot.val());
                } else {
                    console.log("No data available for article with key:", route.params.key);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [route.params.key]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {loading ? 
                    <ActivityIndicator size="large" color="#037bfc" /> :
                    <>
                        <Text style={[styles.title, textTheme]}>{article.title}</Text>
                        <Image style={[styles.image]} source={{uri: article.image}} placeholder={blurhash} />
                        <Markdown style={{
                            body: [styles.content, textTheme],
                            heading2: [styles.heading, textTheme],
                            list_item: [styles.listItem, textTheme],
                        }}>{article.content}</Markdown>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    );
}