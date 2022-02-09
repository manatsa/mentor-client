

class UserService {

    logged = false;
    loginUser(username, password) {
        if (username === 'mana' && password === 'mana') {
            return true;
        }
    }

    getUsers() {

    }

    getUser(userId) {

    }

    saveUser(user) {

    }

    getCurrentUser() {
        return { id: 1, firstName: 'Manatsa', lastName: 'Chinyeruse', userName: 'admin', password: '*******', level: 'admin', createDate: '1-01-2022', createdBy: 'system', active: true, role: 'admin' }
    }

}

export default UserService;