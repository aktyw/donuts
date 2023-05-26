import { FirebaseError } from '@firebase/util';
import { ref } from 'vue';

export function useFirebaseError(error: FirebaseError) {
  const newErrorMessage = ref('');

  switch (error.message) {
    case 'auth/app-deleted':
      newErrorMessage.value = 'The authentication server was deleted. Please contact support.';
      break;
    case 'auth/app-not-authorized':
      newErrorMessage.value = 'You are not authorized to access the authentication server.';
      break;
    case 'auth/argument-error':
      newErrorMessage.value = 'An invalid argument was provided.';
      break;
    case 'auth/invalid-api-key':
      newErrorMessage.value = 'The provided API key is invalid.';
      break;
    case 'auth/invalid-user-token':
      newErrorMessage.value = "The user's token is invalid.";
      break;
    case 'auth/network-request-failed':
      newErrorMessage.value = 'A network error occurred while making the request.';
      break;
    case 'auth/operation-not-allowed':
      newErrorMessage.value = 'The requested authentication operation is not allowed.';
      break;
    case 'auth/requires-recent-login':
      newErrorMessage.value = 'This operation requires a recent login. Please log in again.';
      break;
    case 'auth/id-token-expired':
      newErrorMessage.value = "The user's token has expired. Please log in again.";
      break;
    case 'auth/email-already-exists':
      newErrorMessage.value = 'Email already in use. Try different email.';
      break;
    case 'auth/email-already-in-use':
      newErrorMessage.value = 'Email already in use. Try different email.';
      break;
    case 'auth/user-not-found':
      newErrorMessage.value = 'User not found. Check your login data.';
      break;
    case 'auth/wrong-password':
      newErrorMessage.value = 'Wrong login or password. Try again.';
      break;
    case 'auth/invalid-email':
      newErrorMessage.value = 'Invalid email. Check your login data.';
      break;
    default:
      newErrorMessage.value = `An unknown error occurred: ${error}`;
  }

  return {
    newErrorMessage,
  };
}
