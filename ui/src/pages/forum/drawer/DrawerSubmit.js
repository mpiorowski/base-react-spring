import {serviceAddPost, serviceEditPost} from "../../../services/forum/ForumService";

export const submitForumDrawer = (formData, categoryUid, topicUid) => {

  return new Promise((resolve, reject) => {

      console.log('formData', formData);

      let data;
      let param1;
      let param2;

      let submitFunc;
      switch (formData.type) {
        case 'newPost': {
          param1 = topicUid;
          data = {
            postContent: formData.content,
            replyUid: formData.replyUid || null
          };
          submitFunc = serviceAddPost;
          break;
        }
        case 'editPost': {
          param1 = topicUid;
          param2 = formData.uid;
          data = {
            postContent: formData.content,
          };
          submitFunc = serviceEditPost;
          break;
        }
      }

      submitFunc(data, param1 || null, param2 || null).then(response => {
        if (response) {
          resolve(response);
        }
      }).catch(error => {
        console.log(error);
        reject(false);
      });

    }
  );
};
