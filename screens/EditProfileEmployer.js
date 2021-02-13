import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
    Container,
    Header,
    Content,
    View,
    Card,
    Right,
    auto,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    List,
    ListItem,
    Separator,
    Item,
    Label,
    Button
} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';
import {auth, firestore, storage} from '../config/Firebase';
import ImgToBase64 from 'react-native-image-base64'
import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class EditProfileJobCreator extends Component {


    constructor() {
        super();

        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            textInput: [],
            inputData: [],
            username: '',
            phonenumber: '',
            profileImage: '',
            keyplayer: '',
            description: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            imageType: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            time: 0,
            show: true,
            project: ''
            //listViewData: data,


        };
        this.pickImage = this.pickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.updateUser = this.updateUser.bind(this);

    }



    //Pick Image from camera or library
    pickImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 180,
            cropping: true
        }).then(image => {
            console.log(image, 'image')
            this.setState({
                url: image.path,
                imageType: image.mime

            })
        }).catch((error) => {
            console.log(error)
        })
    }


    uploadImage() {
        return new Promise((resolve, reject) => {
            const appendIDToImage = new Date().getTime();
            const storageRef = storage.ref('thumbnails_job').child(`${appendIDToImage}`);

            // [anas]
            const task = ImgToBase64.getBase64String(this.state.url)
                .then(base64String => {
                    console.log("[uploadImage] Start upload image to firebase storage");
                    console.log("[uploadImage] base64String", !!base64String);

                    // .put accept blob, putString accept string
                    // https://firebase.google.com/docs/reference/js/firebase.storage.Reference#put
                    storageRef.putString(base64String, 'base64')
                        .then((imageSnapshot) => {
                            console.log('[uploadImage] Image Upload Successfully');

                            storage
                                .ref(imageSnapshot.metadata.fullPath)
                                .getDownloadURL()
                                .then((downloadURL) => {
                                    console.log("[uploadImage] downloadURL", downloadURL);
                                    // setAllImages((allImages) => [...allImages, downloadURL]);
                                    //this.dbRef.doc(this).update({ imageURL: downloadURL });
                                    resolve(downloadURL);
                                });

                        }).catch(e => {
                            console.error("[uploadImage] Put storageRef failed");
                            console.error(e);
                            reject("");
                        });

                }).catch(e => {
                    console.error("[uploadImage] Get base 64 string failed");
                    console.error(e);
                    reject("");
                });
        });
    }


    updateUser = () => {


        const updateDBRef = firestore.collection('Users').doc(auth.currentUser.uid);

        this.uploadImage().then(firebaseUrl => {
            console.log("[saveData] firebaseUrl", firebaseUrl);
            console.log("[saveData] Start add to firebase");

            updateDBRef.update({
                username: this.state.username,
                profileimage: this.state.profileImage,
                description: this.state.description,
                url: firebaseUrl
            }).then((docRef) => {
                this.props.navigation.navigate('Profile');
            })
        })

    }

    render() {
        return (

            // this.props.users.map((item, index) => {

            <View style={{ flex: 1 }} /* key={index} */  >
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>

                </Header>
                <ScrollView>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.url ? this.state.url : auth.currentUser.photoURL }} style={{ height: 200, width: null, flex: 1 }} />

                        </CardItem>
                        <Button block iconLef style={{ backgroundColor: 'blue' }}
                            onPress={this.pickImage}>
                            <Icon name="md-image" />
                            <Text style={{ textAlign: 'center' }}>Change Thumbnail</Text>
                        </Button>
                        <CardItem header bordered>
                            <Text style={styles.MainText}>Username</Text>
                        </CardItem>
                        <CardItem cardBody bordered>
                            <Body>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Username'}
                                        value={this.state.username}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'username')}
                                    />
                                </View>
                            </Body>
                        </CardItem>

                    </Card>


                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.MainText}>About Us</Text>
                        </CardItem>
                        <CardItem cardBody bordered button
                        // onPress={() => { this.setModalVisible(true); this.setInputText(item.text), this.setEditedItem(item.id) }}
                        >
                            <Body>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Description'}
                                        value={this.state.description}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                                    />
                                </View>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card>

                        <Button block success last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.updateUser()}>
                            <Text style={{ fontWeight: "bold", fontSize: 17, padding: 10 }}>Update</Text>
                        </Button>
                    </Card>
                </ScrollView>

            </View>


            //})
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // startRouteBtn: {
    //   backgroundColor: 'white',
    //   height: 70,
    //   borderRadius: 35,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginHorizontal: 20
    // },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 100,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    MainText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
        elevation: 5,
        padding: 5,
        margin: 7,
        color: 'red'
    },
    AddNewBtn: {
        backgroundColor: 'green',
        height: 70,
        width: 200,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginLeft: 100
    },
    startRouteBtn: {
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    buttonView: {
        flexDirection: 'row'
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        margin: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },
    button: {
        backgroundColor: "#4EB151",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 3,
        marginVertical: 50
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "300"
    },
    header: {
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    button: {
        marginBottom: 7
    },
    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    }
})


