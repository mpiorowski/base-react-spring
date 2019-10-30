import {serviceAddPost, serviceEditPost} from "../../../services/forum/ForumService";

export const submitPost = (post, topicUid) => {

  return new Promise((resolve, reject) => {

      let postId = post.postId || null;
      let serviceData = {
        postContent: post.content,
        replyId: post.replyId || null
      };
      if (postId === null) {
        serviceAddPost(topicUid, serviceData).then(response => {
          console.log(response);
          if (response.data) {
            // if (post.replyId != null) {
            //   replyArray.unshift({
            //     postUid: response.data,
            //     postContent: post.content,
            //     replyId: post.replyId,
            //     postAuthor: this.state.currentUser.userName
            //   });
            //   // this.openReply(post.replyId);
            // } else {
            //   postsArray.unshift({
            //     postId: response,
            //     postContent: post.content,
            //     replyId: null,
            //     postAuthor: this.state.currentUser.userName
            //   });
            // }
            resolve(response.data);
          }
        }).catch(error => {
          console.log(error);
          reject(false);
        });
      } else {
        serviceEditPost(topicUid, postId, serviceData).then(response => {
          if (response) {
            const newPostsArray = [...this.state.postsArray];
            const newReplyArray = [...this.state.replyArray];

            if (post.replyId !== null) {
              const index = newReplyArray.findIndex(item => response === item.postId);
              const item = newReplyArray[index];
              const values = {postId: response, postContent: post.content, replyId: post.replyId};
              newReplyArray.splice(index, 1, {
                ...item,
                ...values,
              });
              console.log(newReplyArray);
            } else {
              const index = newPostsArray.findIndex(item => response === item.postId);
              const item = newPostsArray[index];
              const values = {postId: response, postContent: post.content, replyId: null};
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
