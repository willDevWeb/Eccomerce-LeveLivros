module.exports = (sequelize, DataTypes) =>{
    const User_information = sequelize.define('User_information',{
        id_user_information:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        full_name:DataTypes.STRING,
        email:DataTypes.STRING,
        telephone:DataTypes.STRING,
        birth_date:DataTypes.STRING,
        user_cpf:DataTypes.STRING,
        user_rg:DataTypes.STRING,
        state:DataTypes.STRING,
        city:DataTypes.STRING,
        cep:DataTypes.STRING,
        district:DataTypes.STRING,
        road:DataTypes.STRING,
        number:DataTypes.INTEGER,
        complements:DataTypes.STRING,
        fk_id_user:DataTypes.INTEGER,
    },
    {
        tableName: "user_information",
        timestamps: true
    })

    User_information.associate = ( models ) =>{
        User_information.belongsTo( models.Users ,{foreignKey: "fk_id_user", as:"users" });
        User_information.belongsToMany(models.Payment, {
            as:'payment_user',
            through: 'payment',
            foreignKey:'fk_id_information',
            timestamps: false
        })

    }

    return User_information 
}