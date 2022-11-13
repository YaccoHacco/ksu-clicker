import { get } from 'svelte/store'
import { _auth, _user } from './stores'
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth"
import { updateCurrentUser, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import type { Auth, User } from 'firebase/auth'
import { app, getUser, onPossibleNewUser } from './db'
//import { createAlert, navTo } from './funcs'

const googleProv = new GoogleAuthProvider();

function _error(err){
    console.log("[account:err]",err)
}

//--Global
/**
 * Sign out of account
 * @param auth Firebase auth
 * @returns True if account is successfully signed out
 */
 async function accountSignOut(auth:Auth):Promise<boolean>{
    var status = null;
    await signOut(auth)
    .then(async () => {
        status = true;
        await updateCurrentUser(auth, null);
        _auth.set(auth);
    })
    .catch((error) => {
        status = false;
        _error("Account Sign Out: "+error)
    }); 
    return status;
}



//--Google
/**
 * Create or log in to Firebase Google account (opens popup)
 * @param auth Firebase auth
 * @returns True if account is succesfully logged in and or created
 */
async function accountGoogleSignIn(auth:Auth):Promise<boolean>{
    var status = null;
    await signInWithPopup(auth, googleProv)
    .then(async (userCredential) => {
        status = true;
        await updateCurrentUser(auth, userCredential.user);
        _auth.set(auth);
    })
    .catch((error) => {
        status = false;
        _error("Google Login: "+error)
    });
    return status
}



export { accountSignOut, accountGoogleSignIn }


export default function init_account():boolean{
    // Auth Initialization
    try {
        _auth.set(getAuth(app))
        onAuthStateChanged(get(_auth), async (newuser) => {
            console.log("USER CHANGE")
            if (newuser?.auth) {
                _auth.set(newuser.auth)
                console.log("[account] Auth:", get(_auth)?.currentUser.uid)
                if (await onPossibleNewUser()) _auth.set(newuser.auth)
                _user.set(await getUser())
                console.log("[account] User:", get(_user))

            } else {
                _user.set(undefined)
                console.log("[account] No Auth")
            }
        })
        setPersistence(get(_auth), browserLocalPersistence)
    } catch(e){
        console.log("[account:err] init_account:", e)
        return false
    }
    return true
}