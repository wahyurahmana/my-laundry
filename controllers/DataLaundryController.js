const { hash } = require('../helpers/bcryptjs.js')
const {User, Profile, DataLaundry, JenisLaundry, sequelize} = require('../models/index.js')

module.exports = class DataLaundryController {
  static async dataLaundry(req, res, next){
    try {
      const data = await DataLaundry.findAll({
        include : [JenisLaundry, {
          model : User,
          attributes : ['username','role'],
          include : [Profile]
        }]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async orderLaundry(req, res, next){
    try {
      const {order} = req.body
      if(order === true){
        //pelanggan baru
        const data = await DataLaundryController.dataNewLaundry(req.body)
        if(data.error){
          throw {...data}
        }
        res.status(201).json(data)
      }else if(order === false){
        //pelanggan lama
        const data = await DataLaundryController.dataOldLaundry(req.body)
        if(data.error){
          throw {...data}
        }
        res.status(201).json(data)
      }else{
        throw {status : 404, message : 'order not found'}
      }
    } catch (error) {
      next(error)
    }
  }

  static async dataNewLaundry(body){
    const t = await sequelize.transaction();
    try {
      const user = await User.create({
        username: body.username,
        password: hash(`${process.env.PASSWORD_DEFAULT_CUSTOMER}`),
        role : 'customer'
      }, { transaction: t });
  
      await Profile.create({
        user_id : user.id,
        nama_lengkap: body.nama_lengkap,
        alamat: body.alamat,
        nohp : body.nohp
      }, { transaction: t });

      const jenis_laundry = await JenisLaundry.findOne({
        where : {
          id : body.jenis_laundry_id
        }
      })
      if(!jenis_laundry){
        throw {status : 404, message : 'Jenis Laundry Tidak Ditemukan'}
      }
      const total = jenis_laundry.harga * body.berat

      const dataLaundry = await DataLaundry.create({
        user_id : user.id,
        jenis_laundry_id: body.jenis_laundry_id,
        berat: body.berat,
        tgl_pengantaran : new Date(),
        tgl_pengambilan : body.tgl_pengambilan,
        total,
        status : 'pending',
        keterangan : body.keterangan
      }, { transaction: t });
      
      await t.commit();

      return dataLaundry
      
    } catch (error) {
      await t.rollback();
      return {error : true, ...error}
    }
  }

  static async dataOldLaundry(body){
    try {
      const user = await User.findOne({
        where : {
          id : body.user_id
        }
      })
      
      const jenis_laundry = await JenisLaundry.findOne({
        where : {
          id : body.jenis_laundry_id
        }
      })
      if(!jenis_laundry){
        throw {status : 404, message : 'Jenis Laundry Tidak Ditemukan'}
      }
      
      const total = jenis_laundry.harga * body.berat
     
      const dataLaundry = await DataLaundry.create({
        user_id : user.id,
        jenis_laundry_id: body.jenis_laundry_id,
        berat: body.berat,
        tgl_pengantaran : new Date(),
        tgl_pengambilan : body.tgl_pengambilan,
        total,
        status : 'pending',
        keterangan : body.keterangan
      });

      return dataLaundry
      
    } catch (error) {
      return {error : true, ...error}
    }
  }

  static async allJenisLaundry(req, res, next){
    try {
      const result = await JenisLaundry.findAll()
      res.status(200) .json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addJenisLaundry(req, res, next){
    try {
      const result = await JenisLaundry.create({
        nama : req.body.nama,
        harga : req.body.harga
      })
      res.status(200).json({message : `Success Add Jenis Laundry With id ${result.id}`})
    } catch (error) {
      next(error)
    }
  }

  static async destroyJenisLaundry(req, res, next){
    try {
      const result = await JenisLaundry.destroy({
        where : {
          id : req.params.idJenisLaundry
        }
      })
      if(!result){
        res.status(404).json({message : 'Jenis Laundry Not Found'})
      }else{
        res.status(200).json({message : 'Success Delete Jenis Laundry'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async updateJenisLaundry(req, res, next){
    try {
      const result = await JenisLaundry.update({
        nama : req.body.nama,
        harga : req.body.harga
      }, {
        where : {
          id : req.params.idJenisLaundry
        }, returning : true
      },)
      if(!result[0]){
        res.status(404).json({message : 'Jenis Laundry Not Found'})
      }else{
        res.status(200).json({message : `Success Update Jenis Laundry id ${result[1][0].id}`})
      }
    } catch (error) {
      next(error)
    }
  }
}