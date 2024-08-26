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

    return Posts

}