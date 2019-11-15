import {serviceAddPost, serviceEditPost, serviceEditTopic} from "../../../services/forum/ForumService";

export const submitForumDrawer = (formData, categoryUid, topicUid) => {

  return new Promise((resolve, reject) => {

      console.log('formData', formData);

      const topicData = {
        topicTitle: formData.title,
        topicDescription: formData.content || null
      };

      const postUid = formData.postUid || null;
      const postData = {
        postContent: formData.content,
        replyUid: formData.replyUid || null
      };

      if (formData.title) {
        serviceEditTopic(categoryUid, topicUid, topicData).then(response => {
          console.log(response);
          if (response) {
            resolve(response);
          }
        }).catch(error => {
          console.log(error);
          reject(false);
        });
      } else if (postUid === null) {
        serviceAddPost(topicUid, postData).then(response => {
          if (response) {
            resolve(response.data);
          }
        }).catch(error => {
          console.log(error);
          reject(false);
        });
      } else {
        serviceEditPost(topicUid, postUid, postData).then(response => {
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
