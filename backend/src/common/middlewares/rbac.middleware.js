module.exports = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const allowed = req.user.roles.some(r => allowedRoles.includes(r));
        if (!allowed) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};
