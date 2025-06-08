import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const form = document.getElementById('registerForm');
const emailField   = form.querySelector('#regEmail');
const passField    = form.querySelector('#regPassword');
const repeatField  = form.querySelector('#regRepeat');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (passField.value !== repeatField.value) {
        alert('Hasła nie są identyczne');
        return;
    }

    try {
        await createUserWithEmailAndPassword(
            auth,
            emailField.value,
            passField.value
        );
        // sukces → przekieruj na logowanie
        window.location.href = 'login.html';
    } catch (err) {
        alert(parseFirebaseError(err.code));
    }
});

function parseFirebaseError(code) {
    switch (code) {
        case 'auth/weak-password':      return 'Hasło musi mieć min. 6 znaków';
        case 'auth/email-already-in-use': return 'E-mail jest już zarejestrowany';
        case 'auth/invalid-email':        return 'Niepoprawny e-mail';
        default:                          return 'Błąd rejestracji: ' + code;
    }
}
