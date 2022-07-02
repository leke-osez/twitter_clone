import multer from 'multer';

const Storage = multer.diskStorage({
    destination: (req, file, cb)=>{       
        const dir = 'public/uploads/tmp'   
        cb(null, dir)
    },

    filename: (req, file, cb)=>{
        const name = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/ /g,'-')
        req.fileName = name;
        cb(null, name)

    }
    
})

const filefilter = (req, file, cb)=>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }
    else   cb(null, false)
}

const upload = multer({storage: Storage, fileFilter: filefilter})

export default upload