import { safeSql } from "../../helper/connectSQL";

export function User_SELECT(req,cb){
  var sql = `SELECT * FROM user ORDER BY id DESC `
  safeSql(sql,[],function(err,result){
    if(err){
      cb({
        code: 500,
        message:err
      })
    }else if(result.length == 0){
      cb({
        code: 404,
        message: "no content"
      })
    }else{
      cb(null, result);
    }
  })
}

export function User_Login({email,password},cb){
  var sql = `SELECT * FROM user WHERE email = ? AND password = ?`
  safeSql(sql,[email,password],function(err,result){
    if(err){
      console.log(err)
      cb({
        code: 500,
        message: err
      })
    }else{
      cb(null,result[0])
    }
  })
}
