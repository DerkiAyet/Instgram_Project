module.exports = (sequelize, DataTypes) => {
    const Followers = sequelize.define("Followers", {
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: 'userId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            primaryKey: true
        },

        followingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: 'userId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            primaryKey: true
        }

    }, {
        timestamps: false
    })

    return Followers
}