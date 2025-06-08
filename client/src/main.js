import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

console.log('🔥 main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('📦 DOMContentLoaded');

    const authArea = document.getElementById('auth-area');

    if (!authArea) {
        console.warn('⚠️ Element #auth-area nie został znaleziony w DOM');
        return;
    }

    console.log('📡 Ustawiam onAuthStateChanged...');
    onAuthStateChanged(auth, user => {
        console.log('✅ onAuthStateChanged fired');

        if (user) {
            console.log('🙋‍♂️ User zalogowany:', user.email);
            authArea.innerHTML = `
        <span class="text-white me-2">Zalogowano jako: <strong>${user.email}</strong></span>
        <button class="btn btn-outline-light btn-sm" id="logout-btn">Wyloguj</button>
      `;
            document.getElementById('logout-btn').addEventListener('click', () => {
                console.log('🚪 Wylogowywanie...');
                signOut(auth).then(() => {
                    console.log('✅ Wylogowano, przekierowuję...');
                    window.location.href = 'login.html';
                });
            });
        } else {
            console.log('👤 Brak użytkownika – pokazuję przyciski logowania/rejestracji');
            authArea.innerHTML = `
        <a class="btn btn-outline-light btn-sm" href="../login.html">Logowanie</a>
        <a class="btn btn-primary btn-sm" href="../register.html">Rejestracja</a>
      `;
        }
    });
});
