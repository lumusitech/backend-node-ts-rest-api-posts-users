"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
class ServerApp {
    constructor() {
        this.app = express_1.default();
        this.setConfig();
        this.setRoutes();
    }
    setConfig() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
    }
    setRoutes() {
        this.app.get('/', (req, res) => res.send('home'));
    }
    run(port = 3000) {
        this.app.listen(this.app.get('port', () => console.log('server running on port', this.app.get('port'))) || port);
    }
}
exports.default = ServerApp;
