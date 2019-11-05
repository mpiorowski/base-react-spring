import {serviceAddPost, serviceEditPost} from "../../../services/forum/ForumService";

export const submitPost = (post, topicUid) => {

  return new Promise((resolve, reject) => {

      let postUid = post.postUid || null;
      let serviceData = {
        postContent: post.content,
        replyUid: post.replyUid || null
      };
      if (postUid === null) {
        serviceAddPost(topicUid, serviceData).then(response => {
          console.log(response);
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
            const newPostsArray = [...this.state.postsArray];
            const newReplyArray = [...this.state.replyArray];

            if (post.replyUid !== null) {
              const index = newReplyArray.findIndex(item => response === item.postUid);
              const item = newReplyArray[index];
              const values = {postUid: response, postContent: post.content, replyUid: post.replyUid};
              newReplyArray.splice(index, 1, {
                ...item,
                ...values,
              });
              console.log(newReplyArray);
            } else {
              const index = newPostsArray.findIndex(item => response === item.postUid);
              const item = newPostsArray[index];
              const values = {postUid: response, postContent: post.content, replyUid: null};
              newPostsArray.splice(index, 1, {
                ...item,
                ...values,
              });
            }

            this.setState({
              postsArray: newPostsArray,
              replyArray: newReplyArray,
            });

            const element = document.getElementById(response);
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const middle = absoluteElementTop - (window.innerHeight / 2);
            window.scrollTo(0, middle);
          }
          resolve(true);
        }).catch(error => {
          console.log(error);
          reject(false);
        });

      }
    }
  );
};
