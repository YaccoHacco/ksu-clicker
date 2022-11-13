

//Create App Connection
import firebaseConfig from "./env";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
export { app }
//import { getAnalytics } from "firebase/analytics";
//const analytics = getAnalytics(app);

//Auth
import type { Auth } from 'firebase/auth'
import { _auth } from "./stores";
import { get } from "svelte/store"

import { Timestamp } from 'firebase/firestore'

//Firestore
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { CollectionReference, DocumentSnapshot, DocumentReference, DocumentData } from 'firebase/firestore'
const DB = getFirestore(app);

//Other
// import { randomNameColor, randomNameAnimal } from './randomNameData'
// import { navTo } from "./funcs";


/* Account */
type User = {
    id: string;
    clicks: number,
    money: number,
    prestige: number,
    wins: number,
    lastLogon: Timestamp,
    upgrades: {
        "College Student": {
            count: number,
            "Coffee Booster": number,
            "SAS Attendance": number,
            "Better Computer": number,
        },
        "Graduate Student": {
            count: number,
            "Better Computer": number,
            "Recitation Instruction": number,
            "PhD Thesis": number,
        },
        "Professor": {
            count: number,
            "Better Chalk": number,
            "Better Projector": number,
            "Lecture Hall Renovations": number,
        },
        "College Dean": {
            count: number,
            "Undergraduate Help": number,
            "Office Renovations": number,
            "Raise": number,
        },
        "College Dorm": {
            count: number,
            "Dorm Renovations": number,
            "Staff Upgrade": number,
            "Dining Hall": number,
        },
        "Campus Building": {
            count: number,
            "Water Fountain Upgrade": number,
            "Coffee Shop": number,
            "New Lecture Hall": number,
        },
        "Bramlage Coliseum": {
            count: number,
            "Willie Upgrade": number,
            "Hoop Upgrade": number,
            "Player Equipment": number,
        },
        "Bill Snyder Family Stadium": {
            count: number,
            "Band Upgrade": number,
            "Turf Upgrade": number,
            "Player Equipment": number,
        },
        "Call Hall": {
            count: number,
            "New Icecream Flavor": number,
            "More Milk Supply": number,
            "Staff Upgrade": number,
        },
        "Kansas State University": {
            count: number,
        },
    },
    prestiges: {
        "Rec Pass": boolean,
        "Cat Cash": boolean,
        "Bosco Plaza": boolean,
        "Coach Tang": boolean,
        "Bill Snyder": boolean,
    },
    createdAt: Timestamp;
}

export const emptyUpgrades = {
    "College Student": {
        count: 0,
        "Coffee Booster": 0,
        "SAS Attendance": 0,
        "Better Computer": 0,
    },
    "Graduate Student": {
        count: 0,
        "Better Computer": 0,
        "Recitation Instruction": 0,
        "PhD Thesis": 0,
    },
    "Professor": {
        count: 0,
        "Better Chalk": 0,
        "Better Projector": 0,
        "Lecture Hall Renovations": 0,
    },
    "College Dean": {
        count: 0,
        "Undergraduate Help": 0,
        "Office Renovations": 0,
        "Raise": 0,
    },
    "College Dorm": {
        count: 0,
        "Dorm Renovations": 0,
        "Staff Upgrade": 0,
        "Dining Hall": 0,
    },
    "Campus Building": {
        count: 0,
        "Water Fountain Upgrade": 0,
        "Coffee Shop": 0,
        "New Lecture Hall":0,
    },
    "Bramlage Coliseum": {
        count: 0,
        "Willie Upgrade": 0,
        "Hoop Upgrade": 0,
        "Player Equipment": 0,
    },
    "Bill Snyder Family Stadium": {
        count: 0,
        "Band Upgrade": 0,
        "Turf Upgrade": 0,
        "Player Equipment": 0,
    },
    "Call Hall": {
        count: 0,
        "New Icecream Flavor": 0,
        "More Milk Supply": 0,
        "Staff Upgrade": 0,
    },
    "Kansas State University": {
        count: 0,
    },
}

const emptyUserData:User = {
    id: "",
    clicks: 0,
    money: 0,
    prestige: 0,
    wins: 0,
    lastLogon: Timestamp.now(),
    upgrades: emptyUpgrades,
    prestiges: {
        "Rec Pass": false,
        "Cat Cash": false,
        "Bosco Plaza": false,
        "Coach Tang": false,
        "Bill Snyder": false,
    },
    createdAt: Timestamp.now(),
}


/**
 * Creates user data if it does not exist
 * @param user The possible new user
 */
 async function onPossibleNewUser():Promise<Boolean>{
    let userRef = getUserRef()
    if (userRef?.isErr) return false
    if(!(await getDoc(userRef))?.exists()) return await createNewUser()
    return false
}

async function createNewUser():Promise<Boolean> {
    let userRef = getUserRef()
    if (userRef?.isErr) return false
    if(!(await getDoc(userRef))?.exists()){
        let newUserData:User = Object.assign({
                createdAt: Timestamp.now()
            }, emptyUserData)
        await setDoc(userRef, newUserData)
    }
    return false
}

/**
 * 
 * @returns The user from which _auth is registered
 */
async function getUser():Promise<User | DocumentData>{
    let userRef = getUserRef()
    if (userRef?.isErr) return undefined
    let userData = await getDoc(userRef)
    return userData.data()
}

function getUserRef():DocumentReference | Boolean {
    if (get(_auth)?.currentUser?.uid != undefined) return doc(DB, "/users", get(_auth).currentUser.uid)
    return false
}

async function sendUpdate(user:User){
    let userRef = getUserRef()
    await updateDoc(userRef, user)
}

export { onPossibleNewUser, getUser, sendUpdate }
export { type User }

