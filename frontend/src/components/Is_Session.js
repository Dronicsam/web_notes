export function isSession (token) {
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    if (token) {
        if (parseJwt(token).exp < Date.now() / 1000) {
            localStorage.clear();
        }
    }
}