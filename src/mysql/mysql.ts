
import mysql = require('mysql');

export default class MySQL{

    private static _instance: MySQL;

    cnn: mysql.Connection;
    
    // Inicializar base de datos
    constructor() {
        console.log('Clase inicializada')
        
        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node_db'
          });

        this.conectarDB();

    }

    // Se asegura de que haya solo una instancia ejecutandose
    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    // Ejecutar querys
    static ejecutarQuery( query: string, callback: Function ) {

        this.instance.cnn.query(query, ( err, results: Object[], fields ) => {
            
            if( err ) {
                console.log('Error en query');
                console.error(err);
                return;
            }

            if( results.length === 0 ) {
                callback('El registro solicitado no existe');
            } else {
                callback( null, results );
            }


        });

    }

    // Conexión con mysql
    private conectarDB() {
        this.cnn.connect( ( err:mysql.MysqlError ) =>{

            if( err ) {
                console.log(err.message);
                return;
            }

            console.log('Base de datos online!');

        });
    }

}
