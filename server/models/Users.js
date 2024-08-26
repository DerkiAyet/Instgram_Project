module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Not a valid email address."
                }
            }
        },

        FullName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        userImg: {
            type: DataTypes.STRING,
            allowNull: true
        },

        gender: {
            type: DataTypes.ENUM('male', 'female'),
            allowNull: true
        },

        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        bio: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false
    })

    return Users;
}