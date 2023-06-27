const host = 'https://wedev-api.sky.pro/api/v2/maksim-balyaev/comments';

export function getAndRender({ token }) {
    return fetch(
        host,
        {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        }
    ).then((response) => {
        return response.json();
    });
}

export function addComment({ text, name, token }) {
    return fetch(
        host,
        {
            method: 'POST',
            body: JSON.stringify({
                text,
                name,
            }),
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            return response.json();
        });
}

export function login({ login, password }) {
    return fetch(
        'https://wedev-api.sky.pro/api/user/login',
        {
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
            }),
        })
        .then((response) => {
            return response.json();
        });
}