import { loginUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, getComments }) {

    let isLoginMode = true;

    const renderForm = () => {
        const appHtml = `
      <div class="container">
      <div class="add-form" style="display: flex; align-items: center">
      <h1>Форма ${isLoginMode ? 'входа' : 'регистрации'}</h1>
      ${isLoginMode ? '' : `
      <input id="name-input"
      type="text"
      class="add-form-name"
      placeholder="Имя"
    />
    <br />`}
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
        <div class="add-form-row" style="display: flex; flex-direction: column;">
          <button id="login-button" class="add-form-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>

          <button id="toggle-button" class="add-form-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
        </div>
      </div>
      `;
    appEl.innerHTML = appHtml;

    document.getElementById('login-button').addEventListener('click', () => {

        const login = document.getElementById('login-input').value;
        const password = document.getElementById('password-input').value;

        if (!login) {
            alert('Введите логин');
            return;
        }

        if (!password) {
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

    document.getElementById('toggle-button').addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        renderForm();
    });   
    }

    renderForm();
}
