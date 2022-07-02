import jwt from 'jsonwebtoken'

export const auth = async (req, res, next)=>{

    const token = req.headers.authorization.split(' ')[1]
    const isCustom = token.length < 500
    
    let decodedData;
    if (isCustom && token){
        decodedData =  jwt.verify(token, 'test')
        if(!decodedData) return res.status(500).json({message:'not signed in, please sign in'})
        req.userId = decodedData?.id;
         
    }
    else{
        decodedData = jwt.decode(token)
        if(!decodedData) return res.status(500).json({message:'not signed in, please sign in'})
        req.userId = decodedData?.sub;
        
    }
    next()
}