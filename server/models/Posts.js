module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
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

        postImg: {
            type: DataTypes.STRING,
            allowNull: false
        },

        postText: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {

        timestamps: true
        
    })

    Posts.associate = ((models) => {
        Posts.hasMany(models.Comments, {
            foreignKey: 'postId',
            onDelete: 'CASCADE'
        })

        Posts.hasMany(models.Likes, {
            foreignKey: 'postId',
            onDelete: 'CASCADE'
        })
    })

    return Posts

}