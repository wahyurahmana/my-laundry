const {DataLaundry, JenisLaundry} = require('../models/index.js')

module.exports = class CustomerController {
  static async allDataLaundry(req, res, next){
    try {
      const result = await DataLaundry.findAll({
        where : {
          user_id : req.user.id
        },
        include : [JenisLaundry]
      })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async orderLaundry(req, res, next){
    try {
      const {berat, tgl_pengambilan, jenis_laundry_id, keterangan} = req.body

      const jenis_laundry = await JenisLaundry.findOne({
        where : {
          id : jenis_laundry_id
        }
      })
      if(!jenis_laundry){
        throw {status : 404, message : 'Jenis Laundry Tidak Ditemukan'}
      }
      
      const total = jenis_laundry.harga * berat
      
      const order = await DataLaundry.create({
        user_id : req.user.id,
        jenis_laundry_id,
        berat,
        tgl_pengantaran : new Date(),
        tgl_pengambilan,
        total,
        status : 'pending',
        keterangan
      })
      res.status(201).json(order)
    } catch (error) {
      next(error)
    }
  }
}