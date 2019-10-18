import {serviceAddPost, serviceEditPost} from "../../../services/forum/ForumService";

export const submitPost = (data) => {

  return new Promise((resolve, reject) => {
        let topicId = this.state.topicId;
        let postId = data.postId || null;
        let serviceData = {
          postContent: data.content,
          replyId: data.replyId || null
        };
        if (postId === null) {
          serviceAddPost(topicId, serviceData).then(response => {
            console.log(response);
            if (response) {
              const postsArray = this.state.postsArray;
              const replyArray = this.state.replyArray;

              if (data.replyId != null) {
                replyArray.unshift({
                  postId: response,
                  postContent: data.content,
                  replyId: data.replyId,
                  postAuthor: this.state.currentUser.userName
                });
                this.openReply(data.replyId);
              } else {
                postsArray.unshift({
                  postId: response,
                  postContent: data.content,
                  replyId: null,
                  postAuthor: this.state.currentUser.userName
                });
              }

              this.setState({
                postsArray: postsArray,
                replyArray: replyArray,
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
        } else {
          serviceEditPost(topicId, postId, serviceData).then(response => {
            if (response) {
              const newPostsArray = [...this.state.postsArray];
              const newReplyArray = [...this.state.replyArray];

              if (data.replyId !== null) {
                const index = newReplyArray.findIndex(item => response === item.postId);
                const item = newReplyArray[index];
                const values = {postId: response, postContent: data.content, replyId: data.replyId};
                newReplyArray.splice(index, 1, {
                  ...item,
                  ...values,
                });
                console.log(newReplyArray);
              } else {
                const index = newPostsArray.findIndex(item => response === item.postId);
                const item = newPostsArray[index];
                const values = {postId: response, postContent: data.content, replyId: null};
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
