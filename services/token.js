var jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../secret/config.js');

async function checkToken(token) {
    let __id = null;
    try {
        const { _id } = await jwt.decode(token);
        __id = _id;
    } catch (e) {
        return false;
    }
    const user = await models.Usuario.findOne({ where: { id: __id, estado: 1 } });
    if (user) {
        const token = jwt.sign({ _id: __id }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
        return { token, rol: user.rol };
    } else {
        return false;
    }
}
module.exports = {
    //generar el token
    encode: async (_id, rol) => {
        console.log(rol);
        const token = jwt.sign({ _id: _id, rol: rol }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
        return token;
    },
    //permite decodificar el token
    decode: async (token) => {
        try {
            const { _id, rol } = await jwt.verify(token, 'secretKeyToGenerateToken');
            console.log(rol);
            const user = await models.Usuario.findOne({ where: { id:_id } });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
} 
/* 
const checkToken = async(token) =>{
    let localID=null;
    try{
        const { id }=this.decode(token);
        localID=id;
    }catch(err){
        return false;
    }
    //valida si el usuario existe y renueva el token 
    
    const user = await models.Usuario.findOne({where:{
        id : localID,
        estado: 1
    }});

    if(user){
        const token = this.encode(user);
        return{
            token,
            rol:user.rol
        }
    }else{
        return false;
    }
}

module.exports={
    encode: async(user)=>{
        const token = jwt.sign({
            id: user.id, 
            rol: user.rol,
        },  'secretKeyToGenerateToken', 
        {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
        
    },
    decode: async(token)=>{
        try{
            const {id} = await jwt.verify(token, 'secretKeyToGenerateToken');
            
            const user = await models.Usuario.findOne({where:{
                id : id
            }});
            if(user){
                return user;
            }else{
                return false;
            }
        }catch(err){
            const newToken = await checkToken(token);//valida la decodificacion y si es un token vencido o no
            return newToken;
        }
    }
} */