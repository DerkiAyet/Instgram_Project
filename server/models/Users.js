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
            type: DataTypes.ENUM('male', 'female', 'prefer not to say'),
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

    Users.associate = ((models) => {

        Users.hasMany(models.Posts, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })

        // Association for users following the current user
        Users.belongsToMany(models.Users, {
            through: models.Followers,
            as: 'Follower', // Users following this user (the alias in many many relation are necessary anhd they have to be unique)
            foreignKey: 'followingId',// join the table with the current user id 
            otherKey: 'followerId',// Points to the users who is following the current user
        });

        // Association for users the current user is following
        Users.belongsToMany(models.Users, {
            through: models.Followers,
            as: 'Following', // Users this user is following
            foreignKey: 'followerId',  // join the table with the current user id 
            otherKey: 'followingId', // Points to the users which the curent user is following
        });

        Users.hasMany(models.Comments, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })

        Users.hasMany(models.Likes, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })

    })

    return Users;
}