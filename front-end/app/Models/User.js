import DB from '../../conf/db.js';

const conexionDB = DB

export default class ModelToDo {
    static table_name = 'Users'
    constructor(){}

    static async select(id) {
        try {
            const sqlRes = id === undefined ? 
            await conexionDB.query(`SELECT * FROM ${this.table_name}`)
            :
            await conexionDB.query(`SELECT * FROM ${this.table_name} WHERE id = ?;`,[id])
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }

    static async selectSesion({user,password}) {
        try {
            const sqlRes = await conexionDB.query(`SELECT * FROM ${this.table_name} WHERE UserName = ? and Password = ?;`,[user,password])
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }

    static async insert({name}) {
        try {
            const sqlRes = await conexionDB.query(`
            INSERT INTO ${this.table_name} (nombre) VALUES
                (?);
            `,[name])
            const res = await this.select(sqlRes[0].insertId)
            return res[0]
        } catch (error) {
            return error
        }
    }

    static async delete(id) {
        try {
            const sqlRes = await conexionDB.query(`DELETE FROM ${this.table_name} WHERE id = ?;`,[id])
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }
}