const cache = {};

function cacheMiddleware(req, res, next) {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        res.on("finish", () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                for (let key in cache) {
                    delete cache[key];
                }
            }
        });
        return next();
    }

    if (req.method === "GET") {
        const key = req.originalUrl;
        const cachedItem = cache[key];

        if (cachedItem) {
            const now = Date.now();
            if (now - cachedItem.timestamp < 60000) {
                res.set("X-Cache", "HIT");
                return res.json(cachedItem.data);
            } else {
                delete cache[key];
            }
        }

        const originalJson = res.json;
        res.json = function (body) {
            cache[key] = {
                data: body,
                timestamp: Date.now()
            };
            res.set("X-Cache", "MISS");
            return originalJson.call(this, body);
        };
        return next();
    }

    next();
}

module.exports = cacheMiddleware;
