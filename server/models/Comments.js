module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        commentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Posts",
                key: "postId"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "userId"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        commentText: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{

        timestamps: false

    })

    Comments.associate = ((models) => {
        Comments.belongsTo(models.Posts, {
            foreignKey: 'postId',
            onDelete: 'CASCADE'
        })

        Comments.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })
    })

    return Comments;
}