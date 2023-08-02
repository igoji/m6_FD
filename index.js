const http = require('http');
const fs = require('fs/promises');
const { v4: uuidv4 } = require("uuid");

const server = http.createServer(async(req,res)=>{
    const {searchParams, pathname} = new URL(req.url, `http://${req.headers.host}`)
    const params = new URLSearchParams(searchParams);

    console.log(pathname);

// GET
    if(pathname == '/anime' && req.method == "GET"){

        const id = params.get('id')
        const nombre = params.get('nombre')    
        const datos = await fs.readFile('anime.json')
        let anime = JSON.parse(datos)

        if(id){
            try {
                if(!anime[id]){
                    throw { code: 404, message: "Id invalido, anime no encontrado." };
                }
                    res.write(JSON.stringify(anime[id]));
                    res.end();
            } catch (error) {
                res.statusCode = error.code;
                res.write(error.message)
                res.end()
            }
        }
        
        if(nombre){
            try {
                let animeNombre = Object.values(anime).find((element) => element.nombre.toLowerCase() === nombre.toLowerCase());
                if(!animeNombre){
                    throw { code: 404, message: "Nombre no se encuentra en la lista de animes." };
                }
                    res.write(JSON.stringify(animeNombre));
                    res.end();
            } catch (error) {
                res.statusCode = error.code;
                res.write(error.message)
                res.end()
            }
        }
        
        if (!id && !nombre) {
            res.write(datos);
            res.end();
        }   
        
    }


// POST

    if(pathname == '/anime' && req.method == "POST"){
        const datos = await fs.readFile('anime.json')
        const anime = JSON.parse(datos)
        const id = uuidv4();
        let datosAnime;
        
            req.on('data', (data)=>{
                datosAnime = JSON.parse(data);
            })

            req.on('end', async()=>{
                try {
                    if(!datosAnime){
                        throw { code: 400, message: "Debes ingresar un body" };
                    }
                    if(!Object.keys(datosAnime).length){
                        throw { code: 400, message: "El body no puede estar vacío" };
                    }

                    anime[id] = datosAnime;
                    console.log(datosAnime);
                    await fs.writeFile('anime.json', JSON.stringify(anime,null,2));
                    res.write("Anime agregado exitosamente a la lista");
                    res.end();

                } catch (error) {
                    res.statusCode = error.code;
                    res.write(error.message)
                    res.end()
                }
            })
    }


// PUT

    if(pathname == '/anime' && req.method == "PUT"){
        const id = params.get('id')
        const datos = await fs.readFile('anime.json')
        let anime = JSON.parse(datos)
        let datosParaModificar;

        try {

            if(!anime[id]){
                    throw { code: 404, message: "Id invalido, anime no encontrado." };    
            }

                req.on('data', (data)=>{
                    datosParaModificar = JSON.parse(data);
                })
                req.on('end', async()=>{
                    const animeOriginal = anime[id];
                    const animeActualizado = {...animeOriginal, ...datosParaModificar}
                    anime[id] = animeActualizado;
                    
                    await fs.writeFile('anime.json', JSON.stringify(anime,null,2));
                    res.write("Anime modificado exitosamente.");
                    res.end();
                })
            
        } catch (error) {
            res.statusCode = error.code;
            res.write(error.message)
            res.end()
        }

    }


// DELETE

    if(pathname == '/anime' && req.method == "DELETE"){
        const id = params.get('id')
        const datos = await fs.readFile('anime.json')
        let anime = JSON.parse(datos)

        try {
            if(!anime[id]){
                throw { code: 404, message: "Id invalido, anime no encontrado." };    
            }
                delete anime[id];
                
                await fs.writeFile('anime.json', JSON.stringify(anime,null,2));
                res.write("Anime eliminado exitosamente de la lista");
                res.end();
    
        } catch (error) {
            res.statusCode = error.code;
            res.write(error.message)
            res.end()
        }

    }
})

.listen(3000, function(){
    console.log("servidor funcionando en puerto 3000");
})

module.exports = { server };
