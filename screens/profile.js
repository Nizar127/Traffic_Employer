import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight
} from 'react-native';
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
    Icon,
    List,
    ListItem,
    Separator,
    Button
} from 'native-base';
import {db, auth, storage, firestore} from '../../config/Firebase';

import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class Profile extends Component {


    constructor() {
        super();


        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            skills: [],
            experience: [],
            username: '',
            key: '',
            phonenumber: '',
            profileImage: '',
            keyplayer: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            imageType: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            show: true,
            newContact: "",
            mytext: '',
            data: this.initData,
            isModalVisible: false,
            inputText: '',
            editedItem: 0,

        };

    }

    componentDidMount() {
        this.unsubscribe = firestore.collection('Employer').doc(auth.currentUser.uid).onSnapshot(doc => {
            console.log(doc);
            const { fullname, phoneNum, url, address, description, keyplayers, project } = doc.data();
            this.setState({
                fullname,
                description,
                phoneNum,
                url,
                address
            })
        });
        //this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }



    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }
    handleEditItem = (editedItem) => {
        const newData = this.state.data.map(item => {
            if (item.id === editedItem) {
                item.text = this.state.inputText
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
    //hide card example
    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };




    updateText = (value) => {
        this.setState({ myText: value })
    }



    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-person" style={{ color: tintColor }} />
        ),
        headerTitle: {
            title: 'GET-THE-JOB'
        },
        headerStyle: {
            backgroundColor: '#f45fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }



    render() {
        return (
            // this.state.users.map((item, index) => {
            //     return (
            <View style={{ flex: 1 }} /* key={index} */>
                <ScrollView>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.url ? this.state.url : auth.currentUser.photoURL }} style={{ height: 200, width: null, flex: 1 }} />

                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', justifyContent: 'center' }}>{this.state.username ? this.state.username : auth.currentUser.email}</Text>
                            </Body>
                        </CardItem>


                    </Card>

                   <Card style={{ height: 100 }}>
                        <CardItem cardBody bordered button onPress={() => this.props.navigation.navigate('MyJob')}>
                            <Text style={{ justifyContent: 'center', fontSize: 17 }}>Click Here to View Your Uploaded Job</Text>
                        </CardItem>
                    </Card> 

                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text>About Us</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Body>
                                <Text style={{ margin: 30 }}>{this.state.description}</Text>

                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text>Phone Number</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Body>
                                <Text style={{ margin: 30 }}>{this.state.phonenumber}</Text>

                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text>Address</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Body>
                                <Text style={{ margin: 30 }}>{this.state.address}</Text>

                            </Body>
                        </CardItem>
                    </Card>

                    



                    <Card>

                        <Button block primary last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => {
                            this.props.navigation.navigate('EditProfileJobSeeker' , {
                                userkey: item.key
                            }); 
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'montserrat' }}>Edit Profile</Text>
                        </Button>

                    </Card>

                </ScrollView>

            </View>
            //     )

            // })
        )
    }
}

const styles = StyleSheet.create({
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
    keyplayer: {
        padding: 20,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 35,

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
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
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


