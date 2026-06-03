import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key")
        // this can also be used depending upon the userId

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later ",
            });
        }


        // this will run the next function
        next();

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }

}

export default rateLimiter;