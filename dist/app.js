"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo")); // Corrected import statement
const config_1 = __importDefault(require("./config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // Import authRoutes
const notes_routes_1 = __importDefault(require("./routes/notes.routes")); // Import notesRoutes
const app = (0, express_1.default)();
const MongoStore = connect_mongo_1.default;
mongoose_1.default.connect(config_1.default.MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true, // Include this option
});
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection }),
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/auth', auth_routes_1.default);
app.use('/api', notes_routes_1.default);
app.listen(config_1.default.PORT, () => {
    console.log(`Server is running on port ${config_1.default.PORT}`);
});
//# sourceMappingURL=app.js.map