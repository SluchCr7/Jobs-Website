const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const { User } = require("../Modules/User");

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user exists
                    let user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        // Check if provider is compatible or link account?
                        // For now, just log them in. 
                        // We could update the avatar if it's currently default?
                        return done(null, user);
                    }

                    // Create new user
                    // Note: Password is not required because provider != 'local'
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: "google",
                        providerId: profile.id,
                        avatar: {
                            url: profile.photos[0]?.value,
                            publicId: null,
                        }
                    });

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );
}

// LinkedIn Strategy
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LINKEDIN_CLIENT_ID,
                clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
                callbackURL: "/api/auth/linkedin/callback",
                scope: ["r_emailaddress", "r_liteprofile"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        return done(null, user);
                    }

                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: "linkedin",
                        providerId: profile.id,
                        avatar: {
                            url: profile.photos[0]?.value,
                            publicId: null,
                        }
                    });

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );
}

module.exports = passport;
