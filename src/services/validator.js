
const v = {

    errors : {},

    validateEnter: function (userData) {

        this.errors = {}

        if (userData.login === '') {
            if (!this.errors.hasOwnProperty('login'))  this.errors['login'] = []
            this.errors['login'].push('No login provided')
        }

        if(userData.passwd === '') {
            this.errors['password'] = []
            this.errors['password'].push('No password provided')
        }

        if (/[а-яА-я]+/.test(userData.passwd)) {
            this.errors['password'] = []
            this.errors['password'].push('Passwrod cant contain cyrillic alphabet')
        }

    }
}


export default  v