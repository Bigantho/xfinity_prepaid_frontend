export async function authGuard(app, to, from, next) {
    const isAuthenticated = !!localStorage.getItem('authToken')
    if (to.name != "login" || to.fullPath != "/") {
        if (isAuthenticated) {
            const token = localStorage.getItem('authToken')
            const isTokenExpired = app.config.globalProperties.$globalMethods.isTokenExpired(token)
            if (isTokenExpired) {
                next({ name: 'login' })
                return;
            }
        }
        else {
            next({ name: 'login' })
            return;
        }
    }

    if (await app.config.globalProperties.$globalMethods.canNext(to)) {
        next()
    } else {
        // next({ name: 'forbidden' })
        return;
    }
}