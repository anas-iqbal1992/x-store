import express from "express";
import session from "express-session";
require("dotenv").config();
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import passport from "passport";
import mongoDbConnection  from "./utils/db.config";
import mongo from "connect-mongo";
import flash from "connect-flash";
import {dateFormat} from "./utils/dateFormatter";
const MongoStore = mongo(session);
const app:express.Application = express();
require("./services/passport")(passport);
app.use(express.static("public"));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(expressLayouts);
app.set('layout', 'layouts/dashboard');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const COOKEYSECRET:any =process.env.COOKEYSECRET;
app.use(session({
    secret: COOKEYSECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoDbConnection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next) => {
    const message = req.flash('messages');
    const formErrors = req.flash('formErrors');
    const formData = req.flash('formData');
    res.locals.messages = message.length? JSON.parse(message):{};
    res.locals.formErrors = formErrors.length? JSON.parse(formErrors):{};
    res.locals.formData = formData.length? JSON.parse(formData):{};
    res.locals.user = req.user || {};
    res.locals.dateFormat = dateFormat;
    next()
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
require("./routes/backendRoutes")(app);
require("./apiroutes/frontendRoutes")(app);
app.listen(process.env.PORT, () => console.log(`server running on ${process.env.PORT} port`));
export {app};
