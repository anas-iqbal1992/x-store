import {Strategy}  from "passport-local";
import {User,IUserModel} from "../modules/users/models/User";

module.exports = (passport:any) => {
  passport.serializeUser((user:IUserModel, done:Function) => {
    //passport.serializeUser() is setting id as cookie in user’s browser
    done(null, user._id);
  });

  passport.deserializeUser(async(_id:string, done:Function) => {
    //passport.deserializeUser() is getting id from the cookie, which is then used in callback to get user info
    try{
        const user = await User.findById({_id}); 
        return done(null, user)
    }catch(e){
        done(e);
    }
  });
  passport.use(
    new Strategy({ usernameField: "email" },async (email:string, password:string, done:Function) => {
        try{
            const user =  await User.findOne({email:email,role:'superadmin'});
            if (!user) return done(null, false,{
              error: "This email is not registered!",
              });
            if (await user.checkPassword(password)) return done(null, user);
            return done(null, false, {
              error: "Incorrect password!",
            });
        }catch(e){
            return done(e);
        }
    })
  );
};
