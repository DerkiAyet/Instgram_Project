module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Users",
                key: "userId"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Posts",
                key: "postId"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    })

    Likes.associate = ((models) => {
        Likes.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })

        Likes.belongsTo(models.Posts, {
            foreignKey: 'postId',
            onDelete: 'CASCADE'
        })
    })

    return Likes;
}