import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth, googleProvider } from "../DB/firebase.js";
import {
  userAuth,
  userAuthFailStore,
  userInformationStore,
} from "../../stores/loginStore";
import {
  addUser,
  deleteCurrentUserAccount,
  getUserAccountInformation,
  getUserRespondedPrompts,
} from "../DB/CRUD.js";
import { navigate } from "svelte-routing";

export const loginWithUsernameAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userAuth.set(userCredential.user);
      getUserAccountInformation();
      getUserRespondedPrompts();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
      } else {
        console.error(`${errorCode}: ${errorMessage}`);
      }
      userAuthFailStore.set(`Login Failed: ${errorCode}`);
    });
  if (userAuthFailStore == null) {
    navigate("/", { replace: true });
  }
};

export const signUpNewUser = (signUpObject) => {
  createUserWithEmailAndPassword(
    auth,
    signUpObject.email,
    signUpObject.password
  )
    .then((userCredential) => {
      userAuth.set(userCredential.user);
      addUser(signUpObject);
      getUserAccountInformation();
    })
    .catch((error) => {
      if (error.message == "auth/email-already-in-use") {
      } else {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`${errorCode}: ${errorMessage}`);
        userAuthFailStore.set(`${errorCode}: ${errorMessage}`);
      }
    });
  if (userAuthFailStore == null) {
    navigate("/", { replace: true });
  }
};

export const loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      userAuth.set(result.user);
      getUserAccountInformation();
      getUserRespondedPrompts();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`${errorCode}: ${errorMessage}`);
      userAuthFailStore.set(`${errorCode}: ${errorMessage}`);
    });
  if (userAuthFailStore == null) {
    navigate("/", { replace: true });
  }
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      userAuth.set(null);
      userInformationStore.set({ isAdmin: false });
    })
    .catch((error) => {
      console.error(error);
    });
  navigate("/", { replace: true });
};

// delete userAuth
export const deleteUserAccount = () => {
  deleteCurrentUserAccount()
    .then(() => {
      deleteUser(auth.currentUser)
        .then(() => {
          userAuth.set(null);
          userInformationStore.set({ isAdmin: false });
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => {
      console.error(error);
    });
  navigate("/", { replace: true });
};

// export const updateProfile => {
//   updateProfile(auth.currentUser, {
//   displayName: "",
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });
// }
