import {serviceAddPost, serviceEditPost} from "../../../services/forum/ForumService";

export const submitPost = (post, topicUid) => {

  return new Promise((resolve, reject) => {

      console.log('submit post', post);

      const postUid = post.postUid || null;
      const serviceData = {
        postContent: post.postContent,
        replyUid: post.replyUid || null
      };
      if (postUid === null) {

        serviceAddPost(topicUid, serviceData).then(response => {
          if (response) {
            resolve(response.data);
          }
        }).catch(error => {
          console.log(error);
          reject(false);
        });
      } else {
        serviceEditPost(topicUid, postUid, serviceData).then(response => {
          if (response) {
            resolve(response.data);
          }
        }).catch(error => {
          console.log(error);
          reject(false);
        });

      }
    }
  );
};
