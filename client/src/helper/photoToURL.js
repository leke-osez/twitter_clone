

const fetchPhoto = async(path,func)=>{
// const result = useRef(null)
 
    fetch(path)
        .then((response)=> response.blob())
        .then(blob=>{
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.addEventListener('load', () => {
                func(reader.result)
            });
        }
    )

       

}

export default fetchPhoto