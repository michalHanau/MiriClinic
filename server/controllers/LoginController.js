const Controller = require('./Controller');
const PariorityService = require('../services/LoginService');


class AuthController extends Controller {
    constructor() {
        super(PariorityService)

    }

    async registerUser(userData) {
        const { first_name, last_name, phone, email, password, birthdate } = userData;
        return await this.service.registerUser(first_name, last_name, phone, email, password, birthdate);
    }

    async loginUser(userData) {
        const { email, password } = userData;
        return await this.service.loginUser(email, password);
    }
}

let authController = new AuthController();
module.exports = authController;
