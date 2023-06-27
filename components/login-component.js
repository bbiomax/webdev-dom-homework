import { loginUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, getComments }) {
    const appHtml = `
      <div class="container"> 
      <div class="add-form">
        <input id="login-input"
          type="text"
          class="add-form-name"
          placeholder="Логин"
        />
        <br />
        <input id="password-input"
          type="password"
          class="add-form-name"
          placeholder="Пароль"
        />
        <div class="add-form-row">
          <button id="login-button" class="add-form-button">Войти</button>
        </div>
      </div>
      `;
    appEl.innerHTML = appHtml;

    document.getElementById('login-button').addEventListener('click', () => {

        const login = document.getElementById('login-input').value;
        const password = document.getElementById('password-input').value;

        if(!login) {
            alert('Введите логин');
            return;
        }

        if(!password) {
            alert('Введите пароль');
            return;
        }

        loginUser({
            login: login,
            password: password,
        })
            .then((user) => {
                setToken(`Bearer ${user.user.token}`)
                getComments();
            })
            .catch(error => {
                alert(error.message);
            })
    });
}