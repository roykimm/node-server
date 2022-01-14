const db = require("../config/db.config");

exports.addPost = (data, callback) => {

    db.query(
        `insert into posts (description, imagePath, datetimeCreated,addedByUserId) values (?, ?, ?, ?)`, 
        [data.description, data.imagePath, new Date(), data.addedByUserId],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, `Posting Registration successful`);
        }
    )
}

exports.getAllPosts = (data, callback) => {

    db.query(
        `select a.id  as postId
                , a.description 
                , a.datetimeCreated 
                , a.likeCount 
                , a.dislikeCount 
                , a.addedByUserId 
                , b.firstName 
                , b.lastName 
            from posts a
            inner join users b
                on a.addedByUserId = b.id 
            order by a.id`, 
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
    )
}

exports.addPostComment = (data, callback) => {
    db.query(
        `insert into 
                comments 
                ( postId
                , comment
                , datetimeCreated
                , addedByUserId
                ) values (
                  ?
                , ?
                , ?
                , ?)
        `, 
        [data.postId, data.comment, new Date(), data.addedByUserId],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, `Posting Comment Registration successful`);
        }
    )
}

exports.getPostAllComments = (data, callback) => {

    db.query(
        `select a.comment 
              , a.datetimeCreated 
              , a.addedByUserId 
              , b.firstName 
              , b.lastName 
          from comments a
         inner join users b
            on a.addedByUserId = b.id
         where a.postId = ?
         order by a.postId`, 
        [data.postId],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
    )
}

exports.likePost = (data, callback) => {

    db.query(
        `update posts
           set likeCount = likeCount + 1
         where id = ?`, 
        [data.postId],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            if(results.affectedRows === 1){
                return callback(null, `Like Successful`);
            } else {
                return callback(new Error("Invalid Post"));
            }
        }
    )
}

exports.dislikePost = (data, callback) => {

    db.query(
        `update posts
           set dislikeCount = dislikeCount + 1
         where id = ?`, 
        [data.postId],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            if(results.affectedRows === 1){
                return callback(null, `disLike Successful`);
            } else {
                return callback(new Error("Invalid Post"));
            }
        }
    )
}

exports.deletePost = (data, callback) => {

    db.query(
        `delete from posts where id = ?`, 
        [data.postId],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            if(results.affectedRows === 1){
                return callback(null, `Post Deleted Successfully`);
            } else {
                return callback(new Error("Invalid Post"));
            }
        }
    )
}
