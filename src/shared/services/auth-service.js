class AuthService {

    checkLogin() {
        return this.getAccessToken() ? true: false;
    }

    getAccessToken() {
        const token = localStorage.getItem("authData");
        if(token) {
            return token;
        } else {
            return false
        }
    }

    setAccessToken(token) {
        localStorage.setItem("authData", token);
    }
}
export default new AuthService();