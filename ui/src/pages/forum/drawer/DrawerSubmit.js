import {
  serviceAddCategory,
  serviceAddPost,
  serviceAddTopic,
  serviceEditCategory,
  serviceEditPost,
  serviceEditTopic
} from "../../../services/forum/ForumService";

export const submitForumDrawer = (formData) => {

  return new Promise((resolve, reject) => {

      console.log('forum drawer data', formData);

      let data;
      let param1;
      let param2;

      let submitFunc;
      switch (formData.type) {
        case 'newCategory': {
          data = {
            categoryTitle: formData.title,
            categoryDescription: formData.content,
            categoryIcon: formData.icon
          };
          submitFunc = serviceAddCategory;
          break;
        }
        case 'editCategory': {
          param1 = formData.uid;
          data = {
            categoryTitle: formData.title,
            categoryDescription: formData.content,
            categoryIcon: formData.icon
          };
          submitFunc = serviceEditCategory;
          break;
        }
        case 'newTopic': {
          param1 = formData.categoryUid;
          data = {
            topicTitle: formData.title,
            topicDescription: formData.content,
          };
          submitFunc = serviceAddTopic;
          break;
        }
        case 'editTopic': {
          param1 = formData.categoryUid;
          param2 = formData.topicUid;
          data = {
            topicTitle: formData.title,
            topicDescription: formData.content,
          };
          submitFunc = serviceEditTopic;
          break;
        }
        case 'newPost': {
          param1 = formData.topicUid;
          data = {
            postContent: formData.content,
            replyUid: formData.replyUid || null
          };
          submitFunc = serviceAddPost;
          break;
        }
        case 'editPost': {
          param1 = formData.topicUid;
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
          console.log("forum drawer response", response);
          resolve(response);
        }
      }).catch(error => {
        console.log(error);
        reject(false);
      });

    }
  );
};
