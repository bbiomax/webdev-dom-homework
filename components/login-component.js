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
          type="text"
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
        setToken('Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k');

        getComments();
    });
}