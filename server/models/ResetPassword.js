module.exports = (sequelize, DataTypes) => {
    const ResetPassword = sequelize.define("ResetPassword", {
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

        token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })

    return ResetPassword;
}